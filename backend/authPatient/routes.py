from flask import Blueprint, request, jsonify, session
from Database.models import Patient
from bcrypt import hashpw, gensalt, checkpw
from email_validator import validate_email, EmailNotValidError
import secrets

auth_bp = Blueprint('auth', __name__)

# Route d'enregistrement
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')  # Ajout du champ nom
    age = data.get('age')    # Ajout du champ âge

    if not email or not password or not name or not age:
        return jsonify({"error": "Email, password, name, and age are required"}), 400

    try:
        # Validate the email
        valid = validate_email(email)
        email = valid.email
    except EmailNotValidError as e:
        return jsonify({"error": str(e)}), 400

    # Hash the password with bcrypt
    hashed_password = hashpw(password.encode('utf-8'), gensalt())

    new_user = Patient(email=email, password=hashed_password.decode('utf-8'), name=name, age=age)  # Ajout des champs nom et âge

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Route de connexion
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = Patient.query.filter_by(email=email).first()
    if not user or not checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"error": "Invalid email or password"}), 401

    # Store patient ID in session
    session['patient_id'] = user.id

    return jsonify({"message": "Login successful"}), 200

# Route de demande de réinitialisation de mot de passe
@auth_bp.route('/request-reset-password', methods=['POST'])
def request_reset_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = Patient.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Generate a temporary reset token
    token = secrets.token_urlsafe(16)
    user.reset_token = token
    db.session.commit()

    # TODO: Send an email to the user with a link containing 'token' to reset the password

    return jsonify({"message": "Password reset request processed. Check your email for instructions."}), 200

# Route de réinitialisation de mot de passe avec nouvelle méthode sans token
@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('newPassword')

    if not email or not new_password:
        return jsonify({"error": "Email and newPassword are required"}), 400

    user = Patient.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Hash the new password
    hashed_password = hashpw(new_password.encode('utf-8'), gensalt())
    user.password = hashed_password.decode('utf-8')

    db.session.commit()

    return jsonify({"message": "Password reset successful. You can now login with your new password."}), 200

# Route de déconnexion
@auth_bp.route('/logout', methods=['POST'])
def logout():
    # Effacer la session utilisateur
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200
