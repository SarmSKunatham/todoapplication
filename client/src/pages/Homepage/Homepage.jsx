import React, { Component, useState } from "react";
import "./Homepage.css";
import Navbar from "../../components/navbar/navbar";
import { Route } from "react-router-dom";

// Create homepage component
class Homepage extends Component {
  state = {
    isLoggedIn: false,
  };
  // check if user is logged in
  componentDidMount() {
    fetch("/api/users/").then((res) => {
      if (res.status === 200) {
        this.setState({ isLoggedIn: true });
      }
    });
  }
  render() {
    return (
      <>
        <div className="home">
          <h1>Welcome to "To Do Application"</h1>
          <p>
            This is a simple todo application that you can use to manage your
            daily tasks.
          </p>
          {this.state.isLoggedIn ? (
            <a href="/todo">Check What To Do</a>
          ) : (
            <button className="home-btn">
              <a href="/login">GET STARTED</a>
            </button>
          )}
        </div>
      </>
    );
  }
}
export default Homepage;
