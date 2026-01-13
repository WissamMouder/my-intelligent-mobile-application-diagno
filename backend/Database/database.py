import pymysql
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DATABASE_NAME = 'diagono'

def create_database(app):
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
    try:
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DATABASE_NAME}")
        connection.commit()
    finally:
        connection.close()

    with app.app_context():
        db.init_app(app)
        db.create_all()  # Create tables
        print("Database and tables created successfully.")
