from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from Database.models import Doctor, db

authDoctor_bp = Blueprint('authDoctor', __name__)

@authDoctor_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    specialty = data.get('specialty')
    license_number = data.get('license_number')

    if Doctor.query.filter_by(email=email).first() is not None:
        return jsonify({'error': 'Email already registered'}), 400

    doctor = Doctor(email=email, name=name, specialty=specialty, license_number=license_number)
    doctor.set_password(password)
    db.session.add(doctor)
    db.session.commit()

    return jsonify({'message': 'Doctor registered successfully. Awaiting admin validation.'}), 201

@authDoctor_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    doctor = Doctor.query.filter_by(email=email).first()
    if doctor and doctor.check_password(password):
        if not doctor.is_verified:
            return jsonify({'error': 'Account not verified by admin'}), 403

        access_token = create_access_token(identity=doctor.id)
        session['logged_in'] = True
        return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@authDoctor_bp.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('new_password')

    doctor = Doctor.query.filter_by(email=email).first()
    if doctor:
        doctor.set_password(new_password)
        db.session.commit()
        return jsonify({'message': 'Password reset successfully'}), 200
    else:
        return jsonify({'error': 'Doctor not found'}), 404
