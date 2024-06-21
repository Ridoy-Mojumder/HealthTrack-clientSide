import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../../UseHook/UseAxiosPublic/UseAxiosPublic';

// Example loading spinner component
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    );
};

const HomeForBanner = () => {
    const axiosPublic = UseAxiosPublic();
    const [activeBanner, setActiveBanner] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActiveBanner = async () => {
            try {
                const response = await axiosPublic.get('/banners');
                const banners = response.data;
                const activeBanner = banners.find(banner => banner.active);
                setActiveBanner(activeBanner);
            } catch (error) {
                console.error("Error fetching banners:", error);
                // Handle error as needed
            } finally {
                setLoading(false); // Set loading to false regardless of success or error
            }
        };

        fetchActiveBanner();
    }, [axiosPublic]);

    return (
        <div className="bg-white">
            {loading ? ( // Show loading spinner if loading is true
                <LoadingSpinner />
            ) : activeBanner ? (
                <div className="keen-slider relative">
                    <div className="keen-slider__slide w-full" style={{ height: '500px' }}>
                        <div className="relative h-full w-full">
                            <img className="absolute inset-0 w-full h-full object-cover" src={activeBanner.imageUrl} alt={activeBanner.title} />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-8">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">{activeBanner.title}</h2>
                                <p className="text-lg md:text-xl font-semibold mb-6">{activeBanner.text}</p>
                                <p className="text-lg md:text-xl font-semibold mb-6">Coupon Code: {activeBanner.couponCode}</p>
                                <p className="text-lg md:text-xl font-semibold mb-6">Discount Rate: {activeBanner.discountRate}%</p>
                                <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-full" onClick={() => navigate('dashboard/all-tests')}>
                                    Go to All Tests
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-gray-800">No active banner available.</div>
            )}
        </div>
    );
};

export default HomeForBanner;
