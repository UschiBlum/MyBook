import React, {Component} from 'react'
import {login, register} from './UserFunction'
import {Input, Form, FormGroup} from 'reactstrap'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './signup.css'
import jwt_decode from "jwt-decode";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

const validateForm = (errors) => {
    let valid = true
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    )
    return valid
}

const countErrors = (errors) => {
    let count = 0
    Object.values(errors).forEach(
        (val) => val.length > 0 && (count = count+1)
    )
    return count
}

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            studyprogram: '',
            password: '',
            confirmpassword: '',
            mai: '',
            ise:'',
            komedia:'',
            otherprogram:'',
            formValid: false,
            errorCount: null,
            result:'',
            existing: false,
            errors: {
                username: '',
                email: '',
                password:'',
                confirmpassword:''
            }
        }
        // this.onChange = this.onChange.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)

    }

    // componentDidMount () {
    //     const token = localStorage.usertoken
    //     const decoded = jwt_decode(token)
    //     this.setState({
    //         result: decoded.identity.result
    //     })
    // }

    // onChange(e) {
    //     this.setState({[e.target.name]: e.target.value})
    //     this.setState({studyprogram: e.target.value})
    // }

    handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        let errors = this.state.errors
        const testPw = errors.password.value

        switch (name) {
            case 'username':
                errors.username =
                    value.length < 3
                        ? 'Username must be 3 characters long!'
                        : ''
                break
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break
            case 'password':
                errors.password =
                    value.length < 4
                        ? 'Password must be 4 characters long!'
                        : ''
                break
            case 'confirmpassword':
                errors.confirmpassword =
                    value === this.state.password
                        ? ''
                        : 'Password not match!'
                break
            default:
                break
        }
        this.setState({errors, [name]: value})
        this.setState({[name]:value})
    }

    // onSubmit(e) {
    //     e.preventDefault()
    //
    //     this.setState({formValid: validateForm(this.state.errors)})
    //     this.setState({errorCount: countErrors(this.state.errors)})
    //
    //
    //     const newUser = {
    //         username: this.state.username,
    //         email: this.state.email,
    //         studyprogram: this.state.value,
    //         password: this.state.password,
    //         confirmpassword: this.state.confirmpassword
    //     }
    //
    //
    //     register(newUser)
    //         .then(res => {
    //             if(this.state.password === this.state.confirmpassword) {
    //                 if(this.state.existing === false) {
    //                     this.props.history.push('/login')
    //                 }else{
    //                     alert("Username has registered before!")
    //                     this.props.history.push('/signup')
    //                 }
    //
    //             }
    //         })
    //         .catch(err => {
    //             alert("Username has registered before!")
    //         })
    // }

    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({formValid: validateForm(this.state.errors)})
        this.setState({errorCount: countErrors(this.state.errors)})

        const existingUser = {
            username: this.state.username
        }

        login(existingUser)
            .then(res=> {
                if(!res.error) {
                    this.setState({exisiting: true})
                    alert("Username has registered before")
                }
            })
            .catch(err => {
                // alert("Username has registered before")
                console.log("not existing")

            })

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            studyprogram: this.state.value,
            password: this.state.password,
            confirmpassword: this.state.confirmpassword
        }

        register(newUser)
            .then(res => {
            if(this.state.password === this.state.confirmpassword) {
                this.props.history.push('/login')
            }else{
                alert("Username has registered before!")
                this.props.history.push('/register')
            }

        })
            .catch(err =>{
                console.log(err)
            })



    }

    render() {
        const {errors, formValid} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row first-row"></div>
                    </div>
                </div>
                <form noValidate onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-5 left header-row">
                            <h1 className="heading text-center display-1">Sign up!</h1>
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
                                       onChange={this.handleChange}
                                       noValidate
                                />
                                {errors.username.length > 0 && <span className="error">{errors.username}</span>}
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
                            <div className="form-group">
                                <label htmlFor="email" className="text-primary">Email Address</label>
                                <input type="email"
                                       className="form-control form-control-lg"
                                       name="email"
                                       placeholder="Enter Email"
                                       value={this.state.email}
                                       onChange={this.handleChange}
                                       noValidate
                                />
                                {errors.email.length > 0 && <span className="error">{errors.email}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                            <div className="form-group">
                                <label htmlFor="studyprogram" className="text-primary">Study program</label>
                                <select onChange={this.handleChange} className="form-control form-control-lg" value={this.state.studyprogram}>
                                    <option value="mai">Master Angewandte Informatik</option>
                                    <option value="ise">Master Computer Engineering</option>
                                    <option value="komedia">Master Angewandte Kognitions- und Medienwissenschaft</option>
                                    <option value="otherprogram">Other</option>
                                </select>

                                {/*<Form>*/}
                                {/*    <FormGroup>*/}
                                {/*        <label htmlFor="studyprogram">Study program</label>*/}
                                {/*        <Input type="select" name="studyprogram" >*/}
                                {/*            <option>Master Angewandte Informatik</option>*/}
                                {/*            <option>MasterComputer Engineering</option>*/}
                                {/*            <option>Master Angewandte Kognitions- und Medienwissenschaft</option>*/}
                                {/*        </Input>*/}

                                {/*    </FormGroup>*/}
                                {/*</Form>*/}
                                {/*<input type="select"*/}
                                {/*       className="form-control"*/}
                                {/*       name="studyprogram"*/}
                                {/*       placeholder="Study program"*/}
                                {/*       value={this.state.studyprogram}*/}
                                {/*       onChange={this.onChange}>*/}
                                {/*    <option>Master Angewandte Informatik</option>*/}
                                {/*    <option>MasterComputer Engineering</option>*/}
                                {/*    <option>Master Angewandte Kognitions- und Medienwissenschaft</option>*/}
                                {/*    <option><input type="text" className="form-control" placeholder="Other" /></option>*/}
                                {/*</input>*/}
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
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
                                       onChange={this.handleChange}
                                       noValidate
                                />
                                {errors.password.length > 0 && <span className="error">{errors.password}</span>}
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
                            <div className="form-group">
                                <label htmlFor="confirmpassword" className="text-primary">Confirm Password</label>
                                <input type="password"
                                       className="form-control form-control-lg"
                                       name="confirmpassword"
                                       placeholder="Repeat Password"
                                       value={this.state.confirmpassword}
                                       onChange={this.handleChange}
                                       noValidate
                                />
                                {errors.confirmpassword.length > 0 && <span className="error">{errors.confirmpassword}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
                            <div className="form-group submit">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                    {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : 'Form not submitted'}
                </form>
            </div>
        )
    }
}

export default Register