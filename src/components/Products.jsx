import { Card } from "./Card"
import { useSelector } from 'react-redux'
import { selectStock } from '../redux/selectors'

export const Products = ({ collection }) => { 
  const stock = useSelector(selectStock);

  return collection? collection.map(product => {
  return <Card 
  name={product.name}
  imgLink={product.image_url}
  price={product.ph}
  key={product.id}
  id={product.id}
  productStock={stock[product.id]}
  inStock={stock[product.id] > 0}
  />
  }) : null
}