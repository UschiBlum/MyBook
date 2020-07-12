import React, {Component} from 'react'
import paper_plane from './paper_plane.png'
import {HuePicker} from 'react-color'
import {createLecture} from "./TimeTablFunction";
import './timttable.css'
import nextId from "react-id-generator";


class Timetable extends Component {
    lecId = nextId()
    constructor() {
        super()
        this.state = {
            lecture: '',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            color: '#8ff',
            starttimemonday: '',
            endtimemonday:'',
            starttimetuesday: '',
            endtimetuesday:'',
            starttimewednesday: '',
            endtimewednesday:'',
            starttimethursday: '',
            endtimethursday:'',
            starttimefriday: '',
            endtimefriday:'',
            lectures: [
                // {id: lecId, lecName: {lecture}, startMo: {starttimemonday}, endMo:{endtimemonday}, startTu: {starttimetuesday}, endTu:{endtimetuesday}, startWe:{starttimewednesday}, endWe: {endtimewednesday}, startTh:{starttimethursday}, endTh:{endtimethursday}, startFr:{starttimefriday}, endFr:{endtimefriday}}
                {id:1, lecName:'test1', startMo: '12:00', endMo:'14:00', startTu: '', endTu:'', startWe:'', endWe: '', startTh:'', endTh:'', startFr:'', endFr:''},
                {id:2, lecName:'test2', startMo: '', endMo:'', startTu: '14:00', endTu:'16:00', startWe:'', endWe: '', startTh:'', endTh:'', startFr:'', endFr:''},
                {id:3, lecName:'test3', startMo: '10:00', endMo:'12:00', startTu: '', endTu:'', startWe:'', endWe: '', startTh:'16:00', endTh:'18:00', startFr:'', endFr:''},
                {id:4, lecName:'test4', startMo: '', endMo:'', startTu: '', endTu:'', startWe:'', endWe: '', startTh:'', endTh:'', startFr:'10:00', endFr:'12:00'}
                ]

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    handleChangeComplete = (color) =>{
        this.setState({color : color.hex})
    }

    onSubmit(e){
        e.preventDefault()

        const newLecture = {
            lecture: this.state.lecture,
            monday: this.state.monday,
            tuesday: this.state.tuesday,
            wednesday: this.state.wednesday,
            thursday: this.state.thursday,
            friday: this.state.friday,
            color: this.state.color,
            starttimemonday: this.state.starttimemonday,
            endtimemonday:this.state.endtimemonday,
            starttimetuesday: this.state.starttimetuesday,
            endtimetuesday:this.state.endtimetuesday,
            starttimewednesday: this.state.starttimewednesday,
            endtimewednesday: this.state.endtimewednesday,
            starttimethursday: this.state.starttimethursday,
            endtimethursday:this.state.endtimethursday,
            starttimefriday: this.state.starttimefriday,
            endtimefriday: this.state.endtimefriday,
        }

    }

    renderTableData(){
        return this.state.lectures.map((lectures, index) =>{
            const{id, lecName, startMo, endMo, startTu, endTu, startWe, endWe, startTh, endTh, startFr, endFr} = lectures
            var numStartMo = parseInt(startMo, 10)
            var numStartTu = parseInt(startTu, 10)
            var numStartWe = parseInt(startWe, 10)
            var numStartTh = parseInt(startTh, 10)
            var numStartFr = parseInt(startFr, 10)

            const times =[8,9,10,11,12,13,14,15,16,17,18,19,20]
            const timeList = times.forEach(number =>{
                if(startMo !== ''){
                    if(numStartMo===number){
                        return(
                            <tr key={id}>
                                <td>{startMo} - {endMo}</td>
                                <td>{lecName}</td>
                            </tr>
                        )
                    }

                }
                // if(numStartTu !== '' && numStartTu >= number && numStartTu < number+1){
                //     return(
                //         <tr key={id}>
                //             <td>{startTu} - {endTu}</td>
                //             <td></td>
                //             <td>{lecName}</td>
                //         </tr>
                //     )
                // }
                // if(numStartWe !== '' && numStartWe >= number && numStartWe < number+1){
                //     return(
                //         <tr key={id}>
                //             <td>{startWe} - {endWe}</td>
                //             <td></td>
                //             <td></td>
                //             <td>{lecName}</td>
                //         </tr>
                //     )
                // }
                // if(numStartTh !== '' && numStartTh >= number && numStartTh < number+1){
                //     return(
                //         <tr key={id}>
                //             <td>{startTh} - {endTh}</td>
                //             <td></td>
                //             <td></td>
                //             <td></td>
                //             <td>{lecName}</td>
                //         </tr>
                //     )
                // }
                // if(numStartFr !== '' && numStartFr >= number && numStartFr < number+1){
                //     return(
                //         <tr key={id}>
                //             <td>{startFr} - {endFr}</td>
                //             <td></td>
                //             <td></td>
                //             <td></td>
                //             <td></td>
                //             <td>{lecName}</td>
                //         </tr>
                //     )
                // }

            } )


        })
    }

    render() {


        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row first-row"></div>
                    </div>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-5 left header-row">
                            <h1 className="heading text-center display-1">MyBook Time table!</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                            <table id='lectures'>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableData()}
                                    {this.timesList}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
                            <div className="form-group">
                                <input type="text"
                                       className="form-control form-control-lg"
                                       name="lecture"
                                       placeholder="Lecture"
                                       value={this.state.lecture}
                                       onChange={this.onChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
                            <HuePicker color={this.state.color} onChangeComplete={this.handleChangeComplete}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                            <div className="form-group">
                                <img src={paper_plane} width="200" alt="Paper Plane" />
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-2"><h5>Monday:</h5></div>
                                    <div className="col-,d-5 mb-auto">
                                        <label htmlFor="starttimemonday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "starttimemonday"
                                               value={this.state.starttimemonday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimemonday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimemonday"
                                               value={this.state.endtimemonday}
                                               placeholder="14:00:"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2"> <h5>Tuesday:</h5></div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="starttimetuesday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "starttimetuesday"
                                               value={this.state.starttimetuesday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimetuesday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimetuesday"
                                               value={this.state.endtimetuesday}
                                               placeholder="14:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2"> <h5>Wednesday:</h5></div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="starttimewednesday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "starttimewednesday"
                                               value={this.state.starttimewednesday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimewednesday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimewednesday"
                                               value={this.state.endtimewednesday}
                                               placeholder="14:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2"><h5>Thursday:</h5></div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="starttimethursday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "starttimethursday"
                                               value={this.state.starttimethursday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-5 mb-auto">
                                        <label htmlFor="endtimethursday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimethursday"
                                               value={this.state.endtimethursday}
                                               placeholder="14:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2"> <h5>Friday:</h5></div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="starttimefriday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "starttimefriday"
                                               value={this.state.starttimefriday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimefriday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimefriday"
                                               value={this.state.endtimefriday}
                                               placeholder="14:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-lg btn-dark btn-primary btn-block center-block">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Timetable