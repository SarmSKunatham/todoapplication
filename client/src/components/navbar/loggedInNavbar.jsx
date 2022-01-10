import React, { useEffect } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import "./navbar.css";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Todo from "../../pages/Todo/Todo";
import Homepage from "../../pages/Homepage/Homepage";

const LoggedInNavbar = () => {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="todo__logo">
          <div className="todo__shadow">To do</div>
          <div className="todo__text">To do</div>
        </div>
        <div className="navbar_links">
          <NavLink
            to="/"
            exact={true}
            className="menu"
            activeClassName="menu_active"
          >
            Home
          </NavLink>
          <NavLink
            to="/todo"
            exact={true}
            className="menu"
            activeClassName="menu_active"
          >
            To do
          </NavLink>
          <button
            className="btn btn-danger"
            onClick={() => {
              fetch("/api/users/logout", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  response.json();
                  window.location.href = "/";
                })
                .then((result) => console.log("logout"));
            }}
          >
            Logout
          </button>
        </div>
        <div className="route">
          <Route path="/" exact={true} component={Homepage} />
          <Route path="/todo" exact={true} component={Todo} />
        </div>
      </nav>
    </BrowserRouter>
  );
};

export default LoggedInNavbar;
