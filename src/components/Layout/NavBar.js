import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../../store/userSlice";
import styled from './NavBar.module.css';
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const onLogin = useSelector(state => state.auth.onLogin);
  const dispatch = useDispatch();

  const userCurr = JSON.parse(localStorage.getItem('userCrr'))
  let fullName;
  if(userCurr !== null) {
    fullName = userCurr[0].fullName;
  }

  // remote user curr
  const handleLogout = () => {
    dispatch(login());
    localStorage.removeItem('userCrr')
  }

  return (
    <nav className={styled.navbar}>
      <div className={styled.link}>
        <ul>
          <li>
            <NavLink className={({isActive})=> isActive ? styled.active : ''} to='/' >Home</NavLink>
          </li>
          <li>
            <NavLink className={({isActive})=> isActive ? styled.active : ''} to='/shop' >Shop</NavLink>
          </li>
        </ul>
      </div>
      <div className={styled.logo}>BOUTIQUE</div>
      <div className={styled.link}>
      <ul>
          <li>
            <NavLink className={(navData) =>
              navData.isActive ? styled.active : ''
            } to='/cart' >
            <i className="fas fa-shopping-cart"></i>
              Cart</NavLink>
          </li>
          
          <li>
            <NavLink className={(navData) =>
              navData.isActive ? styled.active : ''
            } to='/login' >
            <i className="fas fa-user"></i>
              {onLogin ? fullName : 'Login'}
            </NavLink>
          </li>
          {onLogin && <li onClick={handleLogout} style={{fontSize: '20px', cursor: 'pointer'}}>(Logout)</li>}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
