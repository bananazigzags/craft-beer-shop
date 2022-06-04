import './Card.css'
import { Link } from 'react-router-dom'
import { BasketAddBtn } from './BasketAddBtn'
import sad from '../icons/sad.svg'

const Card = ({name, imgLink, id, price, inStock }) => { 
  return (
    <div className="card">
      <Link to={`/beer/${id}`} className="card-name">
        <p>{name}</p>
      </Link>
      <Link to={`/beer/${id}`}>
        <img src={imgLink} alt={name} className="product-image"/>
      </Link>
      <p className="card-price">Цена: ${price || 4.5}</p>
      <BasketAddBtn price={price} id={id} inStock={inStock}/> 
    </div>
  )
}

export { Card }