from flask import Blueprint, request, jsonify
from flasgger import swag_from
from flask_login import login_required

from ecommerce_api.repositories.category_repository import SQLAlchemyCategoryRepository
from ecommerce_api.services.category_service import CategoryService
from ..common.exceptions import NotFound, InvalidData

category_bp = Blueprint('category', __name__)
category_service = CategoryService(SQLAlchemyCategoryRepository())

@category_bp.route("/category", methods=["GET"])
@swag_from('../../docs/category_list.yml')
def get_category():
    category = category_service.get_all_categories()
    return jsonify([{
        "id": c.id, "name": c.name
    } for c in category]), 200

@category_bp.route("/category/add", methods=["POST"])
@login_required
@swag_from('../../docs/category_add.yml')
def add_category():
    try:
        data = request.json
        category = category_service.create_category(data)
        return jsonify({"message": "Category added successfully", "id": category.id}), 201
    except InvalidData as e:
        return jsonify({"message": str(e)}), 400

@category_bp.route("/category/update/<int:category_id>", methods=["PUT"])
@login_required
@swag_from('../../docs/category_update.yml')
def update_category(category_id):
    try:
        data = request.json
        category_service.update_category(category_id, data)
        return jsonify({"message": "Category updated successfully"}), 200
    except (NotFound, InvalidData) as e:
        return jsonify({"message": str(e)}), 404 if isinstance(e, NotFound) else 400

@category_bp.route("/category/delete/<int:category_id>", methods=["DELETE"])
@login_required
@swag_from('../../docs/category_delete.yml')
def delete_product(category_id):
    try:
        category_service.delete_category(category_id)
        return jsonify({"message": "Category deleted successfully"}), 200
    except NotFound as e:
        return jsonify({"message": str(e)}), 404