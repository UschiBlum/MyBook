import time
from flask import Flask, jsonify, request, json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'mybook'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/mybook'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/users/register', methods=['GET', 'POST'])
def register():
    users = mongo.db.users
    existing_user = users.find_one({'username':request.get_json()['username']})

    if existing_user is None:
        passwordtest = request.get_json()['password']
        if passwordtest == request.get_json()['confirmpassword']:
            username = request.get_json()['username']
            email = request.get_json()['email']
            password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
            created = datetime.utcnow()
            # studyprogram = request.get_json()['studyprogram']
            studyprogram = 'program'

            uid = users.insert({
                'username': username,
                'email': email,
                'studyprogram': studyprogram,
                'password': password,
                'created': created
            })

            newuser = users.find_one({'_id': uid})
            result = {'username': newuser['username'] + ' registered'}
    else:
        result = {'username': existing_user['username'] + ' has registered before'}
    return jsonify({'result': result})


@app.route('/users/login', methods=['POST'])
def login():
    users = mongo.db.users
    username = request.get_json()['username']
    password = request.get_json()['password']
    result = ""

    response = users.find_one({'username':username})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
                'username': response['username'],
                'email': response['email']
            })
            result= jsonify({'token': access_token})
        else:
            result = jsonify({"error":"Invalid username and password"})
    else:
        result = jsonify({"result":"No results found"})
    return result



@app.route('/time')
def get_current_time():
    return {'time': time.time()}