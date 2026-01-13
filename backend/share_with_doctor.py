from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/share_with_doctor', methods=['POST'])
def share_with_doctor():
    data = request.json
    # You will have the following keys in data: 'doctor_id', 'patient_id', 'image', 'prediction', 'prediction_time'
    doctor_id = data['doctor_id']
    patient_id = data['patient_id']
    image = data['image']
    prediction = data['prediction']
    prediction_time = data['prediction_time']

    # Here you would typically handle storing or forwarding this data as necessary
    # For simplicity, we just print it out
    print(f"Sharing with Doctor ID: {doctor_id}")
    print(f"Patient ID: {patient_id}")
    print(f"Image URL: {image}")
    print(f"Prediction: {prediction}")
    print(f"Prediction Time: {prediction_time}")

    # Respond with a success message
    return jsonify({"message": "Data shared successfully"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

