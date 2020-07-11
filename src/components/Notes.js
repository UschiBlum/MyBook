import React, {Component} from 'react'
import { Form, TextArea } from 'semantic-ui-react'
import jwt_decode from 'jwt-decode'


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
    fontFamily: 'Arial'
  };

  
  

class Notes extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            notes: ''
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.identity.username,
            notes: decoded.identity.notes,
        })
        
    }

    onSubmit(e) {
        e.preventDefault()
        const user = {
            username: this.state.username,
            notes: this.state.notes
        }

        Notes(user)
            .then(res => {
                if (!res.error) {
                    const token = localStorage.usertoken
                    const decoded = jwt_decode(token)
                    this.setState({
                        notes: decoded.identity.notes + this.state.TextArea,
                    })
                }
            })
            .catch(err => {
                console.log(err)
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
                        <div >
                            <div className="col-md-5 left">
                                <h2 style = {notestyle}>Hier ist ein note 1</h2>
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-md-5">
                                <h2 style = {notestyle}>Hier ist ein note 2</h2>
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-md-5">
                                <h2 style = {notestyle}>Hier ist ein note 3</h2>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 right">
                        <div className = "form-group">
                            <Form>
                                <TextArea placeholder='Write a Note' style={{ minHeight: 300 , minWidth: 500}} />
                            </Form>
                            <input type="text"
                                       className="form-control form-control-lg"
                                       name="text"
                                       value={this.state.TextArea}
                                       onChange={this.handleChange}
                                       noValidate
                                />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary btn-lg">
                                 Create Note
                            </button>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Notes