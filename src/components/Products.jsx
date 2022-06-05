import { Card } from "./Card"
import { selectStock } from "../redux/stockSlice"
import { useSelector } from 'react-redux'

const Products = ({ collection }) => {
  const stock = useSelector(selectStock)
  
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

export { Products }