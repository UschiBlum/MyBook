import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import logo from "./Logopit.png";
import List from "./List";
import Timetable from "./Timetable";
import paper_plane from "./paper_plane.png";
import {create_todos} from './UserFunction'

var colors = ['#58D3F7', '#F781F3', '#8000FF', '#A9F5D0', '#F5BCA9'];

    var min = 0;
    var max = 4;


  const notestyle = {
    color: "white",
    width: "200px",
    backgroundColor: colors[Math.floor(Math.random() * (max - min)) + min],
    alignItems: 'center',
    padding: "50px",
    justifyContent: 'center',
    fontFamily: 'Arial',
    margin: "2em",
    marginLeft:"-10em"
  };

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            studyprogram: '',
            email: '',
            notes: [],
            favoriteNote: '',
            todolist: [],
            newtodo: ''

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const token2 = localStorage.todotoken
        const decoded2 = jwt_decode(token2)
        this.setState({
            username: decoded.identity.username,
            studyprogram: decoded.identity.studyprogram,
            email: decoded.identity.email,
            notes: decoded.identity.notes,
            favoriteNote: decoded.identity.favoriteNote,
            todolist: decoded2.identity.todolist
        })
    }

    handleChange(e){
        this.setState({newtodo: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        const newTodo = {
            newtodo: this.state.newtodo,
            username: this.state.username
        }
        create_todos(newTodo).then(res => {
            window.location.reload()
        })
            .catch(err => {
                console.log(err)
            })
    }

    renderTodoList(){
        return this.state.todolist.map((todo, ) => {
            const {tasks} = todo
            return (
                <div>
                    <span className="item">
                        <p className="item-block">
                            <span className="item-name">
                                {todo}
                            </span>
                        </p>
                    </span>
                </div>
            )
        })
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row first-row"></div>
                    </div>
                </div>
                <div className="row header-row">
                    <div className="col-md-5">
                        <h1 className="heading text-center display-1">{this.state.username}'s Homepage</h1>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5"></div>

                </div>
                <div className="row second-row">
                    <div className="col-md-5 ">
                        <form onSubmit={this.handleSubmit} className="input">
                            <input
                                className="add-input"
                                type = "text"
                                value = {this.state.newtodo}
                                onChange={this.handleChange}
                                required="required"
                            >
                            </input>
                            <button type={"submit"} className={"Button"}>
                                Submit
                            </button>
                        </form>
                        <div>
                            {this.renderTodoList()}
                        </div>
                    </div>
                    <div className="col-md-2" ></div>
                    <div className="col-md-5 ">
                        <table id='lectures'>
                            <thead>
                            <tr>
                                <th>Lecture</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr style={{backgroundColor: '#8ff'}}>
                                <td>AWT</td>
                                <td>12:00 - 13:00</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr style={{backgroundColor: '#8ff'}}>
                                <td>AWT</td>
                                <td>13:00 - 14:00</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr style={{backgroundColor: '#8ff'}}>
                                <td>AWT</td>
                                <td>-</td>
                                <td>-</td>
                                <td>14:00 - 15:00</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr style={{backgroundColor: '#8ff'}}>
                                <td>AWT</td>
                                <td>-</td>
                                <td>-</td>
                                <td>15:00 - 16:00</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 left papper">
                    </div>
                    <div className="col-md-2">
                    <h2 style = {notestyle}>{this.state.favoriteNote}</h2>
                    </div>
                    <div className="col-md-5">
                        <img src={paper_plane} width="200" alt="Paper Plane" />

                    </div>
                </div>
                </div>
        )
    }
}

export default Profile