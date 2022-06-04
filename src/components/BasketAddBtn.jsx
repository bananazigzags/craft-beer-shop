import './styles/BasketAddBtn.css'
import { useState, useContext } from 'react'
import { AppContext } from '../App'
import sad from '../icons/sad.svg'

export const BasketAddBtn = ({ price, id, inStock }) => {
  const [num, setNum] = useState(0)
  const [notEnough, setNotEnough] = useState(false)
  const { setBasket, stock, setStock } = useContext(AppContext);

  const handleAdd = () => {
    let numBeers = parseInt(num);
    let leftIfBought = stock[id] - numBeers;
    if (leftIfBought < 0) {
      setNotEnough(true);
      setTimeout(() => {
        setNotEnough(false);
      }, 1000)
    }
    if ((numBeers > 0) && (leftIfBought >= 0)) {
      setBasket(prev => ({
          amount: prev.amount + parseInt(num),
          total: Math.round( (prev.total + num * price) * 100 + Number.EPSILON ) / 100
        })
      )
      setStock(prev => ({...prev, [id]: prev[id] - num}))
    }
  }

  const handleChange = (e) => {
    setNum(e.target.value)
  }

  return inStock ?
    <button 
      className="btn"
    >
      <div onClick={handleAdd}>
        {notEnough 
        ? `Осталось всего ${stock[id]}` 
        : "Добавить в корзину"}
      </div>
      <input 
        className="addBasket-input"
        type="number" 
        onChange={handleChange}
        value={num} 
      />
    </button>
  : <div className="outOfStock">
      <img src={sad} alt=""/>
      <span className="outOfStock-text">Нет в наличии</span>
    </div>
}