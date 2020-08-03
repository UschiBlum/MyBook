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


@app.route('/users/profile', methods=['POST','GET'])
def get_data():
    users = mongo.db.users
    username = request.get_json()['username']
    allnotes = users.distinct("notes", {'username': username})
    alltodos = users.distinct("tasks", {'username': username})
    print(alltodos)
    favoriteNote= ''
    timetable = []
    alllectures = users.distinct("timetable", {'username': username})

    for n in alllectures:
        timetable.append({'lecture': n['lecture'], 'color': n['color'], 'startMo': n['startMo'], 'endMo': n['endMo'], 'startTu': n['startTu'], 'endTu': n['endTu'],'startWe': n['startWe'], 'endWe': n['endWe'],'startTh': n['startTh'], 'endTh': n['endTh'],'startFr': n['startFr'], 'endFr': n['endFr']})

    for x in allnotes:
        if(x["nfavorite"]):
            favoriteNote = x['content']

    access_token = create_access_token(identity = {
        'username': username,
        'timetable': timetable,
        'favoriteNote': favoriteNote,
        'todolist': alltodos,
        'refreshlist':alltodos
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
    favoriteNote = request.get_json()['favoriteNote']
    favorite = request.get_json()['favorite']
    resultNotes =''

    print("newnote")
    print(newnote)

    if(favorite):
        users.update_one({'username': username, 'notes.content': favoriteNote}, {'$set': {'notes': {'nfavorite':False}}})

    users.update_one({'username': username},
                    {'$push': {'notes': {'_nid': ObjectId(), 'content': newnote, 'ntimestemp':ntimestemp, 'nfavorite':favorite}}})

    allnotes = users.distinct("notes", {'username': username})
    timestemps = []
    result = []
    for n in allnotes:
        timestemps.append({'content': n['content'], "ntimestemp": n['ntimestemp']})

    for i in range(len(timestemps) - 1):
        for j in range(0, len(timestemps) - i - 1):
            if timestemps[j]['ntimestemp'] > timestemps[j + 1]['ntimestemp']:
                timestemps[j], timestemps[j + 1] = timestemps[j + 1], timestemps[j]

    for n in timestemps:
        result.append(n['content'])

    noteslist = []

    if len(result) >= 3:
        for x in range(-3, 0):
            noteslist.append(result[x])
            x = x - 1
    else:
        noteslist = result

    access_token = create_access_token(identity={
        'notes': noteslist,
        'username':username,
        'nfavorite': newnote
    })
    resultNotes = jsonify({'token': access_token})

    print(allnotes)
    print(noteslist)
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
                'assignments': [],
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
    allnotes = users.distinct("notes.content", {'username': username})
    allnotes2 = users.distinct("notes", {'username': username})
    noteslist = []
    favoriteNote = ''

    for x in allnotes2:
        if (x["nfavorite"]):
            favoriteNote = x['content']

    if len(allnotes) >= 3:
        for x in range(-3, 0):
            noteslist.append(allnotes[x])
            x = x - 1
    else:
        noteslist = allnotes

    alllectures = users.distinct("timetable", {'username': username})
    resultl = []

    for n in alllectures:
        resultl.append({'lecture': n['lecture'], 'color': n['color'], 'startMo': n['startMo'], 'endMo': n['endMo'],
                       'startTu': n['startTu'], 'endTu': n['endTu'], 'startWe': n['startWe'], 'endWe': n['endWe'],
                       'startTh': n['startTh'], 'endTh': n['endTh'], 'startFr': n['startFr'], 'endFr': n['endFr']})

    allasignments = users.distinct("assignments", {'username': username})
    print("allassignments1")
    print("resukta")
    alltodos = users.distinct('tasks', {'username': username})
    print("todos")
    print(alltodos)


    allexams = users.distinct("exams", {'username': username})

    print("exam")


    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity={
                'username': response['username'],
                'email': response['email'],
                'studyprogram': response['studyprogram'],
                'notes': noteslist,
                'favoriteNote': favoriteNote,
                'noteslist':result,
                'assignmentlist': allasignments,
                'todolist': alltodos,
                'timetable': resultl,
                'deletetodolist': alltodos,
                'examlist': allexams,
                'deleteassignmentlist': allasignments,
                'deleteexamlist':allexams

            })
            result= jsonify({'token': access_token})


        else:
            result = jsonify({"error":"Invalid username and password"})
    else:
        result = jsonify({"result":"No results found"})
    return result



@app.route('/users/assignments', methods=['GET', 'POST'])
def add_assignments():
    users = mongo.db.users
    username = request.get_json()['username']
    newassignment = request.get_json()['newassignment']
    resultassignments = ''

    users.update_one({'username': username}, {'$push': {'assignments':  newassignment}})
    allasignments = users.distinct("assignments", {'username': username})



    access_token = create_access_token(identity={
        'assignmentlist': allasignments,
        'username': username
    })
    resultassignments = jsonify({'token': access_token})
    return resultassignments


@app.route('/users/deleteassignment', methods=['GET','POST'])
def deleteassignment():
    users = mongo.db.users
    deleteassignment = request.get_json()['deleteassignment']
    username = request.get_json()['username']
    resultdeleteassignment = ''
    print("delete assignments")
    print(deleteassignment)
    users.update_many({'username': username}, {'$pull':{'assignments':deleteassignment}})

    allassignments= users.distinct("assignments",{'username':username})


    access_token = create_access_token(identity={
        'deleteassignmentlist':allassignments
    })
    resultdeleteassignment = jsonify({'token':access_token})

    return resultdeleteassignment





@app.route('/users/examen', methods=['GET', 'POST'])
def add_exam():
    users = mongo.db.users
    username = request.get_json()['username']
    newexam = request.get_json()['newexam']
    resultexam = ''
    print(newexam)

    users.update_one({'username': username}, {'$push': {'exams': newexam}})
    allexams = users.distinct("exams", {'username': username})


    access_token = create_access_token(identity={
        'examlist': allexams,
        'username': username
    })
    resultexam = jsonify({'token': access_token})
    return resultexam




@app.route('/users/deleteexamen', methods=['GET','POST'])
def deleteexam():
    users = mongo.db.users
    deleteexam = request.get_json()['deleteexam']
    username = request.get_json()['username']
    resultdeleteexam = ''
    print("delete exam")
    print(deleteexam)
    users.update_many({'username': username}, {'$pull':{'exams':deleteexam}})

    allexams= users.distinct("exam",{'username':username})



    access_token = create_access_token(identity={
        'deleteexamlist':allexams
    })
    resultdeleteexam = jsonify({'token':access_token})

    return resultdeleteexam





@app.route('/users/todo', methods=['GET','POST'])
def create_todolist():
    users = mongo.db.users
    username = request.get_json()['username']
    newtask = request.get_json()['newtodo']
    resulttodo = ''

    users.update_one({'username': username}, {'$push': {'tasks':newtask}})
    alltodos = users.distinct('tasks',{'username':username})
    access_token = create_access_token(identity={
        'todolist':alltodos,
        'username':username
    })
    resulttodo = jsonify({'token':access_token})
    return resulttodo




@app.route('/users/deletetodo', methods=['GET','POST'])
def deletetodo():
    users = mongo.db.users
    deletetodo = request.get_json()['deletetodo']
    username = request.get_json()['username']
    resultdeletetodos = ''
    print("delete todo")
    print(deletetodo)
    users.update_many({'username': username}, {'$pull':{'tasks':deletetodo}})

    alltodos= users.distinct("tasks",{'username':username})
    access_token = create_access_token(identity={
        'deletetodolist':alltodos
    })
    resultdeletetodos = jsonify({'token':access_token})

    return resultdeletetodos

