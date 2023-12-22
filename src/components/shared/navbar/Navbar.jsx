import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        logOut()
            .then(res => console.log(res.user))
            .catch(err => console.error(err.message))
    }

    const navLinks = <>
        <li className='text-xl font-normal'><Link to={"/"}>Home</Link></li>
        <li className='text-xl font-normal'><Link to={"/dashboard"}>Dashboard</Link></li>
        {
            user && <>
                <li className='text-xl font-normal'><Link to={"/allTask"}>Tasks</Link></li>
            </>
        }
        <li className='text-xl font-normal'><Link to={"/about"}>About</Link></li>
        {
            !user ? <>
                <li className='text-xl font-normal'><Link to={"/signUp"}>Sign up</Link></li>
            </>
                : <>
                    <li className='text-xl font-normal'><Link to={"/signIn"}>Sign in</Link></li>
                </>
        }

    </>

    return (
        <div>
            <div className="navbar bg-[#47FC22] w-full px-10">
                <div className="text-white navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu text-[#0845F4] font-semibold rounded-xs menu-md dropdown-content bg-white mt-3 z-[1] p-2 shadow-xl w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="block text-left cursor-pointer font-lato" href='/'>
                        <h1 className='text-5xl italic font-extrabold'>TaskHub</h1>
                    </a>
                </div>
                <div className="hidden navbar-center lg:flex">
                    <ul className="px-1 space-x-3 font-bold text-white menu menu-horizontal">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <a onClick={handleSignOut} className="btn btn-outline font-btn hover:bg-[#47FC22] border-white">Sign out</a>
                            :
                            <a href='/SignIn' className="btn btn-outline font-btn hover:bg-[#47FC22] border-white">Sign in</a>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;