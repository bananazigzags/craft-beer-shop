import './styles/Card.css'
import { Link } from 'react-router-dom'
import { BasketAddBtn } from './BasketAddBtn'
import { LoginMsg } from './LoginMsg'
import { useSelector } from 'react-redux'
import { selectIsAuthed } from '../redux/selectors'

export const Card = ({name, imgLink, id, price, productStock, inStock }) => { 
  const isAuthed = useSelector(selectIsAuthed)
  return (
    <div className="card">
      <Link to={`/beer/${id}`} className="card-name">
        <p>{name}</p>
      </Link>
      <Link to={`/beer/${id}`}>
        <img src={imgLink} alt={name} className="product-image"/>
      </Link>
      <p className="card-price">Цена: ${price || 4.5}</p>
      { isAuthed 
      ? <BasketAddBtn 
      productStock={productStock} 
      price={price} 
      id={id} 
      inStock={inStock}
      name={name}
      /> 
      : <LoginMsg />
      }
    </div>
  )
}