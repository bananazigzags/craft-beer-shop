import { FormInput } from './FormInput'
import React, { useState } from 'react'
import './styles/Modal.css'
import sad from '../icons/sad.svg';
import { CloseBtn } from './CloseBtn';

export const Modal = ({onLogin, onClose, isFailedLogin, setIsFailedLogin}) => {
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  })

  const handleChange = (e) => {
    setLoginData(prev => ({...prev, [e.target.name]: e.target.value}));
    setIsFailedLogin(false);
  };

  return (
    <div className="modal-container">
      <CloseBtn onClose={onClose}/>
      <div className="input-container">
        <FormInput 
        field="login"
        fieldLabel="Логин"
        handleChange={handleChange}
        value={loginData.login}
        />
        <FormInput 
        field="password"
        fieldLabel="Пароль"
        handleChange={handleChange}
        value={loginData.password}
        />
      </div>
      <div className="error-msg">
        {isFailedLogin && <> 
        <span>Неверный логин и/или пароль</span>
        <div className="error-dog"><img src={sad} alt="" className="error-img"/></div>
        </>
        }
      </div>
      <div className='btn-block'>
        <button 
        className='login-btn'
        onClick={() => onLogin(loginData.login, loginData.password)}
        >
          Войти
        </button>
        <button className='login-btn'
        onClick={onClose}
        >
          Отмена
          </button>
      </div>
    </div>
  )
}