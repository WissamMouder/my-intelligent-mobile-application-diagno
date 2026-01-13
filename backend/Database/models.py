from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_database(app):
    with app.app_context():
        db.create_all()

# Define your models here
from datetime import datetime
import bcrypt

class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    specialty = db.Column(db.String(100), nullable=False)
    license_number = db.Column(db.String(50), unique=True, nullable=False)
    is_verified = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    predictions = db.relationship('Prediction', backref='patient', lazy=True)

class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_path = db.Column(db.String(200), nullable=False)
    prediction = db.Column(db.String(255), nullable=False)
    prediction_time = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
