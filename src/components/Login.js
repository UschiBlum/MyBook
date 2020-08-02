import React, {Component} from 'react'
import {login} from "./UserFunction"
import logo from './Logopit.png';
import './signup.css'
// import './Examen.css'


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
                alert("Login failed!")
            })
    }
 
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row first-row"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 left header-row pos-cent">
                        <h1 className="heading display-1 text-center">Login!</h1>
                    </div>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-5 leftlogin">
                            <div className="form-group">
                                <div><label htmlFor="username" className="text-primary buttonlabel">Username</label></div>
                                <input type="text"
                                       className=" add-input"
                                       name="username"
                                       placeholder="Enter Username"
                                       value={this.state.username}
                                       onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
                            <img src={logo} className="responsive float-left" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                            <div className="form-group">
                                <div><label htmlFor="password" className="text-primary buttonlabel">Password</label></div>
                                <input type="password"
                                       className="add-input"
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
                        <div className="col-md-5 leftlogin">
                            <button type="submit" className="Buttonsubmit">
                                <label className="buttonlabel">Login</label>
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