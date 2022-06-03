import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import { Product } from './pages/Product';
import { Home } from './pages/Home'
import { FourOhFour } from './pages/FourOhFour';

export const AppContext = React.createContext()
let beersUrl = "https://api.punkapi.com/v2/beers?page=1&per_page=24";

function App() {
  const [basket, setBasket] = useState({
    amount: 0,
    total: 0
  })

  const [ stock, setStock ] = useState({})

  const [data, setData] = useState([])
  
  useEffect(() => {
    fetch(beersUrl)
    .then(response => response.json())
    .then(data => {
      setData(data);
      const stock = {};
      data.forEach(beer => { 
        stock[beer.id] = Math.floor(beer.srm) || 0
      })
      setStock(stock);
    })
  }, [])

  return (
    <AppContext.Provider value={{ 
      basket,
      setBasket,
      stock,
      setStock
      }} 
    >
      <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home data={data} />} />
          <Route path="about" element={<About />} />
          <Route path="beer/:beerId" element={<Product />} />
          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
      </HashRouter>
    </AppContext.Provider>
  )
}

export default App;
