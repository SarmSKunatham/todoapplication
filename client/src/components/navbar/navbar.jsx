import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import "./navbar.css";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Todo from "../../pages/Todo/Todo";
import Homepage from "../../pages/Homepage/Homepage";

const Navbar = () => {
    return (
        // <div className='navbar'>
        //     <div className="todo__logo">
        //         <div className="todo__shadow">To do</div>
        //         <div className="todo__text">To do</div>
        //     </div>
        //     <div className="navbar__links">
        //         <a href='/login'>Login</a>
        //         <a href='/register'>Register</a>
        //         <a href='/todo'>Todo</a>
        //     </div>
            
        // </div>
        <BrowserRouter>
            <nav className='navbar'>
                <div className="todo__logo">
                    <div className="todo__shadow">To do</div>
                    <div className="todo__text">To do</div>
                </div>
                <div className='navbar_links'>
                    <NavLink to='/' exact={true} className='menu' activeClassName='menu_active'>Home</NavLink>
                    <NavLink to='/login' exact={true} className='menu' activeClassName='menu_active'>Login</NavLink>
                    <NavLink to='/register' exact={true} className='menu' activeClassName='menu_active'>Register</NavLink>
                </div>
                <div className="route">
                    <Route path='/' exact={true} component={Homepage} />
                    <Route path='/login' exact={true} component={Login} />
                    <Route path='/register' exact={true} component={Register} />
                    <Route path='/todo' exact={true} component={Todo} />
                </div>
                
            </nav>
        </BrowserRouter>
    );
};

export default Navbar;