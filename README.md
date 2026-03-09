<img width="64" height="64" alt="icons8-react-native-64" src="https://github.com/user-attachments/assets/bcf43fe5-7bab-4ea9-9510-34c9ff650bd5" />
<img width="48" height="48" alt="icons8-python-48" src="https://github.com/user-attachments/assets/c9d17f5a-4c2d-4dd3-9ee6-2a85a53439d6" />

 This mobile application  i created  using react  in frontend ,pyton flask backend  is an intelligent system I developed to facilitate communication between doctors and patients, allowing them to share analyses and radiology results without needing to travel. Additionally, I integrated artificial intelligence features, including: 

  A chatbot that provides diagnostic suggestions based on the symptoms selected by the patient.

 Radiology scanning to help determine which pulmonary diseases the patient may have.
 
well for Disease detection models i built  it using TensorFlow with Transfer Learning (ResNet-50) for accurate classification.

 and  Custom machine learning-based chatbot that I implemented with Flask, NLTK, and TensorFlow, handling intents and responses through tokenization, lemmatization, and bag-of-words representation.

 The application also includes a web admin template for managing and validating doctors.
 
  # Vedeo 1 for showing this  intellignet mobile application 

https://github.com/user-attachments/assets/eccdc49d-4c6a-40e6-85fa-d890b4cdcfa5


 # Vedeo 2 for showing Admin template that manage the application from validation doctors and  others tasks


https://github.com/user-attachments/assets/fffef0b7-1a03-4083-b385-d611ab8a14ae


 ##  How to Run the Application

This project contains:

* Frontend → React Expo mobile application
* Backend → Flask Python server

---

##  Frontend (Expo React Application)

### 1. Install Node.js and Expo CLI

```bash
npm install -g expo-cli
```

---

### 2. Go to Frontend Directory

Assume the frontend project is located in:

```
Desktop/diagno/fibrose
```

Enter the directory:

```bash
cd Desktop/diagno/fibrose
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start Expo Application

```bash
npm start
```

Then scan the QR code using Expo Go mobile app.

---

##  Backend (Flask Python Server)

### 1. Install Python

Make sure Python 3.x is installed.

Check version:

```bash
python --version
```

---

### 2. Go to Backend Folder

Inside the project backend directory:

```bash
cd backend
```

---

### 3. Create Virtual Environment (Recommended)

```bash
python -m venv venv
```

Activate environment:

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

---

### 4. Install Python Dependencies

```bash
pip install -r requirements.txt
```

If requirements.txt does not exist:

```bash
pip install flask flask-cors numpy pandas scikit-learn
```

---

### 5. Run Flask Server

```bash
python app.py
```

The backend server will run usually on:

```
http://127.0.0.1:5000
```

---


##  Project Structure

```
Desktop/diagno/fibrose
│
├── frontend (Expo React App)
├── backend (Flask Python API)
└── README.md
```

 




