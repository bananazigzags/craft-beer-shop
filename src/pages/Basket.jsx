import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { selectBasket, selectIsAuthed, selectStock } from '../redux/selectors';
import trash from '../icons/trash.svg'
import './styles/Basket.css'
import { clearBasket, delPos, addItem, beerDown, decrementByAmount, incrementByAmount } from '../redux/actions';
import { basketTotal } from '../util/basketTotal';

export const Basket = () => {
  const [stockError, setStockError] = useState(null);
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);
  const isAuthed = useSelector(selectIsAuthed);
  const items = basket.items;
  const stock = useSelector(selectStock);
  let totalBasket = basketTotal(basket);

  let rows = [];

  const handleDelete = ({target}) => {
    dispatch(delPos({
      id: target.id, 
      amount: items[target.id].amount,
    }));
  }

  const handleClear = () => {
    dispatch(clearBasket());
  }

  const handleBeerUp = ({target}) => {
    if (stock[target.id] > 0) {
      dispatch(addItem({id: target.id, amount: 1}))
      dispatch(decrementByAmount({id: target.id, amount: 1}))
    } else {
      setStockError("Это пиво закончилось")
      setTimeout(() => {
        setStockError("")
      }, 1000)
    }
  }

  const handleBeerDown = ({target}) => {
    dispatch(beerDown({id: target.id}))
    dispatch(incrementByAmount({id: target.id, amount: 1}))
  }

  if (Object.keys(items).length !== 0 ) {
    for (let id in items) {
      rows.push(
      <tr key={id}>
        <td>{id}</td> 
        <td className="td-name">{items[id].name}</td>
        <td className="td-money">{`$${items[id].price}`}</td>
        <td className='bskt-amount'>
          {items[id].amount}
          <div className='bskt-btns'>
            <button id={id} onClick={(e) => handleBeerUp(e)}>˄</button>
            <button id={id} onClick={(e) => handleBeerDown(e)}>˅</button>
          </div>
        </td>
        <td className="td-money">{`$${Math.round((items[id].price * items[id].amount) * 100 + Number.EPSILON)/ 100}`}</td>
        <td>
          <img onClick={handleDelete} src={trash} alt="" className="trashcan" id={id}/>
        </td>
      </tr>)
    }
  }

  return (
    !isAuthed
    ?
    <div className="basket"><h1>Чтобы добавить товары в корзину, залогиньтесь</h1></div>
    :
    Object.keys(items).length === 0 
    ? <div className="basket"><h1>Корзина пуста</h1></div>
    : <div className="basket"><h1>Корзина</h1>
        <table>
          <tbody>
            <tr>
              <td>Код</td>
              <td>Наименование</td>
              <td>Цена за 1 шт.</td>
              <td>Количество</td>
              <td>Общая cтоимость</td>
              <td></td>
            </tr>
            {rows}
            <tr>
              <td colSpan="4" className='td-money'>{stockError}</td>
              <td className='td-money'>{`$${totalBasket}`}</td>
              <td></td>
            </tr>
            <tr><td colSpan="6" className="pay-cell td-money" align="right"><button className="clear-btn" onClick={handleClear}>Очистить корзину</button></td></tr>
            <tr><td colSpan="6" className="pay-cell td-money" align="right"><button className="pay-btn" disabled>Оплатить</button></td></tr>
          </tbody>
        </table>
        
      </div>
  )
}