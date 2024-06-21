import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure/UseAxiosSecure';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

const AllTest = () => {
    const axiosSecure = UseAxiosSecure();
    const [tests, setTests] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [loading, setLoading] = useState(false); // State to track loading state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            setLoading(true); // Set loading state to true when fetching tests
            try {
                const response = await axiosSecure.get('/tests');
                //const futureTests = response.data.filter(test => new Date(test.date) >= new Date());
                setTests(response.data);
            } catch (error) {
                console.error("Error fetching tests:", error);
            } finally {
                setLoading(false); // Set loading state to false after fetching tests
            }
        };

        fetchTests();
    }, [axiosSecure]);

    const handleSearch = () => {
        const filteredTests = tests.filter(test => new Date(test.date).toLocaleDateString() === new Date(searchDate).toLocaleDateString());
        setTests(filteredTests);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">All Tests</h1>
            <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-4">Search by Date</label>
                <input
                    type="date"
                    value={searchDate}
                    onChange={e => setSearchDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                />
                <button
                    onClick={handleSearch}
                    className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Search
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <ClipLoader color="#6B46C1" size={35} /> {/* Render spinner while loading */}
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {tests.length > 0 ? (
                        tests.map(test => (
                            <div
                                key={test._id}
                                className="overflow-hidden bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-xl"
                            >
                                <img
                                    src={test.imageUrl}
                                    alt={test.testName}
                                    className="w-full h-56 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2 text-gray-800">{test.testName}</h2>
                                    <p className="text-gray-600 mb-4">{test.details}</p>
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-gray-800 font-semibold">${test.price}</p>
                                        <p className="text-gray-500">{formatDate(test.date)}</p>
                                    </div>
                                    <p className="text-gray-500 mb-4">Slots: {test.slots}</p>
                                    <button
                                        onClick={() => navigate(`/viewDetails/${test._id}`)}
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No tests available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllTest;
