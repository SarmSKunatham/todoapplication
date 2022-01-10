import React, { useState, useEffect } from "react";
import { Link, Route, Switch, BrowserRouter } from "react-router-dom";
import "./Login.css";
import { useHistory } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginComplete, setLoginComplete] = useState(false);
  const history = useHistory();
  const handleInputUsername = ({ currentTarget: input }) => {
    setUsername(input.value);
  };
  const handleInputPassword = ({ currentTarget: input }) => {
    setPassword(input.value);
  };
  const handleLogin = () => {
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password })
    })
      .then((res) => {
        if (res.status === 400 || res.status === 404 || res.status === 500 || res.status === 401){
          alert("Invalid username or password");
        }else {
          window.location.href = '/todo';
        }
      })
      .catch((err) => {
        console.log(err);
        
      }); 
      
  };
  // console.log(username);
  // console.log(password);
  
  return (
    <BrowserRouter>
      <div className="login_page">
        <div className="login_container">
          <div className="login_header">LOG IN</div>
          <form className="input_container">
            <input
              className="login_username"
              type="text"
              placeholder="username"
              onChange={handleInputUsername}
              value={username}
            />
            <input
              className="login_password"
              type="password"
              placeholder="password"
              onChange={handleInputPassword}
              value={password}
            />
          </form>
          {/* <Link to="/login" className="link__button"> */}
          <button className="login_button" onClick={handleLogin}>LOG IN</button>
          {/* </Link> */}
        </div>
        <div className="not__login">
          <Link to="/register" className="not__member">
            REGISTER
          </Link>
          <div className="slash">|</div>
          <Link to="/register" className="forgot__password">
            Forgotten password?
          </Link>
        </div>
      </div>
      
    </BrowserRouter>
    
  );
};

export default Login;
