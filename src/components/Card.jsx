import './styles/Card.css'
import { Link } from 'react-router-dom'
import BasketAddBtn from './BasketAddBtn'
import { LoginMsg } from './LoginMsg'
import { connect } from 'react-redux'

const Card = ({name, imgLink, id, price, inStock, isAuthed }) => { 
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

const mapStateToProps = (state, ownProps) => {
  const { isAuthed } = state
  const { name, imgLink, id, price, inStock } = ownProps
  return { name, imgLink, id, price, inStock, isAuthed }
}

export default connect(mapStateToProps, null)(Card)