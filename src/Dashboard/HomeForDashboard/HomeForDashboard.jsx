import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    FaBars, FaCalendarAlt, FaChartBar, FaClipboardCheck, FaFileAlt, FaHome,
    FaImage, FaImages, FaListAlt, FaPhone, FaPlusSquare, FaStore, FaUserAlt, FaUsers
} from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure/UseAxiosSecure';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners
import { Helmet } from 'react-helmet'; // Import Helmet

const HomeForDashboard = () => {
    const { user } = useContext(AuthContext); // Assuming AuthContext provides the user
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = UseAxiosSecure(); // Custom hook for secure axios instance

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axiosSecure.get(`/users/role/${user.email}`);
                setRole(response.data.role);
            } catch (error) {
                console.error('Error fetching user role:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [user, axiosSecure]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <ClipLoader color="#4F46E5" loading={loading} size={50} />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-200">
            <Helmet>
                <title>Dashboard - HealthTrack Diagnostic Center</title>
                <meta name="description" content="Welcome to your dashboard at HealthTrack Diagnostic Center. Manage your profile, appointments, and view test results." />
            </Helmet>

            {/* Sidebar navigation */}
            <div className="w-64 bg-white shadow-lg flex-shrink-0">
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
                    <ul className="space-y-2">
                        {role === 'admin' ? (
                            <>
                                <NavItem to='/dashboard/allUsers' icon={FaUsers}>All Users</NavItem>
                                <NavItem to='/dashboard/add-test' icon={FaPlusSquare}>Add Test</NavItem>
                                <NavItem to='/dashboard/all-tests' icon={FaListAlt}>All Tests</NavItem>
                                <NavItem to='/dashboard/reservation' icon={FaClipboardCheck}>Reservation</NavItem>
                                <NavItem to='/dashboard/add-banner' icon={FaImage}>Add Banner</NavItem>
                                <NavItem to='/dashboard/all-banners' icon={FaImages}>All Banners</NavItem>
                                <NavItem to='/dashboard/statistics' icon={FaChartBar}>Statistics</NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem to='/dashboard/my-profile' icon={FaUserAlt}>My Profile</NavItem>
                                <NavItem to='/dashboard/upcoming-appointments' icon={FaCalendarAlt}>Upcoming Appointments</NavItem>
                                <NavItem to='/dashboard/test-results' icon={FaFileAlt}>Test Results</NavItem>
                            </>
                        )}
                    </ul>
                </div>

                <div className="mt-auto border-t border-gray-300 p-4">
                    <ul className="space-y-2">
                        <NavItem to='/' icon={FaHome}>Home</NavItem>
                        <NavItem to='/about' icon={FaBars}>About</NavItem>
                        <NavItem to='/services' icon={FaStore}>Service</NavItem>
                        <NavItem to='/contact' icon={FaPhone}>Contact</NavItem>
                    </ul>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>
                <p className="text-lg text-gray-600">Explore the dashboard using the sidebar navigation.</p>

                {/* Outlet to render nested routes */}
                <Outlet />
            </div>
        </div>
    );
};

const NavItem = ({ to, icon: Icon, children }) => (
    <li>
        <NavLink to={to} activeClassName="bg-indigo-500 text-white" className="flex items-center py-3 px-4 rounded-md hover:bg-indigo-500 transition duration-200">
            <Icon className="mr-3" />
            <span className="text-lg">{children}</span>
        </NavLink>
    </li>
);

export default HomeForDashboard;
