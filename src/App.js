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

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
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
        </Router>
    );
  }
}

export default App;
