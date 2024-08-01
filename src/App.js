import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PropertyList from './components/Propertylist';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/properties" element={<PropertyList/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </div>
    );
};

export default App;
