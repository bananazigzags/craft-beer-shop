import './styles/BasketAddBtn.css'
import { useState } from 'react'
import sad from '../icons/sad.svg'

import { useDispatch, useSelector } from 'react-redux'
import { addItem, addTotal } from '../redux/basketSlice'
import { decrementByAmount, selectStock } from '../redux/stockSlice'

export const BasketAddBtn = ({ price, id, inStock }) => {
  const [num, setNum] = useState(0)
  const [notEnough, setNotEnough] = useState(false)
  const stock = useSelector(selectStock)
  const dispatch = useDispatch()

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
      dispatch(addItem(numBeers));
      dispatch(addTotal(num * price));
      dispatch(decrementByAmount({amount: numBeers, id: id}))
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