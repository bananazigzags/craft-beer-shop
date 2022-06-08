import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectStock, selectIsAuthed, selectBeers } from '../redux/selectors'
import './styles/Product.css'
import { BasketAddBtn } from '../components/BasketAddBtn'
import { LoginMsg } from '../components/LoginMsg'

export const Product = () => {
  const { beerId } = useParams()
  const isAuthed = useSelector(selectIsAuthed);
  const stock = useSelector(selectStock)
  const beers = useSelector(selectBeers)
  const beer = beers.filter(beer => beer.id === Number(beerId))[0];

  return beer &&
  <div className="product">
    <div className="product-info-block">
      <div className="product-img-wrapper">
        <img 
          className="product-img" 
          src={beer.image_url} 
          alt={beer.name}
        />
      </div>
      <div className="product-info">
        <div className="product-header">
          <div>
            <h1>{beer.name}</h1>
            <p>{beer.tagline}</p>
          </div>
          <div>
            { isAuthed
            ? <BasketAddBtn 
              name={beer.name}
              price={beer.ph} 
              id={beer.id}
              inStock={stock[beer.id] > 0} 
              productStock={stock[beer.id]}
            />
            : <LoginMsg />
            }
          </div>      
        </div>      
        <hr/>
        <p>{beer.description}</p>
        <p><b>Алкоголь:</b> {beer.abv}%</p>
        <p><b>Солод:</b> {Array.from(new Set(beer.ingredients.malt.map(malt => malt.name))).join(", ")}</p>
        <p><b>Хмель:</b> {Array.from(new Set(beer.ingredients.hops.map(hops => hops.name))).join(", ")}</p>
        <p><b>Дрожжи:</b> {beer.ingredients.yeast}</p>
        <p><b>Идеально сочетается с</b>: {beer.food_pairing.join(", ")}</p>
        <p><b>Цена:</b> ${beer.ph || 4.5}</p>
        {stock[beer.id] > 0 ? <p><b>В наличии:</b> {stock[beer.id]}</p> : null}        
      </div>
    </div>
  </div>
}