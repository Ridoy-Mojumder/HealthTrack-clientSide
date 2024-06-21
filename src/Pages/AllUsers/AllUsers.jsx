import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaStar, FaUserShield, FaUserPlus, FaInfoCircle, FaFilePdf } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../UseHook/UseAxiosSecure/UseAxiosSecure";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root'); // or your root element

const AllUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null);

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: 'Make Admin',
            text: `Are you sure you want to make ${user.name} an admin?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4CAF50',
            cancelButtonColor: '#f44336',
            confirmButtonText: 'Yes, make admin'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/admin/${user._id}`);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Success!',
                            `${user.name} has been made an admin.`,
                            'success'
                        );
                    }
                } catch (error) {
                    console.error('Error making user admin:', error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while making the user an admin.',
                        'error'
                    );
                }
            }
        });
    };

    const handleDelete = async (user) => {
        Swal.fire({
            title: 'Delete User',
            text: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f44336',
            cancelButtonColor: '#607D8B',
            confirmButtonText: 'Yes, delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/users/${user._id}`);
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        `${user.name} has been deleted.`,
                        'success'
                    );
                } catch (error) {
                    console.error('Error deleting user:', error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while deleting the user.',
                        'error'
                    );
                }
            }
        });
    };

    const handleViewInfo = (user) => {
        setSelectedUser(user);
    };

    const handleChangeStatus = async (user) => {
        const newStatus = user.status === 'active' ? 'blocked' : 'active';
        Swal.fire({
            title: 'Change User Status',
            text: `Are you sure you want to change the status of ${user.name} to ${newStatus}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4CAF50',
            cancelButtonColor: '#f44336',
            confirmButtonText: 'Yes, change status'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/status/${user._id}`, { status: newStatus });
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Success!',
                            `${user.name}'s status has been changed to ${newStatus}.`,
                            'success'
                        );
                    }
                } catch (error) {
                    console.error('Error changing user status:', error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while changing the user status.',
                        'error'
                    );
                }
            }
        });
    };

    const handleDownloadPDF = async (user) => {
        try {
            // Fetch user details including tests
            const res = await axiosSecure.get(`/users/${user._id}/details`);
            const userDetails = res.data;
    
            // Initialize PDF document
            const doc = new jsPDF();
    
            // Title
            doc.setFontSize(16);
            doc.text("User Details", 20, 15);
    
            // User Information Section
            doc.setFontSize(12);
            doc.text(`Name: ${userDetails.name}`, 20, 30);
            doc.text(`Email: ${userDetails.email}`, 20, 40);
            doc.text(`Role: ${userDetails.role}`, 20, 50);
            doc.text(`District: ${userDetails.district}`, 20, 60); // Add district
            doc.text(`Upazila: ${userDetails.upazila}`, 20, 70); // Add upazila
            doc.text(`Blood Group: ${userDetails.bloodGroup}`, 20, 80); // Add blood group
    
            // Tests Section
            doc.text("Tests:", 20, 90);
    
            // Define table columns and extract rows from userDetails.tests
            const columns = ["Test Name", "Date", "Price", "Delivery Status"];
            const rows = userDetails.tests.map(test => [
                test.testName,
                new Date(test.date).toLocaleDateString(),
                `$${test.price.toFixed(2)}`, // Format price as currency
                test.deliveryStatus ? "Delivered" : "Pending" // Assuming deliveryStatus is a boolean
            ]);
    
            // Generate table with autoTable plugin
            doc.autoTable(columns, rows, {
                startY: 100
            });
    
            // Save PDF with user's name
            doc.save(`${userDetails.name}_details.pdf`);
        } catch (error) {
            console.error('Error downloading user details:', error);
            // Display error using SweetAlert or any other alert library
            Swal.fire(
                'Error!',
                'An error occurred while downloading the user details.',
                'error'
            );
        }
    };
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-800 text-white">
                    <h3 className="text-lg font-bold leading-6">All Users</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <FaStar className="inline-block mr-1 align-middle" /> #
                                </th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Role</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {users.map((user, index) => (
                                <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td className="py-3 px-6">{user.name}</td>
                                    <td className="py-3 px-6">{user.email}</td>
                                    <td className="py-3 px-6">
                                        {user.role === 'admin' ? (
                                            <span className="inline-flex items-center px-2 py-1 bg-green-500 rounded-full text-white text-xs uppercase font-bold">
                                                <FaUserShield className="mr-1" /> Admin
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="text-white bg-blue-500 px-2 py-1 rounded-md text-xs hover:bg-blue-600"
                                            >
                                                <FaUserPlus className="mr-1" /> Make Admin
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-3 px-6">
                                        {user.status === 'active' ? (
                                            <span className="inline-flex items-center px-2 py-1 bg-green-500 rounded-full text-white text-xs uppercase font-bold">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 bg-red-500 rounded-full text-white text-xs uppercase font-bold">
                                                Blocked
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 space-x-2">
                                        <button
                                            onClick={() => handleViewInfo(user)}
                                            className="text-white bg-gray-500 px-2 py-1 rounded-md text-xs hover:bg-gray-600"
                                        >
                                            <FaInfoCircle className="mr-1" /> See Info
                                        </button>
                                        <button
                                            onClick={() => handleDownloadPDF(user)}
                                            className="text-white bg-red-500 px-2 py-1 rounded-md text-xs hover:bg-red-600"
                                        >
                                            <FaFilePdf className="mr-1" /> Download PDF
                                        </button>
                                        <button
                                            onClick={() => handleChangeStatus(user)}
                                            className="text-white bg-yellow-500 px-2 py-1 rounded-md text-xs hover:bg-yellow-600"
                                        >
                                            {user.status === 'active' ? 'Block' : 'Unblock'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user)}
                                            className="text-white bg-red-500 px-2 py-1 rounded-md text-xs hover:bg-red-600"
                                        >
                                            <FaTrash className="mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-1/2">
                        {/* Header */}
                        <div className="px-6 py-4 bg-gray-800 text-white">
                            <h3 className="text-lg font-bold leading-6">User Information</h3>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-center">
                                <img
                                    className="h-20 w-20 rounded-full object-cover"
                                    src={selectedUser.photoURL}
                                    alt={`${selectedUser.name}'s photo`}
                                />
                            </div>
                            <div className="mt-4">
                                <p><strong>Name:</strong> {selectedUser.name}</p>
                                <p><strong>Email:</strong> {selectedUser.email}</p>
                                <p><strong>Role:</strong> {selectedUser.role}</p>
                                <p><strong>Status:</strong> {selectedUser.status}</p>
                                <p><strong>Blood Group:</strong> {selectedUser.bloodGroup}</p>
                                <p><strong>Location:</strong> {selectedUser.upazila}, {selectedUser.district}</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-200 flex justify-end">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="text-white bg-gray-500 px-3 py-1 rounded-md text-sm hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AllUsers;
