import { useSelector, useDispatch } from 'react-redux';

import { selectBasket, selectIsAuthed } from '../redux/selectors';
import trash from '../icons/trash.svg'
import './styles/Basket.css'
import { clearBasket, delPos, addItem, beerDown } from '../redux/actions';
import { basketTotal } from '../util/basketTotal';

export const Basket = () => {
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);
  const isAuthed = useSelector(selectIsAuthed);
  const items = basket.items;
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
    dispatch(addItem({id: target.id, amount: 1}))
  }

  const handleBeerDown = ({target}) => {
    dispatch(beerDown({id: target.id}))
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
              <td colSpan="4"></td>
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