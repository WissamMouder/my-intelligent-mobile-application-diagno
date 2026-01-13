from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from predections.predictions import predictions_bp
from chatbot.chatbot import chatbot_bp 
from authPatient.routes import auth_bp
from authDoctor.auth import authDoctor_bp  
from Database.models import db, create_database


# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration for MySQL database
DATABASE_NAME = 'project'
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:@localhost/{DATABASE_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'azdhkofpjk, 23flmml6:!iluht'  
app.config['JWT_SECRET_KEY'] = 'AZERTYUIO4689§§//UZPROG096789804FF%£'  # Set a secret key for JWT



# Create the database if it does not exist
create_database(app)
# Initialize JWT
jwt = JWTManager(app)
db.init_app(app)


# Register the Blueprints
app.register_blueprint(predictions_bp)
app.register_blueprint(chatbot_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')  # Register auth blueprint with prefix
app.register_blueprint(authDoctor_bp, url_prefix='/authDoctor')  # Register the new authDoctor blueprint

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
