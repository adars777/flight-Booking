from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from myenv.models import User

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        current_user = get_jwt_identity()
        user = User.query.get(current_user['id'])
        if user and user.is_admin:
            return fn(*args, **kwargs)
        else:
            return jsonify({'message': 'Admin privileges required'}), 403
    return wrapper

def jwt_optional(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request(optional=True)
            current_user = get_jwt_identity()
            if current_user:
                user = User.query.get(current_user['id'])
                kwargs['current_user'] = user
        except Exception:
            pass
        return fn(*args, **kwargs)
    return wrapper
