from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from myenv.models import db, User, Flight, Booking
from myenv.utils.decorators import admin_required

admin_bp = Blueprint('admin', __name__)

# @admin_bp.before_request
# @jwt_required()
# def admin_required():
#     user = get_jwt_identity()
#     if not user['is_admin']:
#         return jsonify({'message': 'Admins only!'}), 403

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@admin_bp.route('/bookings', methods=['GET'])
@admin_required
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([booking.serialize() for booking in bookings]), 200

@admin_bp.route('/flights', methods=['POST'])
def add_flight():
    data = request.get_json()
    new_flight = Flight(**data)
    db.session.add(new_flight)
    db.session.commit()
    return jsonify({'message': 'Flight added successfully'}), 201

@admin_bp.route('/flights/<int:id>', methods=['PUT'])
def update_flight(id):
    data = request.get_json()
    flight = Flight.query.get_or_404(id)
    for key, value in data.items():
        setattr(flight, key, value)
    db.session.commit()
    return jsonify({'message': 'Flight updated successfully'}), 200

@admin_bp.route('/flights/<int:id>', methods=['DELETE'])
def delete_flight(id):
    flight = Flight.query.get_or_404(id)
    flight.soft_deleted = True
    db.session.commit()
    return jsonify({'message': 'Flight deleted successfully'}), 200


# getting all flights
@admin_bp.route('/allflights', methods=['GET'])
@admin_required
def get_flights():
    flights = Flight.query.all()
    return jsonify([flight.serialize() for flight in flights]), 200