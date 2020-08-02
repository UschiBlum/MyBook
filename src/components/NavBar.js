import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './navbar.css'
import logo from './Logopit.png';

class Navbar extends Component {
    logOut (e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    render () {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item nav-pos">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link logo-pos">
                        <button type="button" className="btn btn-outline-primary btn-lg signup">
                            <label className="signup-text">
                                Sign up
                            </label>
                        </button>
                    </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item nav-pos">
                    <Link to="/profile" className="nav-link">
                        Overview
                    </Link>
                </li>
                <li className="nav-item nav-pos">
                    <Link to="/assignments" className="nav-link">
                        Assignments
                    </Link>
                </li>
                {/*<li className="nav-item">*/}
                {/*    <Link to="/calender" className="nav-link">*/}
                {/*        Calender*/}
                {/*    </Link>*/}
                {/*</li>*/}
                <li className="nav-item nav-pos">
                    <Link to="/examen" className="nav-link">
                        Exam Planner
                    </Link>
                </li>
                <li className="nav-item nav-pos">
                    <Link to="/notes" className="nav-link">
                        Notes
                    </Link>
                </li>
                <li className="nav-item nav-pos">
                    <Link to="/timetable" className="nav-link">
                        Time Table
                    </Link>
                </li>
                <li className="nav-item logo-pos">
                    <a href="#" onClick={this.logOut.bind(this)} className="nav-link">
                        <button type="button" className="btn btn-outline-primary btn-lg">
                           <label className="signup-text">Logout</label>
                        </button>
                    </a>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg  rounded text-primary text-center navbar-design ">
                <div className="container-fluid">
                    <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbar1"
                            aria-controls="navbar1"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="logo-pos">
                        <img src={logo} width="100" height="100" />

                    </div>
                    <h1 className="headline display-3">MyBook</h1>
                    <div className="collapse navbar-collapse justify-content-end"
                         id="navbar1">
                        <ul className="navbar-nav">
                            <li className="nav-item nav-pos">
                                <Link to="/" className="nav-link">
                                    Welcome
                                </Link>
                            </li>
                            {localStorage.usertoken ? userLink : loginRegLink}
                        </ul>

                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)