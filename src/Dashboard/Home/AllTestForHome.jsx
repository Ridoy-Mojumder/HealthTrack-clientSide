import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure/UseAxiosSecure';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

const AllTestForHome = () => {
    const axiosSecure = UseAxiosSecure();
    const [tests, setTests] = useState([]);
    const [visibleTests, setVisibleTests] = useState(6); // State to track number of visible tests
    const [loading, setLoading] = useState(false); // State to track loading state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            setLoading(true); // Set loading state to true when fetching tests
            try {
                const response = await axiosSecure.get('/tests');
                setTests(response.data);
            } catch (error) {
                console.error("Error fetching tests:", error);
            } finally {
                setLoading(false); // Set loading state to false after fetching tests
            }
        };

        fetchTests();
    }, [axiosSecure]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const showMoreTests = () => {
        setVisibleTests(tests.length); // Show all tests
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Featured Tests</h1>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <ClipLoader color="#6B46C1" size={35} /> {/* Render spinner while loading */}
                </div>
            ) : (
                <div>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {tests.slice(0, visibleTests).map(test => (
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
                        ))}
                    </div>
                    {visibleTests < tests.length && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={showMoreTests}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Show More
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllTestForHome;
