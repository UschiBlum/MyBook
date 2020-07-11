import React, {Component} from 'react'
import {login} from "./UserFunction"
import logo from './Logopit.png';
import './signup.css'


class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        login(user)
            .then(res => {
                if (!res.error) {
                    this.props.history.push('/profile')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
 
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row first-row"></div>
                    </div>
                </div>

                <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-5 left header-row">
                            <h1 className="heading display-1 text-center">Login!</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                            <div className="form-group">
                                <label htmlFor="username" className="text-primary">Username</label>
                                <input type="text"
                                       className="form-control form-control-lg"
                                       name="username"
                                       placeholder="Enter Username"
                                       value={this.state.username}
                                       onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
                            <img src={logo} width="300" height="300" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                            <div className="form-group">
                                <label htmlFor="password" className="text-primary">Password</label>
                                <input type="password"
                                       className="form-control form-control-lg"
                                       name="password"
                                       placeholder="Enter Password"
                                       value={this.state.password}
                                       onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Login
                            </button>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login