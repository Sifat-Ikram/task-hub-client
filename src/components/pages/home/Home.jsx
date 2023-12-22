import React from 'react';
import Navbar from '../../shared/navbar/Navbar';
import Footer from '../../shared/footer/Footer';
import Banner from './banner/Banner';

const Home = () => {
    return (
        <div className='w-4/5 mx-auto'>
            <Banner></Banner>
        </div>
    );
};

export default Home;