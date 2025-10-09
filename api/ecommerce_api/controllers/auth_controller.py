from flask import Blueprint, request, jsonify
from flasgger import swag_from
from flask_login import login_user, logout_user, login_required
from ..services.auth_service import AuthService
from ..repositories.user_repository import SQLAlchemyUserRepository
from ..common.exceptions import InvalidData

auth_bp = Blueprint('auth', __name__)
auth_service = AuthService(SQLAlchemyUserRepository())

@auth_bp.route("/login", methods=["POST"])
@swag_from('../../docs/auth_login.yml')
def login():
    try:
        data = request.json
        if not data or "username" not in data or "password" not in data:
            raise InvalidData("Username and password are required")
        
        user = auth_service.login(data['username'], data['password'])
        login_user(user)
        return jsonify({"message": "Login successful"}), 200
    except InvalidData as e:
        return jsonify({"error": str(e)}), 401

@auth_bp.route("/logout", methods=["POST"])
@login_required
@swag_from('../../docs/auth_logout.yml')
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"}), 200