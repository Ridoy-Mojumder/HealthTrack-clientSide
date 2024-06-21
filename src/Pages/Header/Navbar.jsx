import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        // Call logOut function from AuthContext
        logOut();
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center text-white hover:text-gray-300 mr-2">
                                <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                                <span className="ml-2 text-lg font-semibold">HealthTrack</span>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink to="/" exact activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
                                <NavLink to="/about" activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</NavLink>
                                <NavLink to="/services" activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</NavLink>
                                <NavLink to="/contact" activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</NavLink>
                                {
                                    user &&
                                    <NavLink to="dashboard" activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        <div className='flex justify-center items-center'>
                                            <svg className="h-6 w-6 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4v16c0 1.1.9 2 2 2h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2zm0 0h16M9 12l3 3m0 0l3-3m-3 3V8" />
                                            </svg>
                                            Dashboard
                                        </div>
                                    </NavLink>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {/* Conditional rendering of login/logout button */}
                            {user ? (
                                <button onClick={handleLogout} className="ml-4 bg-gray-800 p-1 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">Logout</button>
                            ) : (
                                <NavLink to="/login">
                                    <button className="ml-4 bg-gray-800 p-1 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">Login</button>
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen ? 'true' : 'false'}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, toggle classes based on menu state */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink to='/' href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</NavLink>
                    <NavLink to='/about' href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</NavLink>
                    <NavLink to='/services' href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</NavLink>
                    <NavLink to='/contact' href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</NavLink>
                    <NavLink to="dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</NavLink>
                    {user ? (
                        <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Logout</button>
                    ) : (
                        <NavLink to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
