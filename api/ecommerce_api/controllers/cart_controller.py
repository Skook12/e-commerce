from flask import Blueprint, jsonify
from flasgger import swag_from
from flask_login import login_required, current_user
from ..services.cart_service import CartService
from ..repositories.cart_repository import SQLAlchemyCartRepository
from ..repositories.product_repository import SQLAlchemyProductRepository
from ..common.exceptions import NotFound, InvalidData

cart_bp = Blueprint('cart', __name__)
cart_service = CartService(
    cart_repo=SQLAlchemyCartRepository(),
    product_repo=SQLAlchemyProductRepository()
)

@cart_bp.route("/cart", methods=["GET"])
@login_required
@swag_from('../../docs/cart_get.yml')
def get_cart():
    cart_contents = cart_service.get_cart_contents(current_user.id)
    return jsonify(cart_contents), 200

@cart_bp.route("/cart/add/<int:product_id>", methods=["POST"])
@login_required
@swag_from('../../docs/cart_add_item.yml')
def add_to_cart(product_id):
    try:
        cart_service.add_to_cart(user_id=current_user.id, product_id=product_id)
        return jsonify({"message": "Product added to cart"}), 201
    except NotFound as e:
        return jsonify({"message": str(e)}), 404

@cart_bp.route("/cart/remove/<int:product_id>", methods=["DELETE"])
@login_required
@swag_from('../../docs/cart_remove_item_all.yml')
def remove_from_cart(product_id):
    try:
        cart_service.remove_from_cart(user_id=current_user.id, product_id=product_id)
        return jsonify({"message": "Product removed from cart"}), 200
    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    
@cart_bp.route("/cart/removeitem/<int:product_id>", methods=["DELETE"])
@login_required
@swag_from('../../docs/cart_remove_item.yml')
def remove_item_from_cart(product_id):
    try:
        cart_service.remove_item_from_cart(user_id=current_user.id, product_id=product_id)
        return jsonify({"message": "Product removed from cart"}), 200
    except NotFound as e:
        return jsonify({"message": str(e)}), 404

@cart_bp.route("/cart/checkout", methods=["POST"])
@login_required
@swag_from('../../docs/cart_checkout.yml')
def checkout():
    try:
        cart_service.checkout(current_user.id)
        return jsonify({"message": "Order placed successfully"}), 200
    except InvalidData as e:
        return jsonify({"message": str(e)}), 400