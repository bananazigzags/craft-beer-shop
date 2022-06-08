import { NavLink, Outlet } from "react-router-dom"
import { BasketStatus } from "./BasketStatus"
import { ErrorModal } from "./ErrorModal"
import dog from '../icons/dog.svg'
import "./styles/Navbar.css"
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from "./Modal.jsx"
import { authenticate } from '../util/authenticate'
import { setIsAuthed } from "../redux/actions"
import { selectIsAuthed, selectBasket } from "../redux/selectors"
import { basketTotal } from "../util/basketTotal"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFailedLogin, setIsFailedLogin] = useState(false);
  const [isError, setError] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const basket = useSelector(selectBasket);
  const isAuthed = useSelector(selectIsAuthed);
  const dispatch = useDispatch()

  let amountBasket = Object.values(basket.items).reduce((prev, cur) => prev + cur.amount, 0);
  let totalBasket = basketTotal(basket);

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
          setIsFailedLogin(true);
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
            numProducts={amountBasket}
            total={totalBasket}
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