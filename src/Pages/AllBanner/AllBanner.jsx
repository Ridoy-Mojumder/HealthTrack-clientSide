import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure/UseAxiosSecure';
import { ClipLoader } from 'react-spinners';

const AllBanner = () => {
    const axiosSecure = UseAxiosSecure();
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const response = await axiosSecure.get('/banners');
                setBanners(response.data);
            } catch (error) {
                console.error("Error fetching banners:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch banners',
                    timer: 1500
                });
            } finally {
                setLoading(false); // Set loading to false after data fetching completes
            }
        };

        fetchBanners();
    }, [axiosSecure]);

    const handleDeleteBanner = async (id) => {
        try {
            const response = await axiosSecure.delete(`/banners/${id}`);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Banner Deleted Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Remove deleted banner from state
                setBanners(prevBanners => prevBanners.filter(banner => banner._id !== id));
            }
        } catch (error) {
            console.error("Error deleting banner:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete banner',
                timer: 1500
            });
        }
    };

    const handleSetActive = async (id) => {
        try {
            await axiosSecure.patch(`/banners/${id}/active`, { active: true });

            // Update isActive state locally
            setBanners(prevBanners => prevBanners.map(banner => ({
                ...banner,
                active: banner._id === id ? true : false
            })));

            Swal.fire({
                icon: 'success',
                title: 'Home Banner Set Successfully',
                showConfirmButton: false,
                timer: 1500
            });

        } catch (error) {
            console.error("Error setting active banner:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to set home banner',
                timer: 1500
            });
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">All Banners</h1>
            {loading ? (
                <div className="flex items-center justify-center">
                    <ClipLoader color="#4F46E5" loading={loading} size={35} />
                </div>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {banners.map(banner => (
                            <tr key={banner._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{banner.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <img src={banner.imageUrl} alt={banner.title} className="h-12" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                    <button
                                        onClick={() => handleSetActive(banner._id)}
                                        className={`text-indigo-600 hover:text-indigo-900 ${banner.active ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={banner.active}
                                    >
                                        Set as Home Banner
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBanner(banner._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllBanner;
