from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from myenv.models import db,User
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')
#
#     user = User.query.filter_by(email=email).first()
#
#     if not user or not user.check_password(password):
#         return jsonify({'message': 'Invalid credentials'}), 401
#
#     access_token = create_access_token(identity={'id': user.id, 'is_admin': user.is_admin},
#                                        expires_delta=timedelta(days=1))
#     return jsonify({'access_token': access_token}), 200
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity={'username': user.username, 'is_admin': user.is_admin, 'id': user.id})
        return jsonify({'token': access_token, 'user': {'username': user.username, 'is_admin': user.is_admin, 'id' : user.id}}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401