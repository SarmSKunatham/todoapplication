import react from "react";
import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./Register.css";
import { Link, Redirect, Route, Switch } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerComplete, setRegisterComplete] = useState(false);

  const handleInputName = ({ currentTarget: input }) => {
    setName(input.value);
  };
  const handleInputEmail = ({ currentTarget: input }) => {
    setEmail(input.value);
  };
  const handleInputUsername = ({ currentTarget: input }) => {
    setUsername(input.value);
  };
  const handleInputPassword = ({ currentTarget: input }) => {
    setPassword(input.value);
  };

  return (
    <React.Fragment>
      <div className="registerpage">
        <div className="register_container">
          <div className="register_header">REGISTER</div>
          <form className="input_container">
            <input
              className="input_name"
              type="text"
              placeholder="name"
              onChange={handleInputName}
            />
            <input
              className="input_email"
              type="text"
              placeholder="email"
              onChange={handleInputEmail}
            />
            <input
              className="input_username"
              type="text"
              placeholder="username"
              onChange={handleInputUsername}
            />
            <input
              className="input_password"
              type="password"
              placeholder="password"
              onChange={handleInputPassword}
            />
          </form>
          <button
            className="register_button"
            onClick={() => {
              fetch("/api/users/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name,
                  email: email,
                  username: username,
                  password: password,
                }),
              })
                .then((res) => {
                  setRegisterComplete(true);
                })
                .then((data) => {
                  console.log(data);
                });
            }}
          >
            REGISTER
          </button>
        </div>
        <div className="member__login">
          <div className="are__member">Already a member ?</div>
          <Link to="/login">
            <div className="login">Log in</div>
          </Link>
        </div>
      </div>
      {registerComplete ? <Redirect to="/login" /> : null}
    </React.Fragment>
  );
};

export default Register;
