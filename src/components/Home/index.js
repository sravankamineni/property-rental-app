import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css"


const Home = () => {
    return (
        <div className='home-app'>
            <div className="home-cont">
                <h1 className='head'>Welcome to Rentally</h1>
                <Link className='link-none' to="/properties">
                    <button className='btn btn-danger'>Expolore Properties</button>
                </Link>
            </div>
        </div>
       

    );
};

export default Home;
