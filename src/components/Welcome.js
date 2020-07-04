import React, {Component} from 'react'
import ReactPlayer from "react-player"
import logo from './logo.jpg';

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  };
  

class Welcome extends Component {
    render() {
        return (
            <div>
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">WELCOME</h1>
                    </div>
                </div>
            </div>
            <div style={divStyle}>
                <div>
                    <h2 className = "text-center">With MyBook to your book!</h2>
                    <div>
                    <p>
                        MyBook is your online Bullet-Journal!
                    </p>
                    <p>
                        You can plan your week with the Calender, make Notes, create a Timetable and much more!
                    </p>
                    <p>
                        MyBook helps you organise your Study and private life.
                    </p>
                    <div className="logo">
                        <img src={logo} width="250" height="250" />
                    </div>
                </div>            
                </div>
            
                <div>
                    <ReactPlayer
                    url="https://www.youtube.com/watch?v=zkVFHDtQ3Bk&t"
                    />
                </div>
            </div>
            </div>
            
        )
    }
}

export default Welcome