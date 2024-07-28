from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    soft_deleted = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_admin': self.is_admin,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'soft_deleted': self.soft_deleted
        }


class Flight(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    flight_number = db.Column(db.String(100), nullable=False)
    source = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    arrival_time = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)
    seats_available = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    soft_deleted = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            'id': self.id,
            'flight_number': self.flight_number,
            'source': self.source,
            'destination': self.destination,
            'departure_time': self.departure_time.isoformat(),
            'arrival_time': self.arrival_time.isoformat(),
            'price': self.price,
            'seats_available': self.seats_available,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'soft_deleted': self.soft_deleted
        }


class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    flight_id = db.Column(db.Integer, db.ForeignKey('flight.id'), nullable=False)
    booking_date = db.Column(db.DateTime, default=datetime.utcnow)
    # --
    source = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    arrival_time = db.Column(db.DateTime, nullable=False)
    # ==
    status = db.Column(db.String(50), nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
    payment_details = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    soft_deleted = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'flight_id': self.flight_id,
            'booking_date': self.booking_date.isoformat(),
            #
            'source':self.source,
            'destination':self.destination,
            'departure_time':self.departure_time,
            'arrival_time':self.arrival_time,
            #
            'status': self.status,
            'payment_method': self.payment_method,
            'payment_details': self.payment_details,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'soft_deleted': self.soft_deleted
        }
