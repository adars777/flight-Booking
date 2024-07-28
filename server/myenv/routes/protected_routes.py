from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

protected_bp = Blueprint('protected', __name__)

@protected_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    print(current_user)
    user = User.query.get(current_user['id'])

    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({'message': 'User not found'}), 404
