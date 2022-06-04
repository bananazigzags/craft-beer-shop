import { NavLink, Outlet } from "react-router-dom"
import { BasketStatus } from "./BasketStatus"
import dog from '../icons/dog.svg'
import "./Navbar.css"
import { AppContext } from '../App'
import { useContext } from 'react'

const Navbar = () => {
  const { basket } = useContext(AppContext);

  return (
    <>
    <div className="navbar">
      <div className="store-heading">
        <img src={dog} alt="" className="dog-img"/>
        <h1 className="store-name">Хмельная Собака</h1>
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
        <BasketStatus 
        numProducts={basket.amount}
        total={basket.total}
        />
      </nav>
    </div>
    <Outlet />
    </>
  )
}

export { Navbar }