import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

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
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
