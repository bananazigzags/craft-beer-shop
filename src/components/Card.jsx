import './styles/Card.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BasketAddBtn } from './BasketAddBtn'
import { AppContext } from '../App'
import { LoginMsg } from './LoginMsg'

const Card = ({name, imgLink, id, price, inStock }) => { 
  const { isAuthed } = useContext(AppContext);
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
      ? <BasketAddBtn price={price} id={id} inStock={inStock}/> 
      : <LoginMsg />
      }
    </div>
  )
}

export { Card }