from models import db, Booking, Flight
from datetime import datetime


def create_booking(user_id, flight_id, payment_method, payment_details):
    flight = Flight.query.get_or_404(flight_id)
    if flight.seats_available <= 0:
        return {'error': 'No seats available'}, 400

    new_booking = Booking(
        user_id=user_id,
        flight_id=flight_id,
        booking_date=datetime.utcnow(),
        status='confirmed',
        payment_method=payment_method,
        payment_details=payment_details
    )
    flight.seats_available -= 1
    db.session.add(new_booking)
    db.session.commit()
    return new_booking, 201


def cancel_booking(booking):
    if booking.booking_date <= datetime.utcnow():
        return {'error': 'Cannot cancel past bookings'}, 400

    booking.status = 'canceled'
    db.session.commit()
    return {'message': 'Booking canceled successfully'}, 200


def update_booking(booking, data):
    for key, value in data.items():
        setattr(booking, key, value)
    db.session.commit()
    return {'message': 'Booking updated successfully'}, 200
