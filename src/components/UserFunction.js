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
            console.log(err)
            alert("Username has registered before!")
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