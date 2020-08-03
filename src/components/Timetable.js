import React, {Component} from 'react'
import paper_plane from './paper_plane.png'
import {HuePicker} from 'react-color'
import {createLecture} from "./UserFunction";
import './timttable.css'
// import nextId from "react-id-generator";
import jwt_decode from 'jwt-decode'

/**
 * @todo update table always when you refresh the page
 * @todo fix design
 */

class Timetable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newlecture: '',
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
            username: '',
            lectureList: []


        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChangeComplete = this.handleChangeComplete.bind(this)
    }

    componentDidMount() {
        const token = localStorage.lecturetoken
        const decoded = jwt_decode(token)
        this.setState({
            lectureList: decoded.identity.lectures,
            username: decoded.identity.username
        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    handleChangeComplete = (color) =>{
        this.setState({color : color.hex})
    }

    // addLecture = (lecture) =>{
    //     const {lectureList} = this.state
    //     lecture.id = this.lecId
    //     let updateList = [...lectureList, lecture]
    //     this.setState({
    //         lectureList: updateList
    //     })
    // }

    onSubmit(e){
        e.preventDefault()
        // this.setState({
        //     newlecture: this.state.lecture,
        //     color: this.state.color,
        //     starttimemonday: this.state.starttimemonday,
        //     endtimemonday:this.state.endtimemonday,
        //     starttimetuesday: this.state.starttimetuesday,
        //     endtimetuesday:this.state.endtimetuesday,
        //     starttimewednesday: this.state.starttimewednesday,
        //     endtimewednesday: this.state.endtimewednesday,
        //     starttimethursday: this.state.starttimethursday,
        //     endtimethursday:this.state.endtimethursday,
        //     starttimefriday: this.state.starttimefriday,
        //     endtimefriday: this.state.endtimefriday,
        //     username: this.state.username
        // })

        const newLecture = {
            newlecture: this.state.newlecture,
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
            username: this.state.username
        }

        createLecture(newLecture).then(res => {
            window.location.reload()
        }).catch(err =>{
            console.log(err)
        })

    }

    renderTableData(){
        return this.state.lectureList.map((lectures, index) => {
            const {lecture, color, startMo, endMo, startTu, endTu, startWe, endWe, startTh, endTh, startFr, endFr} = lectures


            return(
                <tr key={lecture} style={{backgroundColor: this.state.color}}>
                    <td>{lecture}</td>
                    <td>{startMo} - {endMo}</td>
                    <td>{startTu} - {endTu}</td>
                    <td>{startWe} - {endWe}</td>
                    <td>{startTh} - {endTh}</td>
                    <td>{startFr} - {endFr}</td>
                </tr>

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
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-5 left header-row pos-cent">
                            <h1 className="heading text-center display-1">Time table!</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 table">
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
                                {this.renderTableData()}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right lefttodo">
                            <div className="form-group">
                                <input type="text"
                                       className="add-input"
                                       name="newlecture"
                                       placeholder="Lecture"
                                       value={this.state.newlecture}
                                       onChange={this.onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left">
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right picker">
                            <HuePicker color={this.state.color} onChangeComplete={this.handleChangeComplete}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left ">
                            <img src={paper_plane} className="responsive" alt="Paper Plane" />
                                                    </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 right picker">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-2"><h5>Monday:</h5></div>
                                    <div className="col-md-5 mb-auto">
                                        <div><label htmlFor="starttimemonday">Start time:</label></div>
                                        <input type="text" className=" add-inputtimes"
                                               name = "starttimemonday"
                                               value={this.state.starttimemonday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <div><label htmlFor="endtimemonday">End time:</label></div>
                                        <input type="text" className=" add-inputtimes"
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
                                        <div><label htmlFor="starttimetuesday">Start time:</label></div>
                                        <input type="text" className="add-inputtimes"
                                               name = "starttimetuesday"
                                               value={this.state.starttimetuesday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <div><label htmlFor="endtimetuesday">End time:</label></div>
                                        <input type="text" className="add-inputtimes"
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
                                        <div><label htmlFor="starttimewednesday">Start time:</label></div>
                                        <input type="text" className="add-inputtimes"
                                               name = "starttimewednesday"
                                               value={this.state.starttimewednesday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <div><label htmlFor="endtimewednesday">End time:</label></div>
                                        <input type="text" className="add-inputtimes"
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
                                        <div><label htmlFor="starttimethursday">End time:</label></div>
                                        <input type="text" className="add-inputtimes"
                                               name = "starttimethursday"
                                               value={this.state.starttimethursday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-5 mb-auto">
                                        <div><label htmlFor="endtimethursday">End time:</label></div>
                                        <input type="text" className="add-inputtimes"
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
                                        <div><label htmlFor="starttimefriday">Start time:</label></div>
                                        <input type="text" className="add-inputtimes"
                                               name = "starttimefriday"
                                               value={this.state.starttimefriday}
                                               placeholder="12:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-auto">
                                        <div><label htmlFor="endtimefriday">End time:</label></div>
                                        <input type="text" className="add-inputtimes"
                                               name = "endtimefriday"
                                               value={this.state.endtimefriday}
                                               placeholder="14:00"
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row ">
                                    <button type="submit" className="Buttonsubmit">
                                        <label className="buttonlabel">Submit</label>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Timetable
// import React, {Component} from 'react'
// import paper_plane from './paper_plane.png'
// import {HuePicker} from 'react-color'
// import {createLecture} from "./TimeTablFunction";
// import './timttable.css'
// import nextId from "react-id-generator";
//
//
// const lectureList =[]
//
// class Timetable extends Component {
//     lecId = nextId()
//     constructor() {
//         super()
//         this.state = {
//             lecture: '',
//             monday: false,
//             tuesday: false,
//             wednesday: false,
//             thursday: false,
//             friday: false,
//             color: '#8ff',
//             starttimemonday: '',
//             endtimemonday:'',
//             starttimetuesday: '',
//             endtimetuesday:'',
//             starttimewednesday: '',
//             endtimewednesday:'',
//             starttimethursday: '',
//             endtimethursday:'',
//             starttimefriday: '',
//             endtimefriday:'',
//             lectureList: lectureList,
//             lectures: [
//                 // {id: lecId, lecName: this.state.lecture, startMo: this.state.starttimemonday, endMo:this.state.endtimemonday, startTu: this.state.starttimetuesday, endTu:this.state.endtimetuesday, startWe:this.state.starttimewednesday, endWe: this.state.endtimewednesday, startTh:this.state.starttimethursday, endTh:this.state.endtimethursday, startFr:this.state.starttimefriday, endFr:this.state.endtimefriday, color:this.state.color},
//                 {id:1, lecName:'test1', startMo: '12:00', endMo:'14:00', startTu: '', endTu:'', startWe:'', endWe: '', startTh:'', endTh:'', startFr:'', endFr:'',},
//                 {id:2, lecName:'test2', startMo: '', endMo:'', startTu: '14:00', endTu:'16:00', startWe:'', endWe: '', startTh:'', endTh:'', startFr:'', endFr:''},
//                 {id:3, lecName:'test3', startMo: '10:00', endMo:'12:00', startTu: '', endTu:'', startWe:'', endWe: '', startTh:'16:00', endTh:'18:00', startFr:'', endFr:''},
//                 {id:4, lecName:'test4', startMo: '', endMo:'', startTu: '', endTu:'', startWe:'', endWe: '', startTh:'', endTh:'', startFr:'10:00', endFr:'12:00'}
//                 ]
//
//         }
//         this.onChange = this.onChange.bind(this)
//         this.onSubmit = this.onSubmit.bind(this)
//         this.addItem = this.addItem.bind(this)
//         this.compleateItem = this. compleateItem.bind(this)
//     }
//
//     addItem = (item) => {
//         const {lectureList} = this.state
//         item.id = this.lecId
//         item.compleateItem = false
//         let updateList = [...lectureList, item]
//         this.setState({
//             lectureList: updateList
//         })
//
//     }
//
//     compleateItem = (item) =>{
//         const {items} = this.state;
//
//         item.isCompleted
//             ? item.isCompleted = false
//             : item.isCompleted = true
//
//         this.setState({
//             items
//         });
//
//     }
//
//     onChange(e) {
//         this.setState({[e.target.name]: e.target.value})
//     }
//     handleChangeComplete = (color) =>{
//         this.setState({color : color.hex})
//     }
//
//     addLecture = (lecture) =>{
//         const {lectureList} = this.state
//         lecture.id = this.lecId
//         let updateList = [...lectureList, lecture]
//         this.setState({
//             lectureList: updateList
//         })
//     }
//
//     onSubmit(e){
//         e.preventDefault()
//         this.addItem(this.state)
//         this.setState({
//             lecture: this.state.lecture,
//             color: this.state.color,
//             starttimemonday: this.state.starttimemonday,
//             endtimemonday:this.state.endtimemonday,
//             starttimetuesday: this.state.starttimetuesday,
//             endtimetuesday:this.state.endtimetuesday,
//             starttimewednesday: this.state.starttimewednesday,
//             endtimewednesday: this.state.endtimewednesday,
//             starttimethursday: this.state.starttimethursday,
//             endtimethursday:this.state.endtimethursday,
//             starttimefriday: this.state.starttimefriday,
//             endtimefriday: this.state.endtimefriday,
//         })
//
//         const newLecture = {
//             lecture: this.state.lecture,
//             color: this.state.color,
//             starttimemonday: this.state.starttimemonday,
//             endtimemonday:this.state.endtimemonday,
//             starttimetuesday: this.state.starttimetuesday,
//             endtimetuesday:this.state.endtimetuesday,
//             starttimewednesday: this.state.starttimewednesday,
//             endtimewednesday: this.state.endtimewednesday,
//             starttimethursday: this.state.starttimethursday,
//             endtimethursday:this.state.endtimethursday,
//             starttimefriday: this.state.starttimefriday,
//             endtimefriday: this.state.endtimefriday,
//         }
//
//     }
//
//     renderTableData(){
//         return this.state.lectures.map((lectures, index) => {
//             const {id, lecName, startMo, endMo, startTu, endTu, startWe, endWe, startTh, endTh, startFr, endFr, color} = lectures
//             var numStartMo = parseInt(startMo, 10)
//             var numStartTu = parseInt(startTu, 10)
//             var numStartWe = parseInt(startWe, 10)
//             var numStartTh = parseInt(startTh, 10)
//             var numStartFr = parseInt(startFr, 10)
//
//             return(
//                 <tr key={id} style={{backgroundColor: this.state.color}}>
//                     <td>{lecName}</td>
//                     <td>{startMo} - {endMo}</td>
//                     <td>{startTu} - {endTu}</td>
//                     <td>{startWe} - {endWe}</td>
//                     <td>{startTh} - {endTh}</td>
//                     <td>{startFr} - {endFr}</td>
//                 </tr>
//             )
//         })
//     }
//
//     render() {
//
//
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="row first-row"></div>
//                     </div>
//                 </div>
//                 <form noValidate onSubmit={this.onSubmit}>
//                     <div className="row">
//                         <div className="col-md-5 left header-row">
//                             <h1 className="heading text-center display-1">MyBook Time table!</h1>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-5 table">
//                             <table id='lectures'>
//                                 <thead>
//                                     <tr>
//                                         <th>Lecture</th>
//                                         <th>Monday</th>
//                                         <th>Tuesday</th>
//                                         <th>Wednesday</th>
//                                         <th>Thursday</th>
//                                         <th>Friday</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {this.renderTableData()}
//                                 </tbody>
//                             </table>
//                         </div>
//                         <div className="col-md-2"></div>
//                         <div className="col-md-5 right papper">
//                             <div className="form-group">
//                                 <input type="text"
//                                        className="form-control form-control-lg"
//                                        name="lecture"
//                                        placeholder="Lecture"
//                                        value={this.state.lecture}
//                                        onChange={this.onChange}/>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-5 left">
//                         </div>
//                         <div className="col-md-2"></div>
//                         <div className="col-md-5 right picker">
//                             <HuePicker color={this.state.color} onChangeComplete={this.handleChangeComplete}/>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-5 left papper">
//                             <img src={paper_plane} width="200" alt="Paper Plane" />
//                         </div>
//                         <div className="col-md-2"></div>
//                         <div className="col-md-5 right picker">
//                             <div className="form-group">
//                                 <div className="row">
//                                     <div className="col-md-2"><h5>Monday:</h5></div>
//                                     <div className="col-md-5 mb-auto">
//                                         <label htmlFor="starttimemonday">Start time:</label>
//                                         <input type="text" className="form-control"
//                                                name = "starttimemonday"
//                                                value={this.state.starttimemonday}
//                                                placeholder="12:00"
//                                                onChange={this.onChange}
//                                         />
//                                     </div>
//                                     <div className="col-md-5 mb-auto">
//                                         <label htmlFor="endtimemonday">End time:</label>
//                                         <input type="text" className="form-control"
//                                                name = "endtimemonday"
//                                                value={this.state.endtimemonday}
//                                                placeholder="14:00:"
//                                                onChange={this.onChange}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-2"> <h5>Tuesday:</h5></div>
//                                     <div className="col-md-5 mb-auto">
//                                         <label htmlFor="starttimetuesday">Start time:</label>
//                                         <input type="text" className="form-control"
//                                                name = "starttimetuesday"
//                                                value={this.state.starttimetuesday}
//                                                placeholder="12:00"
//                                                onChange={this.onChange}
//                                         />
//                                     </div>
//                                     <div className="col-md-5 mb-auto">
//                                         <label htmlFor="endtimetuesday">End time:</label>
//                                         <input type="text" className="form-control"
//                                                name = "endtimetuesday"
//                                                value={this.state.endtimetuesday}
//                                                placeholder="14:00"
//                                                onChange={this.onChange}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-2"> <h5>Wednesday:</h5></div>
//                                     <div className="col-md-5 mb-auto">
//                                         <label htmlFor="starttimewednesday">Start time:</label>
//                                         <input type="text" className="form-control"
//                                                name = "starttimewednesday"
//                                                value={this.state.starttimewednesday}
//                                                placeholder="12:00"
//                                                onChange={this.onChange}
//                                         />
//                                     </div>
//                                     <div className="col-md-5 mb-auto">
//                                         <label htmlFor="endtimewednesday">End time:</label>
//                                         <input type="text" className="form-control"
//                                                name = "endtimewednesday"
//                                                value={this.state.endtimewednesday}
//                                                placeholder="14:00"
//                                                onChange={this.onChange}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-2"><h5>Thursday:</h5></div>
//                                     <div className="col-md-5 mb-auto">
//                                         <label htmlFor="starttimethursday">End time:</label>
//                                         <input type="text" className="form-control"
//                                                name = "starttimethursday"
//                                                value={this.state.starttimethursday}
//                                                placeholder="12:00"
//                                                onChange={this.onChange}
//                                         />
//                                     </div>
//                                     <div className="col-5 mb-auto">
//                                         <label htmlFor="endtimethursday">End time:</label>
//                                         <input type="text" className="form-control"
//                                                name = "endtimethursday"
//                                                value={this.state.endtimethursday}
//                                                placeholder="14:00"
//                                                onChange={this.onChange}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-2"> <h5>Friday:</h5></div>
//                                     <div className="col-md-5 mb-auto">
//                                         <label htmlFor="starttimefriday">Start time:</label>
//                                         <input type="text" className="form-control"
//                                                name = "starttimefriday"
//                                                value={this.state.starttimefriday}
//                                                placeholder="12:00"
//                                                onChange={this.onChange}
//                                         />
//                                     </div>
//                                     <div className="col-md-5 mb-auto">
//                                         <label htmlFor="endtimefriday">End time:</label>
//                                         <input type="text" className="form-control"
//                                                name = "endtimefriday"
//                                                value={this.state.endtimefriday}
//                                                placeholder="14:00"
//                                                onChange={this.onChange}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row papper">
//                                     <button type="submit" className="btn btn-lg btn-dark btn-primary btn-block center-block">
//                                         Submit
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }
//
// export default Timetable