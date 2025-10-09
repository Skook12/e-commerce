# ecommerce_api/extensions.py
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flasgger import Swagger
from flask_cors import CORS

db = SQLAlchemy()
login_manager = LoginManager()
swagger = Swagger()
cors = CORS()