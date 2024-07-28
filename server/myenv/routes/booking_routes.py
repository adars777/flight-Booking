from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Booking, Flight, User
from datetime import datetime

booking_bp = Blueprint('bookings', __name__)



@booking_bp.route('/', methods=['POST'])
@jwt_required()
def create_booking():
    # print('in func')
    user = get_jwt_identity()
    data = request.get_json()
    print(data)
    # print('booking done')
    new_booking = Booking(
        user_id=user['id'],
        flight_id=data['flight_id'],
        status='booked',
        payment_method=data['payment_method'],
        payment_details=data['payment_details']
    )
    # print('got data')
    db.session.add(new_booking)
    db.session.commit()

    return jsonify({'message': 'Booking created successfully'}), 201


@booking_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_booking(id):
    user = get_jwt_identity()
    booking = Booking.query.get_or_404(id)

    if booking.user_id != user['id']:
        return jsonify({'message': 'Unauthorized'}), 403

    data = request.get_json()
    for key, value in data.items():
        setattr(booking, key, value)
    db.session.commit()

    return jsonify({'message': 'Booking updated successfully'}), 200


@booking_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def cancel_booking(id):
    user = get_jwt_identity()
    booking = Booking.query.get_or_404(id)

    if booking.user_id != user['id']:
        return jsonify({'message': 'Unauthorized'}), 403

    if booking.booking_date <= datetime.utcnow():
        return jsonify({'message': 'Cannot cancel past bookings'}), 400

    booking.status = 'canceled'
    db.session.commit()

    return jsonify({'message': 'Booking canceled successfully'}), 200


@booking_bp.route('/mybooking', methods=['GET'])
@jwt_required()
def get_user_bookings():
    print('under get booking')
    user = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=user['id'], soft_deleted=False).all()
    return jsonify([booking.serialize() for booking in bookings]), 200
