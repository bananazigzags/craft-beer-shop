import './styles/BasketStatus.css'
import svg from "../icons/basket.svg"

const BasketStatus = ({ numProducts = 0, total = 0}) => {
  
  return (
    <div className="basket-status">
      <span>В корзине {numProducts} товаров на сумму ${total}</span>
      <img src={svg} alt="" className="basket-img"/>
    </div>   
  )
}

export { BasketStatus }