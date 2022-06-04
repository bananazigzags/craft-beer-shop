import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../App'
import './Product.css'
import { BasketAddBtn } from '../components/BasketAddBtn'

const Product = () => {
  const { beerId } = useParams()
  const beerUrl = `https://api.punkapi.com/v2/beers?ids=${beerId}`
  const [data, setData] = useState()
  const { stock } = useContext(AppContext);

  useEffect(() => {
    fetch(beerUrl)
    .then(response => response.json())
    .then(data => setData(data[0]))
  }, [beerUrl])

  return data &&
  <div className="product">
    <h1>{data.name}</h1>
    <p>{data.tagline}</p>
    <div className="product-info-block">
      <div className="product-img-wrapper">
        <img 
          className="product-img" 
          src={data.image_url} 
          alt={data.name}
        />
      </div>
      <div className="product-info">
        <p>{data.description}</p>
        <p>Алкоголь: {data.abv}%</p>
        <p>Цена: ${data.ph || 4.5}</p>
        {stock[data.id] > 0 ? <p>В наличии: {stock[data.id]}</p> : null}
        <BasketAddBtn 
          price={data.ph} 
          id={data.id}
          inStock={stock[data.id] > 0} 
        />
      </div>
    </div>
    
  </div>
}

export { Product }