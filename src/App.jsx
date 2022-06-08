import React, { useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import { Product } from './pages/Product';
import { Home } from './pages/Home'
import { FourOhFour } from './pages/FourOhFour';
import { ErrorServer } from './pages/ErrorServer';
import { useDispatch, useSelector } from 'react-redux';
import { Basket } from './pages/Basket';
import { fetchBeers } from './redux/asyncActions/fetchBeers';
import { selectServer } from './redux/selectors';

export default function App() {
  const server = useSelector(selectServer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBeers());
  }, [])

  return (
    <HashRouter>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={!server.error ? <Home /> : <ErrorServer text={server.msg}/>} />
        <Route path="about" element={<About />} />
        <Route path="basket" element={<Basket />} />
        <Route path="beer/:beerId" element={<Product />} />
        <Route path="*" element={<FourOhFour />} />
      </Route>
    </Routes>
    </HashRouter>
  )
}
