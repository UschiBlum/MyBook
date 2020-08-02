import React, {Component} from "react";
import jwt_decode from 'jwt-decode'
import {add_exam} from "./UserFunction";

class Examen extends Component {
    constructor() {
        super();
        this.state={
            username: '',
            newexam: '',
            submission: '',
            isCompleted: false,
            examlist: [],
            //deleteassignmentlist: [],
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
       // onDelete = (val, e) => {
    //     e.preventDefault()
    //     var data = [...this.state.list]
    //     data.filter((exam, index) =>{
    //         if (exam === val){
    //             data.splice(index, 1)
    //             const deleteExamItem ={
    //                 deleteexam: exam,
    //                 username: this.state.username
    //             }
    //             deleteExam(deleteExamItem).then(res => {
    //                 console.log(res)
    //             }).catch(err => {
    //                 console.log(err)
    //             })
    //         }
    //         return true
    //     })
    //     this.setState({alist: [...data]})
    // }

    renderExamList(){
        return this.state.examlist.map((Exam, index) =>{
            const {exam, submission} = exam
            return(
                <div key={index}>
                    <span className="item">
                        <p className="item-block">
                            <span className="item-name">
                                {exam} Lastdate: {submission}
                            </span>
                            <button className={"Button complete"}>&#10004;</button>
                            <button className={"Button delete"}>-</button>
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
                <div className="row header-row">
                    <div className="col-md-5">
                        <h1 className="heading text-center display-1">{this.state.username}'s Exams</h1>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5"></div>
                </div>
                <div className="row second-row">
                    <div className="col-md-5">
                        {this.renderExamList()}
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5">
                        <form onSubmit={this.handleSubmit} className="input">
                            <div>
                                <input
                                    className="add-input"
                                    type="text"
                                    name="newexam"
                                    value={this.state.newexam}
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
export default Examen



