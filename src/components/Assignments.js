import React, {Component} from 'react'
import './Assignments.css'
//import {Link, RichText, Date} from 'prismic-reactjs';
import { Form } from 'semantic-ui-react'
import {add_assignments} from "./UserFunction";
import jwt_decode from 'jwt-decode'
import logo from "./Logopit.png";
import List from "./List";
import paper_plane from "./paper_plane.png";
import {create_todos, get_data, deleteTodo, deleteAssignment} from './UserFunction'


class Assignments extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            alist: [],
            newassignment: '',
            deleteassignmentlist: [],
            submission: '',
            isCompleted: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.identity.username,
            alist: decoded.identity.assignmentlist,
        })
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        const newAss = {
            newassignment: this.state.newassignment,
            username: this.state.username,
            submission: this.state.submission,
            isCompleted: this.state.isCompleted
        }
        add_assignments(newAss).then(res => {
            window.location.reload()
        })
            .catch(err => {
                console.log(err)
            })
    }

    onDelete = (val, e) => {
        e.preventDefault()
        var data = [...this.state.list]
        data.filter((assignment, index) =>{
            if (assignment === val){
                data.splice(index, 1)
                const deleteAssignmentItem ={
                    deleteassignment: assignment,
                    username: this.state.username
                }
                deleteAssignment(deleteAssignmentItem).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
            return true
        })
        this.setState({alist: [...data]})
    }

    renderAssignmentList(){
        return this.state.alist.map((assignments, index ) => {
            const {assignment, submission} = assignments
            return (
                <div key={index}>
                    <span className="item">
                        <p className="item-block">
                            <span className="item-name">
                                {assignment} on {submission}
                            </span>
                            <button onClick={this.onDelete.bind(this, assignments)} className={"Button delete"}>-</button>
                        </p>
                    </span>
                </div>
            )

        })
    }

    // onSubmit(e) {
    //     e.preventDefault()
    //     const token = localStorage.usertoken
    //     const decoded = jwt_decode(token)
    //     const newData = {
    //         username: this.state.username,
    //
    //         assignmentlist: decoded.identity.assignmentlist
    //     }
    //     get_data(newData).then(res => {
    //         window.location.reload()
    //     }).catch(err =>{
    //         console.log(err)
    //     });
    //
    // }


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
                        <h1 className="heading text-center display-1">{this.state.username}'s Assignments</h1>
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
                                value = {this.state.newassignment}
                                onChange={this.handleChange}
                                required="required"
                                name="newassignment"
                            >
                            </input>
                            <input
                                className="add-input"
                                type="date"
                                name="submission"
                                value={this.state.submission}
                                onChange={this.handleChange}
                            />
                            <button type={"submit"} className={"Button"}>
                                Submit
                            </button>
                        </form>
                        <div>
                            {this.renderAssignmentList()}
                        </div>
                    </div>
                    <div className="col-md-2" ></div>
                    <div className="col-md-5 ">

                        {/* </thead>
                                <tbody>
                                {this.renderTableData()}
                                </tbody>
                            </table> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 left papper">
                    </div>
                    <div className="col-md-2">
                        {/* <h2 style = {notestyle}>{this.state.favoriteNote}</h2> */}
                    </div>
                    <div className="col-md-5">
                        <img src={paper_plane} width="200" alt="Paper Plane" />

                    </div>
                    <button type="submit" className="btn btn-lg btn-primary" onClick = {this.onSubmit} >
                        Refresh
                    </button>
                </div>
            </div>
        )
    }
}

export default Assignments



