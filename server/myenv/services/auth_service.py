from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

def hash_password(password):
    return generate_password_hash(password)

def check_password_hash(pwhash, password):
    return check_password_hash(pwhash, password)

def register_user(username, email, password):
    if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
        return {'message': 'User already exists'}, 400

    new_user = User(username=username, email=email)
    new_user.password = hash_password(password)
    db.session.add(new_user)
    db.session.commit()

    return {'message': 'User registered successfully'}, 201

def authenticate_user(email, password):
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return None
    return user
