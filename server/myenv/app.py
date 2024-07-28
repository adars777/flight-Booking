# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import Config
from myenv.models import db
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})


# Import and register blueprints
from routes.auth_routes import auth_bp
from routes.admin_routes import admin_bp
from routes.flight_routes import flight_bp
from routes.booking_routes import booking_bp
from routes.protected_routes import protected_bp  # Import the new routes

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(admin_bp, url_prefix='/admin')
app.register_blueprint(flight_bp, url_prefix='/flights')
app.register_blueprint(booking_bp, url_prefix='/bookings')
app.register_blueprint(protected_bp, url_prefix='/protected')  # Register the new routes


@app.route('/hello')
def hello():
    return 'hello..'


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=8081,debug=True)
