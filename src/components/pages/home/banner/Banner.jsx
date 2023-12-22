import React from 'react';
import banner from '../../../../assets/banner.png'
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="mb-10 hero">
            <div className="flex-col hero-content lg:flex-row-reverse">
                <img src={banner} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Manage your Tasks</h1>
                    <p className="py-6">Get a task, Complete it and drag and drop here.</p>
                    <Link to={"/dashboard"}>
                        <button className="bg-[#47FC22] text-white font-bold rounded-md px-3 py-2">Let's Explore</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;