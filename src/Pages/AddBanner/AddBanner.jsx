import { useState } from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure/UseAxiosSecure';

const AddBanner = () => {
    const axiosSecure = UseAxiosSecure();
    const [bannerData, setBannerData] = useState({
        title: '',
        imageUrl: '',
        text: '',
        couponCode: '',
        discountRate: '',
        active: false,
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setBannerData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddBanner = async e => {
        e.preventDefault();
        const { title, imageUrl, text, couponCode, discountRate, active } = bannerData;
        const newBanner = { title, imageUrl, text, couponCode, discountRate, active };

        // Basic validation
        if (!title || !imageUrl || !text || !couponCode || !discountRate) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "All fields are required",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        try {
            const response = await axiosSecure.post('/banners', newBanner, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Banner Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                // Clear form data
                setBannerData({
                    title: '',
                    imageUrl: '',
                    text: '',
                    couponCode: '',
                    discountRate: '',
                    active: false,
                });
            }
        } catch (error) {
            console.error("Error adding banner:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error adding banner",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Banner</h1>
            <form className="space-y-4" onSubmit={handleAddBanner}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={bannerData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        placeholder="Enter banner title"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={bannerData.imageUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        placeholder="Enter image URL"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Text</label>
                    <textarea
                        name="text"
                        value={bannerData.text}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        placeholder="Enter banner text"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
                    <input
                        type="text"
                        name="couponCode"
                        value={bannerData.couponCode}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        placeholder="Enter coupon code"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Discount Rate</label>
                    <input
                        type="number"
                        name="discountRate"
                        value={bannerData.discountRate}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        placeholder="Enter discount rate"
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="active"
                        checked={bannerData.active}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <label className="ml-2 text-sm text-gray-700 font-medium">Active</label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Add Banner
                </button>
            </form>
        </div>
    );
};

export default AddBanner;
