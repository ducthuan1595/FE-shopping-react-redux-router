import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/userSlice";
import styled from "./LoginPage.module.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [isValid, setInvalid] = useState(true);
  const [messageError, setMessageError] = useState('');
  const [valueInput, setValueInput] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const onLogin = useSelector(state => state.auth.onLogin);
  const navigate = useNavigate();

  let userArr = JSON.parse(localStorage.getItem('userArr')) ?? [];
  // let userCurr = JSON.parse

  // target form input
  const handleChangeInput = (e, name) => {
    let stateCopy = {...valueInput};
    stateCopy[name] = e.target.value;
    setInvalid(false);
    setValueInput(stateCopy);
  };

  // valid input form
  const handleBlur = (name) => {
    if(valueInput[name].trim().length === 0) {
      setInvalid(true);
      setMessageError('Please, this field is require!')
    }
    if(name === 'password' && valueInput['password'].trim().length < 7) {
      setInvalid(true);
      setMessageError('Please, password must at least 8 charts!')
    }
    if(name === 'email' && !valueInput['email'].includes('@')) {
      setInvalid(true);
      setMessageError('Please, this field must to be email!')
    }
  }

  // handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!isValid) {
      // check value user
      if(userArr && userArr.length > 0) {
        const filterUser = userArr.filter(user => user.email === valueInput.email && user.password === valueInput.password);
        if(filterUser.length > 0) {
          dispatch(login());
          //save current user local storage
          localStorage.setItem('userCrr', JSON.stringify(filterUser));
          setInvalid(false);
          alert('Login successfully🎉🎉🎉');
          // window.location.reload();
          // navigate('/');
        }else {
          setInvalid(true);
          setMessageError('Information incorrect!')
          setInvalid({
            email: '',
            password: ''
          });
        }
      }else {
          setInvalid(true);
          setMessageError('Information incorrect!')
      }
    }
  }


  return (
    <div className={styled.form}>
      <form onSubmit={handleSubmit}>
        <div className={styled["form-group"]}>
          <h2>Sign In</h2>
          <div className="form-group">

            <input
              type="email"
              name="email"
              // className="form-control"
              placeholder="Email"
              value={valueInput.email}
              onChange={(e) => handleChangeInput(e, "email")}
              onBlur={handleBlur.bind(null, 'email')}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={valueInput.password}
              onChange={(e) => handleChangeInput(e, "password")}
              onBlur={handleBlur.bind(null, 'password')}
            />
            
          </div>
          {isValid && <div style={{color: 'red'}}>{messageError}</div>}
          <button disabled={onLogin}>SIGN IN</button>
          <div className={styled.link}>Create a account?<Link to='/register' >Sign up</Link></div>
        </div>
      </form>
      </div>
  );
}
