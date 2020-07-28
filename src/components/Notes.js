import React, {Component} from 'react'
import { Form, TextArea } from 'semantic-ui-react'
import jwt_decode from 'jwt-decode'
import {notes} from './UserFunction'


const divStyle = {
    display: 'flex',
    padding: "20px",
    alignItems: 'center',
    justifyContent: 'center',
    margin: '50px',
  };
  const secondStyle = {
    padding: "20px",
    color:"white",
  };

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

  var notecontent = []
  var notelist = []

class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {     
             newnote: [],
            notesList: [
                {_nid: 1, content:'test1', nfavorite: false, ntimestemp:"3423234"},
                {_nid: 2, content:'test2', nfavorite: false, ntimestemp:"3423234"},
                {_nid: 3, content:'test3', nfavorite: false, ntimestemp:"3423234"},
                {_nid: 4, content:'test4', nfavorite: false, ntimestemp:"3423234"}
            ],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            newnote: decoded.identity.notes,

        })
    }

    handleChange(event) {
            this.setState({newnote: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const user = {
            newnote: this.state.newnote,

        }
        notes(user).then(res => {
            window.location.reload()
        }).catch(err =>{
            console.log(err)
        });

    }

    createNoteId(){
        var id = 0
        notecontent = this.state.newnote
        notelist=notecontent.map((entry) => {
            entry = {nid: id, content: entry}
            id++
            return entry
        })
        return notelist
    }

    renderNotesData(){
        return this.state.notesList.map((note, index) =>  {
            const {content} = note
            // if (id > 1){
                return (
                    <div>
                        <div className="col-md-6 ">
                            <h2 style = {notestyle}>First Note in DB {this.state.newnote}</h2>
                        </div>
                        {/*<div className="col-md-2"></div>*/}
                    </div>
                )
            // }

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
                <div className="row header-row">
                    <div className="col-md-5">
                        <h1 className="heading text-center display-1">Notes</h1>
                    </div>
                </div>
                <div className="col-md-5 left">
                    <div className="form-group">
                        <div>
                            {this.renderNotesData()}
                            {/*<div className="col-md-5 left">*/}
                            {/*    <h2 style = {notestyle}>First Note in DB </h2>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-2"></div>*/}
                            {/*<div className="col-md-5">*/}
                            {/*    <h2 style = {notestyle}>Second Note in DB</h2>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-2"></div>*/}
                            {/*<div className="col-md-5">*/}
                            {/*    <h2 style = {notestyle}>Third Note in DB </h2>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-2"></div>*/}
                        </div>
                    </div>
                </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 right">
                        <div className = "form-group">
                            <form noValidate onSubmit={this.handleSubmit}>
                                <textarea placeholder='Write a Note' onChange={this.handleChange} value ={this.state.newnote} style={{ minHeight: 300 , minWidth: 500}} />
                                <div>
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Create Note
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Notes