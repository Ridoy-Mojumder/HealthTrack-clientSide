import { useState } from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure/UseAxiosSecure';

const AddTest = () => {
    const axiosSecure = UseAxiosSecure();
    const [testData, setTestData] = useState({
        testName: '',
        imageUrl: '',
        details: '',
        price: '',
        date: '',
        slots: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setTestData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { testName, imageUrl, details, price, date, slots } = testData;
        const newTest = { testName, imageUrl, details, price, date, slots };

        try {
            const response = await axiosSecure.post('/tests', newTest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Test Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                // Clear form data
                setTestData({
                    testName: '',
                    imageUrl: '',
                    details: '',
                    price: '',
                    date: '',
                    slots: ''
                });
            }
        } catch (error) {
            console.error("Error adding test:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error adding test",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Test</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="testName" className="block text-sm font-medium text-gray-700">
                        Test Name
                    </label>
                    <input
                        id="testName"
                        name="testName"
                        type="text"
                        value={testData.testName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        placeholder="Enter test name"
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        value={testData.imageUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        placeholder="Enter image URL"
                    />
                </div>
                <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                        Details
                    </label>
                    <textarea
                        id="details"
                        name="details"
                        value={testData.details}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        placeholder="Enter test details"
                    ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            value={testData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                            placeholder="Enter test price"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={testData.date}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="slots" className="block text-sm font-medium text-gray-700">
                        Slots
                    </label>
                    <input
                        id="slots"
                        name="slots"
                        type="number"
                        value={testData.slots}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        placeholder="Enter number of slots"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Add Test
                </button>
            </form>
        </div>
    );
};

export default AddTest;
