import React from 'react';
import error from "../../../assets/error.png"
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center mt-10'>
            <img src={error} className='h-[450px] m-auto w-[900px] mb-10' alt="Error" />
            <Link to={"/"}><button className='btn font-btn hover:bg-[#47FC22]'>Back Home</button></Link>
        </div>
    );
};

export default ErrorPage;