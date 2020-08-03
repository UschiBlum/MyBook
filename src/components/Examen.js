import React, {Component} from "react";
import jwt_decode from 'jwt-decode'
import {add_exam, deleteExam} from "./UserFunction";
import './signup.css'
import paper_plane from "./paper_plane.png";

class Examen extends Component {
    constructor() {
        super();
        this.state={
            username: '',
            newexam: '',
            submission: '',
            isCompleted: false,
            examlist: [],
            deleteExamlist: [],
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        const token = localStorage.examtoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.identity.username,
            examlist: decoded.identity.examlist
        })
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        const newexam = {
            username: this.state.username,
            newexam: this.state.newexam,
            submission: this.state.submission,
            isCompleted: this.state.isCompleted
        }
        add_exam(newexam).then(res => {
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })

    }



       onDelete = (val, e) => {
        e.preventDefault()
        var data = [...this.state.examlist]
        data.filter((exam, index) =>{
            if (exam === val){
                data.splice(index, 1)
                const deleteExamItem ={
                    deleteexam: exam,
                    username: this.state.username
                }
                deleteExam(deleteExamItem).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
            return true
        })
        this.setState({alist: [...data]})
    }
    



    renderExamList(){
        return this.state.examlist.map((exams, index) =>{
            const {exam, submission} = exams
            return(
                <span className="item" key={index}>
                        <p>
                            <span className="item-name">
                                {exam} Lastdate: {submission}
                            </span>
                            <button className={"Button complete"}>&#10004;</button>
                            <button className={"Button delete"}>-</button>
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
    //         examlist: decoded.identity.examlist
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
                        <h1 className="heading text-center display-1">Exam Planner!</h1>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row ">
                        <div className="col-md-5">
                        {this.renderExamList()}
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 pos-cent">
                            <h1 className="heading text-center display-3"> Add Exams</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 lefttodo">
                            <div className="form-group">
                                <div><label htmlFor="newexam" className="text-primary buttonlabel">Exam</label> </div>
                                    <input
                                        className="add-input"
                                        type="text"
                                        name="newexam"
                                        placeholder="Enter Exam"
                                        value={this.state.newexam}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                            <div className="row">
                                <div className="col-md-5"></div>
                                <div className="col-md-2"></div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <div><label htmlFor="submission" className="text-primary buttonlabel">Submission date</label> </div>
                                        <input
                                            className="add-input"
                                            type="text"
                                            name="submission"
                                            placeholder="DD/MM/YY"
                                            value={this.state.submission}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 lefttodo">
                                    <img src={paper_plane} alt="paper plane" width="50%" />
                                </div>
                                <div className="col-md-2"></div>
                                <div className="col-md-5 leftlogin">
                                <button type={"submit"} className="Buttonsubmit">
                                <label className="buttonlabel"> Add </label>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}
export default Examen



