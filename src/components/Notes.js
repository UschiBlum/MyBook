import React, {Component} from 'react'
import { Form, TextArea } from 'semantic-ui-react'

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '100px',
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
                <div>
                    <h2>Hier kommen die Notes hin</h2>
                </div>
                <div>
                    <span>
                    <Form>
                        <TextArea placeholder='Write a Note' style={{ minHeight: 300 , minWidth: 500}} />
                    </Form>
                    </span>
                </div>
                </div>
            </div>
        )
    }
}

export default Notes