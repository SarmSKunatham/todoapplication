import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Todo from "./pages/Todo/Todo";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/navbar";
import Homepage from "./pages/Homepage/Homepage";
import LoggedInNavbar from "./components/navbar/loggedInNavbar";
import React,{useEffect} from "react";


function App() {
  // check if user is logged in
  const [loggedIn, setLoggedIn] = React.useState(false);
  useEffect(() => {
    fetch('/api/users/').then(res => {
      if (res.status === 200){
        setLoggedIn(true);
      }
      else{
        setLoggedIn(false);
      }
    }).catch(err => console.log(err));
  })
    
    return (
      <div className="App">
        {loggedIn ? (<LoggedInNavbar />) : (<Navbar />)}

      </div>
    );
  }

export default App;
