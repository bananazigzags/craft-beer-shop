import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectStock, selectIsAuthed } from '../redux/selectors'
import './styles/Product.css'

import { BasketAddBtn } from '../components/BasketAddBtn'
import { LoginMsg } from '../components/LoginMsg'
import { beersUrl } from '../util/constants'

export const Product = () => {
  const { beerId } = useParams()
  const beerUrl = `${beersUrl}?ids=${beerId}`;
  const [data, setData] = useState()

  const isAuthed = useSelector(selectIsAuthed);
  const stock = useSelector(selectStock)

  useEffect(() => {
    fetch(beerUrl)
    .then(response => response.json())
    .then(data => setData(data[0]))
  }, [beerUrl])

  return data &&
  <div className="product">
    <div className="product-info-block">
      <div className="product-img-wrapper">
        <img 
          className="product-img" 
          src={data.image_url} 
          alt={data.name}
        />
      </div>
      <div className="product-info">
        <div className="product-header">
          <div>
            <h1>{data.name}</h1>
            <p>{data.tagline}</p>
          </div>
          <div>
            { isAuthed
            ? <BasketAddBtn 
              price={data.ph} 
              id={data.id}
              inStock={stock[data.id] > 0} 
              productStock={stock[data.id]}
            />
            : <LoginMsg />
            }
          </div>      
        </div>      
        <hr/>
        <p>{data.description}</p>
        <p><b>Алкоголь:</b> {data.abv}%</p>
        <p><b>Солод:</b> {Array.from(new Set(data.ingredients.malt.map(malt => malt.name))).join(", ")}</p>
        <p><b>Хмель:</b> {Array.from(new Set(data.ingredients.hops.map(hops => hops.name))).join(", ")}</p>
        <p><b>Дрожжи:</b> {data.ingredients.yeast}</p>
        <p><b>Идеально сочетается с</b>: {data.food_pairing.join(", ")}</p>
        <p><b>Цена:</b> ${data.ph || 4.5}</p>
        {stock[data.id] > 0 ? <p><b>В наличии:</b> {stock[data.id]}</p> : null}        
      </div>
    </div>
  </div>
}