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
                <div className="logo">
                    <img src={logo} width="500" height="500" />
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