import { Card } from "./Card"
import { AppContext } from "../App"
import { useContext } from "react"

const Products = ({ collection }) => {
  const { stock } = useContext(AppContext);
  
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