from flask import Blueprint, request, jsonify
from flasgger import swag_from
from flask_login import login_required

from ecommerce_api.repositories.category_repository import SQLAlchemyCategoryRepository
from ecommerce_api.services import category_service
from ..services.product_service import ProductService
from ..repositories.product_repository import SQLAlchemyProductRepository
from ..common.exceptions import NotFound, InvalidData

products_bp = Blueprint('products', __name__)
product_service = ProductService(SQLAlchemyProductRepository())
category_service = category_service.CategoryService(SQLAlchemyCategoryRepository())


@products_bp.route("/products", methods=["GET"])
@swag_from('../../docs/products_list.yml')
def get_products():
    products = product_service.get_all_products()
    return jsonify([{
        "id": p.id, "name": p.name, "description": p.description, "price": p.price, "category": p.category_info.name, "category_id": p.category_info.id, "image": p.image
    } for p in products]), 200

@products_bp.route("/products/<int:product_id>", methods=["GET"])
@swag_from('../../docs/product_get_by_id.yml')
def get_product(product_id):
    try:
        product = product_service.get_product_by_id(product_id)
        return jsonify({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "category": product.category_info.name,
            "category_id": product.category_info.id,
            "image": product.image
        }), 200
    except NotFound as e:
        return jsonify({"message": str(e)}), 404

@products_bp.route("/products/add", methods=["POST"])
@login_required
@swag_from('../../docs/product_add.yml')
def add_product():
    try:
        data = request.json
        product = product_service.create_product(data)
        return jsonify({"message": "Product added successfully", "id": product.id}), 201
    except InvalidData as e:
        return jsonify({"message": str(e)}), 400

@products_bp.route("/products/update/<int:product_id>", methods=["PUT"])
@login_required
@swag_from('../../docs/product_update.yml')
def update_product(product_id):
    try:
        data = request.json
        product_service.update_product(product_id, data)
        return jsonify({"message": "Product updated successfully"}), 200
    except (NotFound, InvalidData) as e:
        return jsonify({"message": str(e)}), 404 if isinstance(e, NotFound) else 400

@products_bp.route("/products/delete/<int:product_id>", methods=["DELETE"])
@login_required
@swag_from('../../docs/product_delete.yml')
def delete_product(product_id):
    try:
        product_service.delete_product(product_id)
        return jsonify({"message": "Product deleted successfully"}), 200
    except NotFound as e:
        return jsonify({"message": str(e)}), 404