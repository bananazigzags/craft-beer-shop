import './styles/BasketStatus.css'
import { Link } from 'react-router-dom'
import basket from "../icons/basket.svg"

const BasketStatus = ({ numProducts = 0, total = 0}) => {
  
  return (
    <div className="basket-status">
      <span>В корзине {numProducts} товаров на сумму ${total}</span>
      <Link to="basket">
        <img src={basket} alt="" className="basket-img"/>
      </Link>
    </div>   
  )
}

export { BasketStatus }