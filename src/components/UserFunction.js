import axios from 'axios'

export const register = newUser => {
    return axios
        .post("users/register", {
            username: newUser.username,
            email: newUser.email,
            studyprogram: newUser.studyprogram,
            password: newUser.password,
            confirmpassword: newUser.confirmpassword
        })
        .then(response =>{
            console.log("Registered")
        })
        .catch(err => {
            console.log(err + "not registered")
        })
}

export const login = user => {
    return axios
        .post("users/login", {
            username: user.username,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}

export const get_data = newData =>{
    return axios
        .post('users/profile', {
            username: newData.username,
            timetable: newData.timetable,
            favoriteNote: newData.favoriteNote,
            todolist: newData.todolist
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}

export const add_note = newNote => {
    return axios
        .post("users/note", {
            newnote: newNote.newnote,
            favorite : newNote.favorite,
            username: newNote.username,
            favoriteNote: newNote.favoriteNote
        })
        .then(response =>{
            console.log("New Note")
            localStorage.setItem('notetoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}

export const createLecture = newLecture => {
    return axios
        .post("users/timetable", {
            newlecture: newLecture.newlecture,
            color: newLecture.color,
            starttimemonday: newLecture.starttimemonday,
            endtimemonday: newLecture.endtimemonday,
            starttimetuesday: newLecture.starttimetuesday,
            endtimetuesday: newLecture.endtimetuesday,
            starttimewednesday: newLecture.starttimewednesday,
            endtimewednesday: newLecture.endtimewednesday,
            starttimethursday: newLecture.starttimethursday,
            endtimethursday: newLecture.endtimethursday,
            starttimefriday: newLecture.starttimefriday,
            endtimefriday: newLecture.endtimefriday,
            username: newLecture.username
        })
        .then(response =>{
            console.log("New Lecture")
            localStorage.setItem('lecturetoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}

export const add_assignments = newAss => {
    return axios
        .post("users/assignments",{
            newassignment: newAss.newassignment,
            submission: newAss.submission,
            isCompleted: newAss.isCompleted,
            username: newAss.username,
            
        })
        .then(response =>{
            console.log("added assignments")
            localStorage.setItem('assignmenttoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}


export const create_todos = newTodo => {
    return axios
        .post('users/todo', {
            newtodo: newTodo.newtodo,
            username: newTodo.username
        })
        .then(respone => {
            console.log("new todo")
            localStorage.setItem('todotoken', respone.data.token)
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteTodo = deleteTodoItem => {
    return axios
        .post('users/deletetodo', {
            deletetodo: deleteTodoItem.deletetodo,
            username: deleteTodoItem.username
            }
        )
        .then(response => {
            console.log(response)
            localStorage.setItem('deletetodotoken', response.data.token)
        })
        .catch(err =>{
            console.log(err)
        })
}
