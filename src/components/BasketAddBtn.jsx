import './styles/BasketAddBtn.css'
import { useState } from 'react'
import sad from '../icons/sad.svg'

import { connect } from 'react-redux'
// import { addItem, addTotal } from '../redux/basketSlice'
// import { decrementByAmount, selectStock } from '../redux/stockSlice'

import { addItem, addTotal, decrementByAmount } from '../redux/actions'

export const BasketAddBtn = ({ 
  price, 
  id, 
  inStock, 
  stock,
  addItem,
  addTotal,
  decrementByAmount 
}) => {
  const [num, setNum] = useState(0)
  const [notEnough, setNotEnough] = useState(false)

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
      (addItem(numBeers));
      (addTotal(num * price));
      (decrementByAmount({amount: numBeers, id: id}))
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

const mapDispatchToProps = {
  addItem,
  addTotal,
  decrementByAmount
}

const mapStateToProps = (state, ownProps) => {
  const { stock } = state
  const { price, id, inStock } = ownProps
  return { stock, price, id, inStock }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketAddBtn)