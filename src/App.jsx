import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import { Product } from './pages/Product';
import { Home } from './pages/Home'
import { FourOhFour } from './pages/FourOhFour';
import { ErrorServer } from './pages/ErrorServer';

export const AppContext = React.createContext()
let beersUrl = "https://api.punkapi.com/v2/beers?page=1&per_page=24";

function App() {
  const [basket, setBasket] = useState({
    amount: 0,
    total: 0
  })

  const [stock, setStock] = useState({})
  const [isAuthed, setIsAuthed] = useState(false)
  const [serverOk, setServerOk] = useState(true)
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch(beersUrl)
    .then(response => {
      if (!response.ok) {
        setServerOk(false);
      } else {
        return response.json()
      }
    })
    .then(data => {
      try {
      setData(data);
      const stock = {};
      data.forEach(beer => { 
        stock[beer.id] = Math.floor(beer.srm) || 0
      })
      setStock(stock);
    } catch(e) {
      console.log(e)
    }})
  }, [])

  return (
    <AppContext.Provider value={{ 
      basket,
      setBasket,
      stock,
      setStock,
      isAuthed,
      setIsAuthed
      }} 
    >
      <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={serverOk?<Home data={data} /> : <ErrorServer />} />
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
