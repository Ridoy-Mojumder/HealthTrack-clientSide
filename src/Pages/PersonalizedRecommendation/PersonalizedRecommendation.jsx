import { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UseAxiosSecure from '../../UseHook/UseAxiosSecure/UseAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { ClipLoader } from 'react-spinners';

const PersonalizedRecommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [expandedIndex, setExpandedIndex] = useState(null); // State for tracking which item is expanded
    const axiosSecure = UseAxiosSecure();
    const { user } = useContext(AuthContext); // Assuming AuthContext provides the user
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecommendations();
    }, []);
    
    const fetchRecommendations = async () => {
        try {
            const response = await axiosSecure.get('/recommendations');
            setRecommendations(response.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            showAlert('Error fetching recommendations', 'error');
        }
    };

    const handleAddRecommendation = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosSecure.post('/recommendations', { title, description, imageURL });
            setRecommendations([...recommendations, response.data]);
            setTitle('');
            setDescription('');
            setImageURL('');
            showAlert('Recommendation added successfully', 'success');
        } catch (error) {
            console.error('Error adding recommendation:', error);
            showAlert('Error adding recommendation', error.response?.data?.message || 'error');
        }
    };

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => {
            setAlert({ show: false, message: '', type: '' });
        }, 3000);
    };

    const handleReadMore = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <ClipLoader color="#4F46E5" loading={loading} size={50} />
            </div>
        );
    }



    return (
        <div className="container mx-auto p-4">
            {alert.show && (
                <div className={`mb-4 p-4 rounded ${alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {alert.message}
                </div>
            )}
            <h2 className="text-3xl font-bold mb-4">Personalized Recommendations</h2>
            <div className="mb-8">
                <Slider {...settings}>
                    {recommendations.map((rec, index) => (
                        <div key={index} className="p-4">
                            <div className="p-4 bg-white shadow-lg rounded-lg h-full flex flex-col justify-between">
                                <div>
                                    {rec.imageURL && (
                                        <img src={rec.imageURL} alt={rec.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                                    )}
                                    <h3 className="text-xl font-semibold mb-2">{rec.title}</h3>
                                    <p className="text-gray-600">
                                        {expandedIndex === index ? rec.description : `${rec.description.substring(0, 100)}...`}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleReadMore(index)}
                                        className="py-1 px-3 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 focus:outline-none"
                                    >
                                        {expandedIndex === index ? 'Show Less' : 'Read More'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            {
                role === 'admin' && <>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Add a New Recommendation</h3>
                        <form onSubmit={handleAddRecommendation} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    value={imageURL}
                                    onChange={(e) => setImageURL(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add Recommendation
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            }
        </div>
    );
};

export default PersonalizedRecommendation;
