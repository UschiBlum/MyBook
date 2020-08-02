import React, {Component} from "react";
import jwt_decode from 'jwt-decode'
import {add_assignments} from "./UserFunction";

class Assignments extends Component {
    constructor() {
        super();
        this.state={
            username: '',
            newassignment: '',
            submission: '',
            isCompleted: false,
            assignmentlist: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const token = localStorage.assignmenttoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.identity.username,
            assignmentlist: decoded.identity.assignmentlist
        })
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        const newAss = {
            username: this.state.username,
            newassignment: this.state.newassignment,
            submission: this.state.submission,
            isCompleted: this.state.isCompleted
        }
        add_assignments(newAss).then(res => {
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })

    }

    renderAssignmentList(){
        return this.state.assignmentlist.map((assignments, index) =>{
            const {assignment, submission} = assignments
            return(
                <div key={index}>
                    <span className="item">
                        <p className="item-block">
                            <span className="item-name">
                                {assignment} submission date: {submission}
                            </span>
                            <button className={"Button delete"}>-</button>
                        </p>
                    </span>
                </div>
            )
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
                <div className="row header-row">
                    <div className="col-md-5">
                        <h1 className="heading text-center display-1">Assignments</h1>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5"></div>
                </div>
                <div className="row second-row">
                    <div className="col-md-5">
                        {this.renderAssignmentList()}
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5">
                        <form onSubmit={this.handleSubmit} className="input">
                            <div>
                                <input
                                    className="add-input"
                                    type="text"
                                    name="newassignment"
                                    value={this.state.newassignment}
                                    onChange={this.handleChange}
                                    required="required"
                                />
                            </div>
                            <div>
                                <input
                                    className="add-input"
                                    type="text"
                                    name="submission"
                                    value={this.state.submission}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <button type={"submit"} className={"Button"}>
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}
export default Assignments
