from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, current_user, login_user, login_required, logout_user
from flasgger import Swagger, swag_from



app = Flask(__name__)
swagger = Swagger(app)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
login_manager = LoginManager(app)
db = SQLAlchemy(app)
login_manager.init_app(app)
login_manager.login_view = 'login'
CORS(app)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    cart = db.relationship('CartItem', backref='user', lazy=True)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    
class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
 
@app.route("/login", methods=["POST"])
@swag_from('docs/auth_login.yml')
def login():
    data = request.json
    if not data or "username" not in data or "password" not in data:
        return "Invalid data", 400
    user = User.query.filter_by(username=data["username"]).first()
    if not user or user.password != data["password"]:
        return "Invalid username or password", 401
    login_user(user)
    return jsonify({"message": "Login successful"}), 200

@app.route("/logout", methods=["POST"])
@login_required
@swag_from('docs/auth_logout.yml')
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"}), 200

@app.route("/api/products/add", methods=["POST"])
@login_required
@swag_from('docs/product_add.yml')
def add_product():
    data = request.json
    if not data or "name" not in data or "description" not in data or "price" not in data:
        return "Invalid data", 400
    product = Product(name=data["name"], description=data["description"], price=data["price"])
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Product added successfully"}), 201

@app.route("/api/products/delete/<int:product_id>", methods=["DELETE"])
@login_required
@swag_from('docs/product_delete.yml')
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return "Product not found", 404
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200

@app.route("/api/products/update/<int:product_id>", methods=["PUT"])
@login_required
@swag_from('docs/product_update.yml')
def update_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return "Product not found", 404
    data = request.json
    if not data or "name" not in data or "description" not in data or "price" not in data:
        return "Invalid data", 400
    product.name = data["name"]
    product.description = data["description"]
    product.price = data["price"]
    db.session.commit()
    return jsonify({"message": "Product updated successfully"}), 200


@app.route("/api/products/<int:product_id>", methods=["GET"])
@swag_from('docs/product_get_by_id.yml')
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return "Product not found", 404
    return jsonify({
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price
    }), 200

@app.route("/api/products", methods=["GET"])
@swag_from('docs/products_list.yml')
def get_products():
    products = Product.query.all() 
    product_list = []
    for product in products:    
        product_data = {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price
        }
        product_list.append(product_data)
    return jsonify(product_list), 200


@app.route("/api/cart/add/<int:product_id>", methods=["POST"])
@login_required
@swag_from('docs/cart_add_item.yml')
def add_to_cart(product_id):
    user = User.query.get(int(current_user.id))
    if not user:
        return "User not found", 404
    product = Product.query.get(product_id)
    if not product:
        return "Product not found", 404
    cart_item = CartItem(user_id=user.id, product_id=product_id, quantity=1)
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({"message": "Product added to cart successfully"}), 201

@app.route("/api/cart/remove/<int:product_id>", methods=["DELETE"])
@login_required
@swag_from('docs/cart_remove_item.yml')
def remove_from_cart(product_id):
    user = User.query.get(int(current_user.id))
    if not user:
        return "User not found", 404
    cart_item = CartItem.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not cart_item:
        return "Product not found in cart", 404
    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Product removed from cart successfully"}), 200

@app.route("/api/cart", methods=["GET"])
@login_required
@swag_from('docs/cart_get.yml')
def get_cart():
    user = User.query.get(int(current_user.id))
    if not user:
        return "User not found", 404
    cart_items = CartItem.query.filter_by(user_id=user.id).all()
    cart_list = []
    for cart_item in cart_items:
        product = Product.query.get(cart_item.product_id)
        cart_item_data = {
            "id": cart_item.id,
                "product": {
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "price": product.price
            },
            "quantity": cart_item.quantity
        }
        cart_list.append(cart_item_data)
    return jsonify(cart_list), 200

@app.route("/api/cart/checkout", methods=["POST"])
@login_required
@swag_from('docs/cart_checkout.yml')
def checkout():
    user = User.query.get(int(current_user.id))
    if not user:
        return "User not found", 404
    cart_items = CartItem.query.filter_by(user_id=user.id).all()
    if not cart_items:
        return "Cart is empty", 400
    for cart_item in cart_items:
        db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Order placed successfully"}), 200   
            


if __name__ == "__main__":
    app.run(debug=True)