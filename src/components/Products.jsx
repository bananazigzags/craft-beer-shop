import Card from "./Card"
import { connect } from 'react-redux'

const Products = ({ collection, stock }) => { 
  return collection? collection.map(product => {
  return <Card 
  name={product.name}
  imgLink={product.image_url}
  price={product.ph}
  key={product.id}
  id={product.id}
  inStock={stock[product.id] > 0}
  />
  }) : null
}

export const mapStateToProps = (state, ownProps) => {
  const { stock } = state
  const { collection } = ownProps
  return { stock, collection }
}

export default connect(mapStateToProps, null)(Products)