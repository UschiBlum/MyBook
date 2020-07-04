import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Examen from "./components/Examen";
import Timetable from "./components/Timetable";
import Calender from "./components/Calender";
import Assignments from "./components/Assignments";
import Notes from "./components/Notes";
import notebook from './components/notepad-background-png-4-original.png'

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App" style={{backgroundImage: `url(${notebook})`, backgroundSize: 'cover', height:'100vh'}}>
            <NavBar />
            <Route exact path="/" component={Welcome} />
            <div className="container">
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
              <Route path="/calender" component ={Calender}/>
              <Route path="/timetable" component ={Timetable}/>
              <Route path="/examen" component ={Examen}/>
              <Route path="/assignments" component ={Assignments}/>
              <Route path="/notes" component ={Notes}/>
            </div>
          </div>
          <footer>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-auto">
                  <a href="#"></a>
                  <a className="mx-3" href="#"></a>
                  <a href="#"></a>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <p className="copyright text-muted">Copyright &copy; Donotreact 2020</p>
                </div>
              </div>
            </div>
          </footer>
        </Router>
    );
  }
}

export default App;
