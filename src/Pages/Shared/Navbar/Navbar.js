import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../../assets/images/Logo-1.png'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Navbar = () => {

    const { user, logOut, userData, isLoading } = useContext(AuthContext);
    console.log(user);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
        Navigate('/')
            .catch(err => console.error(err))
    }

    const menuItems = <React.Fragment>

        <li><Link to="/media">Media</Link></li>
        <li><Link to="/message">Message</Link></li>
        <li><Link to="/about">About</Link></li>

    </React.Fragment>

    return (
        <div className="navbar bg-orange-200 h-28">
            <div className="flex-1">

                <Link to='/' className="normal-case text-xl"><img className='w-36 h-28 ml-10' src={logo} alt="" srcset="" /></Link>
            </div>
            <div className="navbar-start hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="lg:hidden btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {menuItems}
                </ul>
            </div>
            <div className="flex-none">

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {user?.photoURL?
                              <>
                                <img alt='' src={user?.photoURL} />
                              </>
                              :
                              <>
                              <img alt='' src="https://placeimg.com/80/80/people"  />
                              </>
                            }
                            
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {/* <li>
                            <Link className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link>Settings</Link></li> */}
                        {user?.email ?
                            <>
                                <li>
                                    <Link className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link onClick={handleLogOut}>Logout</Link></li>
                            </>
                            :
                            <>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/register'>Register</Link></li>
                            </>
                        }


                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;