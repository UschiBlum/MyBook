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
           const token = localStorage.deleteexamtoken
           const decode = jwt_decode(token)
        this.setState({examlist: decode.identity.deleteexamlist})
    }
    



    renderExamList(){
        return this.state.examlist.map((exams, index) =>{
            const {exam} = exams
            return(
                <span className="item" key={index}>
                        <p>
                            <span className="item-name">
                                {exams}
                            </span>
                            <button onClick={this.onDelete.bind(this, exams)} className={"Button delete"}>-</button>
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
                    <div className="col-md-5 "></div>
                    </div>
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 ">
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
export default Examen



