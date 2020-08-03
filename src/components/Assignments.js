import React, {Component} from "react";
import jwt_decode from 'jwt-decode'
import {add_assignments, deleteAssignment} from "./UserFunction";
import './signup.css'
import paper_plane from "./paper_plane.png";


class Assignments extends Component {
    constructor() {
        super();
        this.state={
            username: '',
            newassignment: '',
            assignmentlist: [],
            deleteassignmentlist: [],
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
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
        }
        add_assignments(newAss).then(res => {
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })

    }

    onDelete = (val, e) => {
        e.preventDefault()
        var data = [...this.state.assignmentlist]
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
        const token = localStorage.deleteassignmenttoken
        const decode = jwt_decode(token)
        this.setState({assignmentlist: decode.identity.deleteassignmentlist})
    }



    renderAssignmentList(){
        return this.state.assignmentlist.map((assignments, index) =>{
            const {assignment} = assignments
            return(
                    <span className="item">
                        <p>
                            <span className="item-name">
                                {assignments}
                            </span>
                            <button onClick={this.onDelete.bind(this, assignments)} className={"Button delete"}>-</button>
                        </p>
                    </span>
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
                        <h1 className="heading text-center display-1">Assignments!</h1>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row ">
                        <div className="col-md-5">
                            {this.renderAssignmentList()}
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 ">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 lefttodo">
                            <div className="form-group">
                                <div><label htmlFor="newassignment" className="text-primary buttonlabel">Assignment</label> </div>
                                <input
                                    className="add-input"
                                    type="text"
                                    name="newassignment"
                                    placeholder="Enter Assignment"
                                    value={this.state.newassignment}
                                    onChange={this.handleChange}
                                    />
                                </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 leftlogin">
                            <button type={"submit"} className="Buttonsubmit">
                                <label className="buttonlabel"> Add </label>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 ">
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 leftexam">
                            <img src={paper_plane} alt="paper plane" width="50%" />
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}
export default Assignments




