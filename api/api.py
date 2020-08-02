import time

import pymongo
from flask import Flask, jsonify, request, json
from flask_pymongo import PyMongo, MongoClient
from bson.objectid import ObjectId
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from zeep.xsd import const

app = Flask(__name__)

# app.config['MONGO_DBNAME'] = 'mybook'
# app.config['MONGO_URI'] = 'mongodb://localhost:27017/mybook'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['MONGO_DBNAME'] = 'mybook'
app.config['MONGO_URI'] = 'mongodb+srv://admin:admin123@mybook.fgysf.mongodb.net/mybook?retryWrites=true&w=majority'

client = pymongo.MongoClient("mongodb+srv://admin:admin123@mybook.fgysf.mongodb.net/mybook?retryWrites=true&w=majority")
db = client.test


mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)
@app.route('/users/profile', methods=['POST'])
def get_data():
    users = mongo.db.users
    username = request.get_json()['username']
    allnotes = users.distinct("notes", {'username': username})
    favoriteNote= ''
    timetable = []
    alllectures = users.distinct("timetable", {'username': username})

    for n in alllectures:
        timetable.append({'lecture': n['lecture'], 'color': n['color'], 'startMo': n['startMo'], 'endMo': n['endMo'],'startTu': n['startTu'], 'endTu': n['endTu'],'startWe': n['startWe'], 'endWe': n['endWe'],'startTh': n['startTh'], 'endTh': n['endTh'],'startFr': n['startFr'], 'endFr': n['endFr']})

    for x in allnotes:
        if(x["nfavorite"]):
            favoriteNote = x['content']

    access_token = create_access_token(identity = {
        'username': username,
        'timetable': timetable,
        'favoriteNote': favoriteNote
    })

    
    
    result= jsonify({'token': access_token})

    return result




@app.route('/users/timetable', methods=['GET','POST'])
def create_timetable():
    users = mongo.db.users
    username = request.get_json()['username']
    newlecture = request.get_json()['newlecture']
    color = request.get_json()['color']
    starttimemonday = request.get_json()['starttimemonday']
    endtimemonday = request.get_json()['endtimemonday']
    starttimetuesday = request.get_json()['starttimetuesday']
    endtimetuesday = request.get_json()['endtimetuesday']
    starttimewednesday = request.get_json()['starttimewednesday']
    endtimewednesday = request.get_json()['endtimewednesday']
    starttimethursday = request.get_json()['starttimethursday']
    endtimethursday = request.get_json()['endtimethursday']
    starttimefriday = request.get_json()['starttimefriday']
    endtimefriday = request.get_json()['endtimefriday']
    resultlectures = ''

    users.update_one({'username': username}, {'$push': {'timetable': {'_lid': ObjectId(), 'lecture': newlecture, 'color': color, 'startMo': starttimemonday, 'endMo': endtimemonday, 'startTu': starttimetuesday, 'endTu': endtimetuesday, 'startWe': starttimewednesday, 'endWe': endtimewednesday, 'startTh': starttimethursday, 'endTh': endtimethursday, 'startFr': starttimefriday, 'endFr': endtimefriday}}})
    alllectures = users.distinct("timetable", {'username': username})
    result = []

    for n in alllectures:
        result.append({'lecture': n['lecture'], 'color': n['color'], 'startMo': n['startMo'], 'endMo': n['endMo'],'startTu': n['startTu'], 'endTu': n['endTu'],'startWe': n['startWe'], 'endWe': n['endWe'],'startTh': n['startTh'], 'endTh': n['endTh'],'startFr': n['startFr'], 'endFr': n['endFr']})

    access_token = create_access_token(identity={
        'lectures': result,
        'username': username
    })

    resultlectures = jsonify({'token': access_token})
    
    return resultlectures


@app.route('/users/note', methods=['GET', 'POST'])
def add_note():

    users = mongo.db.users
    newnote = request.get_json()['newnote']
    username= request.get_json()['username']
    ntimestemp = datetime.utcnow()
    nfavorite = False
    resultNotes =''

    users.update_one({'username': username},
                    {'$push': {'notes': {'_nid': ObjectId(), 'content': newnote, 'ntimestemp':ntimestemp, 'nfavorite':nfavorite}}})

    allnotes = users.distinct("notes.content", {'username': username})
    noteslist = []

    if len(allnotes) >= 3:
        for x in range(-3, 0):
            noteslist.append(allnotes[x])
            x = x - 1
    else:
        noteslist = allnotes

    access_token = create_access_token(identity={
        'notes': noteslist,
        'username':username
    })
    resultNotes = jsonify({'token': access_token})

    return resultNotes

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
            studyprogram = request.get_json()['studyprogram']
            # studyprogram = 'program'

            uid = users.insert({
                'username': username,
                'email': email,
                'studyprogram': studyprogram,
                'password': password,
                'created': created,
                'notes': [],
                'assignnents': [],
                'exams':[],
                'timetable':[],
                "tasks": []
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


    alllectures = users.distinct("timetable", {'username': username})
    result = []

    for n in alllectures:
        result.append({'lecture': n['lecture'], 'color': n['color'], 'startMo': n['startMo'], 'endMo': n['endMo'],
                       'startTu': n['startTu'], 'endTu': n['endTu'], 'startWe': n['startWe'], 'endWe': n['endWe'],
                       'startTh': n['startTh'], 'endTh': n['endTh'], 'startFr': n['startFr'], 'endFr': n['endFr']})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
                'username': response['username'],
                'email': response['email'],
                'studyprogram': response['studyprogram'],
                'notes': noteslist,
                'favoriteNote': favoriteNote,
                'noteslist':result,

            })
            result= jsonify({'token': access_token})


        else:
            result = jsonify({"error":"Invalid username and password"})
    else:
        result = jsonify({"result":"No results found"})
    return result

@app.route('/users/assignments', methods=['GET','POST'])
def assignments():
    users = mongo.db.users
    username = request.get_json()['username']
    newassignment = request.get_json['newassignment']
    submission = request.get_json['submission']
    resultassignments = ''

    users.update_one({'username': username}, {'$push': {'assignments': {'_aid':ObjectId(), 'assignment':newassignment, 'submission':submission}}})
    allasignments = users.distinct("assignments", {'username': username})
    result = []

    for n in allasignments:
        result.append({'assignment':n['assignment'],'submission':n['submission']})

    access_token = create_access_token(identity={
        'assignments': result,
        'username': username
    })
    resultassignments = jsonify({'token': access_token})

    return resultassignments


@app.route('/users/examen', methods=['GET','POST'])
def examen():
    users = mongo.db.users
    username = request.get_json()['username']
    newexamen = request.get_json['newexamen']
    submission = request.get_json['submission']
    resultexamen = ''

    users.update_one({'username': username}, {'$push': {'examen': {'_aid':ObjectId(), 'examen':newexamen, 'submission':submission}}})
    allexamen = users.distinct("examen", {'username': username})
    result = []

    for n in allexamen:
        result.append({'examen':n['examen'], 'submission':n['submission']})

    access_token = create_access_token(identity={
        'examen': result,
        'username': username
    })
    resultexamen = jsonify({'token': access_token})

    return resultexamen




