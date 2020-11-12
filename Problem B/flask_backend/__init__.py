from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager


db = SQLAlchemy()
jwt = JWTManager()
bcrypt = Bcrypt()


def create_app(config_class):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    db.app = app
    bcrypt.init_app(app)
    jwt.init_app(app)

    from flask_backend.users.routes import users
    app.register_blueprint(users)

    return app
