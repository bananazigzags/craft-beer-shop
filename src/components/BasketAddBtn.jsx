import './styles/BasketAddBtn.css'
import sad from '../icons/sad.svg'
import { useState } from 'react'
import { connect } from 'react-redux'
import { addItem, addTotal, decrementByAmount } from '../redux/actions'

const BasketAddBtn = ({ 
  price, 
  id, 
  inStock, 
  productStock,
  addItem,
  addTotal,
  decrementByAmount 
}) => {
  const [num, setNum] = useState(0)
  const [notEnough, setNotEnough] = useState(false)

  const handleAdd = () => {
    let numBeers = parseInt(num);
    let leftIfBought = productStock - numBeers;
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
        ? `Осталось всего ${productStock}` 
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

export default connect(null, mapDispatchToProps)(BasketAddBtn)
