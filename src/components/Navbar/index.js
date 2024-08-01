import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css"

const Navbar = () => {
    return (
        <div className="navbar-cont">
            <div className="navbar-left">
                <img src="https://www.shutterstock.com/image-vector/property-logos-template-260nw-774486358.jpg" alt="Logo" className="logo" />
                <span className="logo-name">Rentally</span>

            </div>
            <ul className="navbar-middle">
                <Link className='link-none' to="/"><li className='nav-lst-item'>Home</li></Link>
                <Link className='link-none' to="/properties"><li className='nav-lst-item'>Listings</li></Link>
                <Link className='link-none' to="/cart"><li className='nav-lst-item'>Cart</li></Link>
            </ul>
            <div className="navbar-right">
                <Link className='link-none' to="/properties"><button className="book-now-btn">Book Now</button></Link>

            </div>
        </div>
        
    );
};

export default Navbar;
