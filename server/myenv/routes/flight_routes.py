from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from myenv.models import db, Flight
from datetime import datetime

flight_bp = Blueprint('flights', __name__)

@flight_bp.route('/search', methods=['GET'])
@jwt_required()
def search_flights():
    source = request.args.get('source')
    destination = request.args.get('destination')
    travel_date = request.args.get('travel_date')

    try:
        # Convert travel_date to a datetime object
        travel_date = datetime.strptime(travel_date, "%Y-%m-%d")
    except ValueError:
        return jsonify({'message': 'Invalid date format. Use YYYY-MM-DD'}), 400

    flights = Flight.query.filter(
        Flight.source == source,
        Flight.destination == destination,
        Flight.departure_time >= travel_date
    ).all()

    if not flights:
        return jsonify({'message': 'No flights found'}), 404

    return jsonify([flight.serialize() for flight in flights]), 200
