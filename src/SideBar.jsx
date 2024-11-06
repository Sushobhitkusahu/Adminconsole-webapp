import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faWarehouse, faArrowRightFromBracket, faUsers, faBox, faBars,faDesktop } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/krishiverse_with_leaves.png';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
            setUserRole(storedRole);
        }
        setLoading(false);
    }, []);
    
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    if (loading) return null;
    return (
        <>
            {/* Hamburger Menu for tablet and mobile view */}
            <button className="fixed top-4 left-4 lg:hidden z-20" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>

            {/* Sidebar */}
            <div className={`lg:w-64  bg-[#2F2F2F] shadow-lg  h-full fixed lg:static top-0 transition-transform duration-300 z-10 ${isOpen ? 'translate-x-0' : '-translate-x-64 lg:translate-x-0'}`}>
                <div className="flex items-center justify-center px-4 py-4 ">
                    <a href="https://adminconsole-webapp.onrender.com">
                    <img src={logo} alt="Logo" className="h-12  w-32 mx-auto lg:mx-0 object-contain" />
                    </a>
                    
                </div>
                <hr/>
                <ul className="mt-6  text-sm space-y-2 ">
                    <li className="px-4 py-2 text-white hover:bg-gray-200  hover:rounded-xl m-1">
                        <NavLink
                            to="device-data"
                            className={({ isActive }) =>
                                isActive ? "text-blue-500 block" : " block text-white hover:text-black"
                            }
                        >
                            <FontAwesomeIcon icon={faDatabase} className="h-4  inline-block pr-3" /> Device Data
                        </NavLink>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-xl m-1">
                        <NavLink
                            to="device-registration"
                            className={({ isActive }) =>
                                isActive ? "text-blue-500 block" : "text-white block hover:text-black"
                            }
                        >
                            <FontAwesomeIcon icon={faDesktop} className="h-4 inline-block  pr-2" /> Device Registration
                        </NavLink>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-xl m-1">
                        <NavLink
                            to="user-data"
                            className={({ isActive }) =>
                                isActive ? "text-blue-500 block" : "text-white block hover:text-black"
                            }
                        >
                            <FontAwesomeIcon icon={faUsers} className="h-4 inline-block pr-2" /> User Data
                        </NavLink>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-xl m-1">
                        <NavLink
                            to="order"
                            className={({ isActive }) =>
                                isActive ? "text-blue-500 block" : "text-white block hover:text-black"
                            }
                        >
                            <FontAwesomeIcon icon={faBox} className="h-4 inline-block pr-3" /> Order Management
                        </NavLink>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-xl m-1">
                        <NavLink
                            to="stock"
                            className={({ isActive }) =>
                                isActive ? "text-blue-500 block" : "text-white block hover:text-black"
                            }
                        >
                            <FontAwesomeIcon icon={faWarehouse} className="h-4 inline-block pr-2" /> Stock Management
                        </NavLink>
                    </li>
                    {/* Authorization Link for Admin and Manager Only */}
                    {(userRole === 'admin' || userRole === 'manager') && (
                        <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-xl m-1">
                            <NavLink
                                to="authorization"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500 block" : "text-white block hover:text-black"
                                }
                            >
                                <FontAwesomeIcon icon={faUsers} className="h-4 inline-block pr-2" /> Authorization
                            </NavLink>
                        </li>
                    )}
                    <hr/>
                    <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-xl m-1">
                        <NavLink
                            to="logout"
                            className={({ isActive }) =>
                                isActive ? "text-red-500 block" : "text-red-600 block"
                            }
                        >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-4 inline-block pr-3" /> Log Out
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/*  to close the sidebar on tablet and mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-5 lg:hidden"
                    onClick={toggleSidebar}
                >
                    
                </div>
            )}
        </>
    );
};

export default Sidebar;


