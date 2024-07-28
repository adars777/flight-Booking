from myenv.models import db, Flight
from datetime import datetime

def search_flights(source, destination, travel_date):
    travel_date = datetime.strptime(travel_date, '%Y-%m-%d')
    flights = Flight.query.filter(
        Flight.source == source,
        Flight.destination == destination,
        Flight.departure_time >= travel_date,
        Flight.soft_deleted == False
    ).all()
    return flights

def add_flight(data):
    new_flight = Flight(**data)
    db.session.add(new_flight)
    db.session.commit()
    return new_flight

def update_flight(flight_id, data):
    flight = Flight.query.get_or_404(flight_id)
    for key, value in data.items():
        setattr(flight, key, value)
    db.session.commit()
    return flight

def delete_flight(flight_id):
    flight = Flight.query.get_or_404(flight_id)
    flight.soft_deleted = True
    db.session.commit()
    return flight
