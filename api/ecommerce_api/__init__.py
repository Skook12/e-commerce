from flask import Flask
from config import DevelopmentConfig
from .extensions import db, login_manager, swagger, cors
from .models.user_model import User
from .controllers.auth_controller import auth_bp
from .controllers.product_controller import products_bp
from .controllers.cart_controller import cart_bp

def create_app(config_class=DevelopmentConfig):
    """
    Application factory pattern.
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    login_manager.init_app(app)
    swagger.init_app(app)
    cors.init_app(app)

    login_manager.login_view = 'auth.login'
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))


    app.register_blueprint(auth_bp)
    app.register_blueprint(products_bp, url_prefix='/api')
    app.register_blueprint(cart_bp, url_prefix='/api/cart')

    return app