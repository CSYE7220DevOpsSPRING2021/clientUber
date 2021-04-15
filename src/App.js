import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { render } from "react-dom";
import ParticlesBg from "particles-bg";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import MainPage from "./components/mainPage/MainPage";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      SignIn:false,
      loggedIn:false
    };
  }

  logginOn = (event)=> {
    this.setState((state)=>({loggedIn:true}))
  }

  logginOff = (event)=> {
    this.setState((state)=>({loggedIn:false}))
  }

  handleChange = (event) => {
    this.setState((state)=>({SignIn:!state.SignIn}))
  }

  render() {
    return (
      <div>{!this.state.loggedIn?
          <>
          {!this.state.SignIn?
            <SignIn
              singUP={this.state.SignIn}
              handleChange={this.handleChange}
              logginOn={this.logginOn}
            />:<SignUp
                singUP={this.state.SignIn}
                handleChange={this.handleChange}
                logginOn={this.logginOn}
              />}
          </>:<>
            <MainPage/>
        </>}
        <ParticlesBg type="random" bg={true}/>
      </div>
    );
  }
}

export default App;
