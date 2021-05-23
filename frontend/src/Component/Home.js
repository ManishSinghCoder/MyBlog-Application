import React from 'react'
import { Link } from 'react-router-dom'
import './All.css'

const Home = () => (
    <div className='container' id="home">
        <div class='jumbotron mt-5' id="hom">
            <h1 class='display-4'>Welcome to My Blog App</h1>
            <hr class='my-4' />
            <p>Click the Log In button</p>
            <Link class='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
        </div>
       
    </div>
);

export default Home;
