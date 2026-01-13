from flask import Blueprint, request, jsonify, session, send_from_directory
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os
from werkzeug.utils import secure_filename
import logging
from Database.models import Prediction
from datetime import datetime

# Create a Blueprint
predictions_bp = Blueprint('predictions', __name__)

# Configuration for the upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Global variables for loaded models and classes
fibrose_model = None
lung_model = None
lung_classes = ["Bacterial Pneumonia", "Corona Virus Disease", "Normal", "Tuberculosis", "Viral Pneumonia"]

def load_fibrose_model():
    global fibrose_model
    if fibrose_model is None:
        model_path = 'modelIA/model_inceptionV3.h5'
        fibrose_model = load_model(model_path)

def load_lung_model():
    global lung_model
    if lung_model is None:
        model_path = 'C:/Users/HP/Downloads/densenet201.hdf5'
        lung_model = load_model(model_path)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'bmp', 'tiff'}

def predict_fibrose_image(image_path):
    load_fibrose_model()
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224, 224))
    img = img.astype(np.float32) / 255.0
    img = np.expand_dims(img, axis=0)
    prediction = fibrose_model.predict(img)
    return 'Fibrose' if prediction[0] > 0.5 else 'Non fibrose'

def predict_lung_diseases_image(image_path):
    load_lung_model()
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224, 224))
    img = img.astype(np.float32) / 255.0
    img = np.expand_dims(img, axis=0)
    prediction = lung_model.predict(img)
    
    predicted_class_index = np.argmax(prediction[0])
    
    if predicted_class_index < len(lung_classes):
        predicted_class = lung_classes[predicted_class_index]
        return predicted_class
    else:
        return 'Unknown'

def predict_combined(image_path):
    fibrose_prediction = predict_fibrose_image(image_path)
    lung_disease_prediction = predict_lung_diseases_image(image_path)
    # Concatenate the predictions into a single string
    combined_prediction = f"Fibrose: {fibrose_prediction}, Lung Disease: {lung_disease_prediction}"
    return combined_prediction

@predictions_bp.route('/api/predict_combined', methods=['POST'])
def predict_combined_route():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        image_file = request.files['image']
        if image_file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if image_file and allowed_file(image_file.filename):
            filename = secure_filename(image_file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            image_file.save(filepath)

            combined_prediction = predict_combined(filepath)
            
            if combined_prediction is None:
                return jsonify({'error': 'Prediction failed'}), 500
            
            patient_id = session.get('patient_id')
            if not patient_id:
                return jsonify({'error': 'User not logged in'}), 401
            
            # Save prediction to database
            new_prediction = Prediction(image_path=filepath, prediction=combined_prediction, patient_id=patient_id, prediction_time=datetime.now())
            db.session.add(new_prediction)
            db.session.commit()

            return jsonify({'prediction': combined_prediction}), 200
        
        return jsonify({'error': 'Invalid file type'}), 400
    except Exception as e:
        logging.error(f"Error in prediction process: {e}")
        return jsonify({'error': 'An error occurred during prediction'}), 500

@predictions_bp.route('/api/history', methods=['GET'])
def get_history():
    try:
        patient_id = session.get('patient_id')
        if not patient_id:
            return jsonify({'error': 'User not logged in'}), 401
        
        # Filtrer les prédictions par patient_id
        predictions = Prediction.query.filter_by(patient_id=patient_id).all()
        
        # Créer la liste des prédictions uniquement pour le patient connecté
        history = [{'id': prediction.id, 'image_path': prediction.image_path, 'prediction': prediction.prediction, 'prediction_time': prediction.prediction_time} for prediction in predictions]
        
        return jsonify({'history': history}), 200
    
    except Exception as e:
        logging.error(f"Error fetching history: {e}")
        return jsonify({'error': 'An error occurred fetching history'}), 500

@predictions_bp.route('/api/history/<int:prediction_id>', methods=['DELETE'])
def delete_prediction(prediction_id):
    try:
        prediction = Prediction.query.get(prediction_id)
        if not prediction:
            return jsonify({'error': 'Prediction not found'}), 404
        
        db.session.delete(prediction)
        db.session.commit()
        
        return jsonify({'message': 'Prediction deleted successfully'}), 200
    
    except Exception as e:
        logging.error(f"Error deleting prediction: {e}")
        return jsonify({'error': 'An error occurred deleting prediction'}), 500

@predictions_bp.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
