import React, {Component} from 'react'
import {login} from "./UserFunction"
import logo from './logo.jpg';
// import {ReactComponent as Logo} from 'ressources/journal-png-transparent-4-original.png';


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

        login(user).then(res => {
            if (!res.error) {
                this.props.history.push('/profile')
            }
        })
    }
 
    render() {
        return (
            <div className="container">
                <div className="col-md-6 left">
                    <h1 className="h3 mb-3 font-weight-normal">Login!</h1>
                    
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                   className="form-control"
                                   name="username"
                                   placeholder="Enter Username"
                                   value={this.state.username}
                                   onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   className="form-control"
                                   name="password"
                                   placeholder="Enter Password"
                                   value={this.state.password}
                                   onChange={this.onChange} />
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Login
                        </button>
                    </form>
                </div>

                <div className="col-md-6 right">
                    <div className="logo">
                        <img src={logo} width="500" height="500" />
                    </div>
                </div>
            </div>
        )
    }

}

export default Login