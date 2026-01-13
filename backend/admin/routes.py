from flask import Blueprint, jsonify, request
from Database.models import Doctor, db

admin_bp = Blueprint('admin', __name__)

ADMIN_KEY = 'supersecretadminkey'

@admin_bp.route('/validate_doctor', methods=['POST'])
def validate_doctor():
    admin_key = request.headers.get('Admin-Key')
    if admin_key != ADMIN_KEY:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()
    doctor_id = data.get('doctor_id')
    is_verified = data.get('is_verified')

    doctor = Doctor.query.get(doctor_id)
    if not doctor:
        return jsonify({'error': 'Doctor not found'}), 404

    doctor.is_verified = is_verified
    db.session.commit()

    if is_verified:
        # Envoyer un message de validation au médecin (par exemple, par email ou notification in-app)
        # Ici, nous simulons l'envoi d'un message avec une réponse JSON
        response = {'message': f'Doctor {doctor.name} validated successfully.'}

        # Vous pouvez également retourner un statut 201 (Created) si vous préférez
        return jsonify(response), 200
    else:
        # Envoyer un message de rejet au médecin (par exemple, par email ou notification in-app)
        # Ici, nous simulons l'envoi d'un message avec une réponse JSON
        response = {'message': f'Doctor {doctor.name} rejected.'}

        # Retourner un statut 200 (OK) si le rejet est réussi
        return jsonify(response), 200

@admin_bp.route('/list_doctors', methods=['GET'])
def list_doctors():
    admin_key = request.headers.get('Admin-Key')
    if admin_key != ADMIN_KEY:
        return jsonify({'error': 'Unauthorized'}), 401

    doctors = Doctor.query.filter_by(is_verified=False).all()
    doctor_list = [{'id': doctor.id, 'name': doctor.name, 'email': doctor.email, 'specialty': doctor.specialty, 'license_number': doctor.license_number} for doctor in doctors]

    return jsonify(doctor_list), 200
