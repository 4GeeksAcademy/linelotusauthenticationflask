"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Simple in-memory storage for users (for testing)
# In production, this should be a proper database
registered_users = {}

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400
    
    print(f"Login attempt for: {email}")  # Debug log
    print(f"Registered users: {list(registered_users.keys())}")  # Debug log
    
    # Check if user exists and password matches
    if email in registered_users and registered_users[email] == password:
        print(f"Login successful for: {email}")  # Debug log
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    else:
        print(f"Login failed for: {email}")  # Debug log
        return jsonify({"msg": "Invalid email or password"}), 401

@api.route("/signup", methods=["POST"])
def signup():
    try:
        print("Signup request received")  # Debug log
        
        # Check if request has JSON
        if not request.is_json:
            return jsonify({"msg": "Content-Type must be application/json"}), 415
            
        data = request.get_json()
        print("Request data:", data)  # Debug log
        
        if not data:
            return jsonify({"msg": "No JSON data provided"}), 400
            
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return jsonify({"msg": "Email and password required"}), 400
        
        # Check if user already exists
        if email in registered_users:
            print(f"User already exists: {email}")  # Debug log
            return jsonify({"msg": "User already exists"}), 400
        
        # Save user credentials (in memory for now)
        registered_users[email] = password
        print(f"User created successfully: {email}")  # Debug log
        print(f"Current registered users: {list(registered_users.keys())}")  # Debug log
        
        return jsonify({"msg": "User created successfully"}), 201
        
    except Exception as e:
        print(f"Signup error: {str(e)}")  # Debug log
        return jsonify({"msg": f"Server error: {str(e)}"}), 500

@api.route("/private", methods=["GET"])
@jwt_required()
def get_private_data():
    current_user = get_jwt_identity()
    return jsonify({"user": current_user, "message": "This is private data!"})

# Debug endpoint to see registered users (remove in production)
@api.route("/debug/users", methods=["GET"])
def debug_users():
    return jsonify({"registered_users": list(registered_users.keys())})