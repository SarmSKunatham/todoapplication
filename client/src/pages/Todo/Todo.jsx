import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar/navbar";
import TodoList from "../../components/TodoList";
import "./Todo.css";
const Todo = () => {
  return (
    <React.Fragment>
      <div className="todopage">
        <div className="todobody">
          <TodoList />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Todo;
