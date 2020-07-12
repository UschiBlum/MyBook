import React, {Component} from 'react'
import paper_plane from './paper_plane.png'
import {HuePicker} from 'react-color'
import {createLecture} from "./TimeTablFunction";
import './timttable.css'

class Timetable extends Component {
    constructor() {
        super()
        this.state = {
            lecture: '',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            color: '#fff',
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

        // createLecture(newLecture).then(res =>{
        //     this.props.history.push('/timetable')
        // })
    }


    render() {
        // function Weekday(props) {
        //     const isChecked = props.isChecked
        //
        //     if (isChecked) {
        //         return <TimeSet/>
        //     }
        // }
        //
        // function TimeSet(props) {
        //     const startTimeName = props.startTimeName
        //     const startTimeValue = props.startTimeValue
        //     const endTimeName = props.endTimeName
        //     const endTimeValue = props.endTimeValue
        //
        //     return(
        //         <div className="row">
        //             <div className="col-6 mb-auto">
        //                 <label htmlFor={startTimeName}>Start time:</label>
        //                 <input type="text" className="form-control"
        //                        name = {startTimeName}
        //                        value={startTimeValue}
        //                        placeholder="Starttime:"
        //                         />
        //             </div>
        //             <div className="col-6 mb-auto">
        //                 <label htmlFor={endTimeName}>Start time:</label>
        //                 <input type="text" className="form-control"
        //                        name = {endTimeName}
        //                        value={endTimeValue}
        //                        placeholder="Endtime"
        //                         />
        //             </div>
        //         </div>)
        // }



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
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimemonday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimemonday"
                                               value={this.state.endtimemonday}
                                               placeholder="14:00:"
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
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimetuesday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimetuesday"
                                               value={this.state.endtimetuesday}
                                               placeholder="14:00"
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
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimewednesday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimewednesday"
                                               value={this.state.endtimewednesday}
                                               placeholder="14:00"
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
                                        />
                                    </div>
                                    <div className="col-5 mb-auto">
                                        <label htmlFor="endtimethursday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimethursday"
                                               value={this.state.endtimethursday}
                                               placeholder="14:00"
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
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <label htmlFor="endtimefriday">Start time:</label>
                                        <input type="text" className="form-control"
                                               name = "endtimefriday"
                                               value={this.state.endtimefriday}
                                               placeholder="14:00"
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