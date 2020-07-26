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
    var content = [];

    var min = 0;
    var max = 4;


  const notestyle = {
    color: "white",
    width: "200px",
    backgroundColor: colors[Math.floor(Math.random() * (max - min)) + min],
    alignItems: 'center',
    padding: "50px",
    justifyContent: 'center',
    fontFamily: 'Arial'
  };
  
  

class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {     
            value: '',
            notesList: [{
                _nid: 1,
                content: 'Bitte klappe!',
                nfavorite: false,
                ntimestamp: '123456'
            },
            {
                _nid: 2,
                content: 'Bitte klappe 2!',
                nfavorite: false,
                ntimestamp: '123456'
            }]
        }
            ;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            notes: decoded.identity.notes,

        })
    }

      handleChange(event) {  
            this.setState({value: event.target.value}); 
         }

      handleSubmit(event) {

        event.preventDefault();
        
        const user = {
            value: this.state.value,

        }
        notes(user).then(res => {
            alert("Added a new Note");
        }).catch(err =>{
            console.log(err)
        });
        



      }

      getNoteData(){
        return this.state.notesList.map((note, index) =>  {
            const {_nid, content, nfavorite, ntimestemp} = note
            // if (id > 1){
                return (
                    <div key={{_nid}}>
                        <div className="col-md-5 ">
                            <h2 style = {notestyle}>First Note in DB {content}</h2>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                )
            // }

        })
        }
      content = this.getNoteData();
      

    render() {
        alert(this.state.bind(this));
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
                        <div >
                            {this.getNoteData()}
                        </div>
                    </div>
                </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 right">
                        <div className = "form-group">
                            <form noValidate onSubmit={this.handleSubmit}>
                                <textarea placeholder='Write a Note' onChange={this.handleChange} value ={this.state.value} style={{ minHeight: 300 , minWidth: 500}} />
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