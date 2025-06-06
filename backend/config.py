from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import secrets

app = Flask(__name__)
app.config["SECRET_KEY"] = secrets.token_hex(16)

app.config["SESSION_COOKIE_SAMESITE"] = "Lax"    # or "None" if using HTTPS
app.config["SESSION_COOKIE_SECURE"] = False  
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)


db = SQLAlchemy(app)
