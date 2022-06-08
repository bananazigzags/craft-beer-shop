import { Products } from "../components/Products";
import { useSelector } from "react-redux";
import { selectBeers } from "../redux/selectors";
import "./styles/Home.css"

const Home = () => {
  const beers = useSelector(selectBeers)
  return beers &&
    <div className="products">     
      <Products collection={beers} />
    </div>
}

export { Home }