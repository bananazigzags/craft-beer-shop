import { NavLink, Outlet } from "react-router-dom"
import { BasketStatus } from "./BasketStatus"
import { ErrorModal } from "./ErrorModal"
import dog from '../icons/dog.svg'
import "./styles/Navbar.css"
import { useState } from 'react'
import { Modal } from "./Modal"
import { authenticate } from '../util/authenticate'
import { useSelector, useDispatch } from 'react-redux'
import { selectBasket } from '../redux/basketSlice'
import { selectIsAuthed, setIsAuthed } from "../redux/isAuthedSlice"

const Navbar = () => {
  const basket = useSelector(selectBasket);
  const [isOpen, setIsOpen] = useState(false);
  const [isFailedLogin, setIsFailedLogin] = useState(false);
  const isAuthed = useSelector(selectIsAuthed)
  const [isError, setError] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const dispatch = useDispatch()

  const login = (login, password) => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (!response.ok) {
        setError(true);
        setErrorMessage("Беда с сервером. Попробуйте позже");
      } else {
        return response.json()
      }
    })
    .then(data => {
      try {
        if(authenticate(login, password, data)) {
          dispatch(setIsAuthed(true));
          setIsOpen(false);
        } else {
          setIsFailedLogin(true)
        }
      } catch(e) {
        setError(true);
        setErrorMessage(e)
      }
    })
    .catch(e => {
      setError(true);
      setErrorMessage(e.toString());
    })
  }

  const handleLoginLogout = () => {
    isAuthed ? dispatch(setIsAuthed(false)) : setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false);
    setIsFailedLogin(false);
  }

  const handleCloseError = () => {
    setError(false);
  }

  return (
    <>
    <div className="navbar">
      <div className="store-header">
        <div className="store-logo">
          <div className="dog-img-wrapper"><img src={dog} alt="" className="dog-img"/></div>
          <h1 className="store-name">Хмельная Собака</h1>
        </div>
        <div className="header-btn-block">
          <button 
            className="authBtn"
            onClick={handleLoginLogout}
          >
            {isAuthed? "Выйти" : "Войти"}
          </button>
        </div>
      </div>
      
      <nav className="nav-content">
        <div className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
          >
            Главная
          </NavLink> |{' '}
          <NavLink 
            to="/about" 
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
          >
            О магазине
          </NavLink>
        </div>
        {isAuthed ? <div className="auth-basket-block">
          <BasketStatus 
            numProducts={basket.amount}
            total={basket.total}
          />
        </div> : null}
      </nav>
    </div>
    {isOpen && <Modal 
    onClose={handleClose} 
    onLogin={login}
    isFailedLogin={isFailedLogin}
    setIsFailedLogin={setIsFailedLogin}
    />
    }
    {isError && <ErrorModal 
      onClose={handleCloseError}
      msg={errorMessage}
    />}
    <Outlet />
    </>
  )
}

export { Navbar }