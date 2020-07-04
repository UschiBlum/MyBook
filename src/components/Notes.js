import React, {Component} from 'react'
import { Form, TextArea } from 'semantic-ui-react'


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
    backgroundColor: colors[Math.floor(Math.random() * (max - min)) + min],
    padding: "60px",
    fontFamily: 'Arial'
  };

  

class Notes extends Component {

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Notes</h1>
                    </div>
                </div>
                <div style={divStyle}>
                    <div style={divStyle}>
                        <div style={secondStyle}>
                            <h2 style={notestyle}>Hier ist ein note</h2>
                        </div>
                        <div style={secondStyle}>
                            <h2 style={notestyle}>Hier ist ein note</h2>
                        </div>
                        <div style={secondStyle}>
                            <h2 style={notestyle}>Hier ist ein note</h2>
                        </div>
                    </div>
                    <div>
                        <Form>
                            <TextArea placeholder='Write a Note' style={{ minHeight: 300 , minWidth: 500}} />
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notes