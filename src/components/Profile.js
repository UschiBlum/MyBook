import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import List from './List'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            studyprogram: '',
            email: ''
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.identity.username,
            studyprogram: decoded.identity.studyprogram,
            email: decoded.identity.email
        })
    }

    render () {
        return (
            <div className="container">
                <div className="mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">{this.state.username}'s Homepage</h1>
                        <List />
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile