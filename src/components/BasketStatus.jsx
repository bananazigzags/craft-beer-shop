import './styles/BasketStatus.css'
import basket from "../icons/basket.svg"

const BasketStatus = ({ numProducts = 0, total = 0}) => {
  
  return (
    <div className="basket-status">
      <span>В корзине {numProducts} товаров на сумму ${total}</span>
      <img src={basket} alt="" className="basket-img"/>
    </div>   
  )
}

export { BasketStatus }