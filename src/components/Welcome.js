import React, {Component} from 'react'
import ReactPlayer from "react-player"
import logo from './logo.jpg'
import './welcome.css'

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  };
  

class Welcome extends Component {
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
                        <h1 className="heading text-primary text-center">Welcome</h1>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5"></div>

                </div>
                <div className="row second-row">
                    <div className="col-md-5">
                        <div class="lead text-dark my-4 border border-dark rounded text-box">
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
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5">
                        <ReactPlayer url="https://www.youtube.com/watch?v=zkVFHDtQ3Bk&t" width="50em"/>
                    </div>
                </div>
                <div class="row last-row">
                    <div class="row logo">
                        <div class="col-md-5">
                            <img src={logo} width="250" height="250" />
                        </div>
                        <div class="col-md-2"></div>
                        <div class="col-md-5"></div>
                    </div>
                </div>
            </div>



            // <div>
            // <div className="container">
            //     <div className="mt-5">
            //         <div className="col-sm-8 mx-auto">
            //             <h1 className="text-center">WELCOME</h1>
            //         </div>
            //     </div>
            // </div>
            // <div style={divStyle}>
            //     <div>
            //         <h2 className = "text-center">With MyBook to your book!</h2>
            //         <div>
            //         <p>
            //             MyBook is your online Bullet-Journal!
            //         </p>
            //         <p>
            //             You can plan your week with the Calender, make Notes, create a Timetable and much more!
            //         </p>
            //         <p>
            //             MyBook helps you organise your Study and private life.
            //         </p>
            //         <div className="logo">
            //             <img src={logo} width="250" height="250" />
            //         </div>
            //     </div>
            //     </div>
            //
            //     <div>
            //         <ReactPlayer
            //         url="https://www.youtube.com/watch?v=zkVFHDtQ3Bk&t"
            //         />
            //     </div>
            // </div>
            // </div>

        )
    }
}

export default Welcome