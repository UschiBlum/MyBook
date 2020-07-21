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




@app.route('/users/notes', methods=['GET', 'POST'])
def notes():

    notes = mongo.db.notes
    users = mongo.db.users
    time = datetime.utcnow()
    user = users.find_one({'username':request.get_json()['username']})
    uid = user._id
    content = request.get_json()['textarea']
    
    nid = notes.insert({
        'date': time,
        'userID': uid,
        'content': content,
        'time': time,
    })

    newnote = notes.find_one({'_id': nid})
    result = {'content': newnote['content'] + ' is saved'}

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
                'email': response['email'],
                'studyprogram': response['studyprogram']
            })
            result= jsonify({'token': access_token})
        else:
            result = jsonify({"error":"Invalid username and password"})
    else:
        result = jsonify({"result":"No results found"})
    return result

    #@app.route('/notes', methods=['GET', 'POST'])
    #def notes():
      #  if session['login'] == 'True':
     #       form = LoginForm()
     #       if request.method == 'POST':
     #           user = mongo.db.user
     #           login_user = user.find_one({'email': request.form.get("email")})
     #           print("Login_user:")
     #           print(login_user)
     #           if login_user:
     #               if bcrypt.checkpw(request.form.get('password').encode('utf-8'), login_user['password'].encode('utf-8')):
     #                   session['firstname'] = login_user['firstname']
     #                   session['lastname'] = login_user['lastname']
     #                   session['birthday'] = login_user['birthday']
     #                   session['email'] = login_user['email']
    #                    session['logged_in'] = True
   #                     return render_template('profil.html')
  #                  session['logged_in'] = False
 #               return render_template('failLogin.html')
#
     #   return render_template('login.html', form=form)''

@app.route('/time')
def get_current_time():
    return {'time': time.time()}