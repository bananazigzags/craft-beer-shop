import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import { About } from './pages/About';
import Navbar from './components/Navbar';
import Product from './pages/Product';
import { Home } from './pages/Home'
import { FourOhFour } from './pages/FourOhFour';
import { ErrorServer } from './pages/ErrorServer';
import { connect } from 'react-redux';
import { beersUrl } from './util/constants'
import { setStock } from './redux/actions'

function App({setStock}) {
  const [serverOk, setServerOk] = useState(true)
  const [data, setData] = useState(null)
    
  useEffect(() => {
    fetch(`${beersUrl}?page=1&per_page=24`)
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
      const newStock = {};
      data.forEach(beer => { 
        newStock[beer.id] = Math.floor(beer.srm) || 0
      })
      setStock(newStock);
    } catch(e) {
      console.log(e)
    }})
  }, [])

  return (
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
  )
}

const mapDispatchToProps = {
  setStock
}

export default connect(null, mapDispatchToProps)(App)
