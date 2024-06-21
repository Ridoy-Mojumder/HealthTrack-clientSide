import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import UseAxiosSecure from '../../../UseHook/UseAxiosSecure/UseAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios'; // Import axios for making HTTP requests
import PrivateRoute from '../../../Routes/PrivateRoute/PrivateRoute';

const ViewDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext); // Assuming AuthContext provides user details including userId
    const axiosSecure = UseAxiosSecure();
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTestDetails = async () => {
            try {
                const response = await axiosSecure.get(`/tests/${id}`);
                setTest(response.data);
            } catch (error) {
                console.error("Error fetching test details:", error);
                setError('Failed to load test details');
            } finally {
                setLoading(false);
            }
        };

        fetchTestDetails();
    }, [id, axiosSecure]);

    const handlePromoCodeApply = async () => {
        try {
            console.log("Applying promo code:", promoCode); // Log the promo code being applied
            const response = await axios.post('/apply-promo', { promoCode });
            console.log("Promo code response:", response.data); // Log the response from the backend
            const { discountRate } = response.data;

            if (discountRate > 0) {
                setDiscount(discountRate);
            } else {
                window.alert("Invalid promo code. Please try again.");
            }
        } catch (error) {
            console.error("Error applying promo code:", error);
            window.alert("Failed to apply promo code. Please try again.");
        }
    };

    const handleBookNow = () => {
        if (test.slots > 0) {
            setIsModalOpen(true);
        } else {
            alert("No slots available");
        }
    };

    const handlePayment = async () => {
        setPaymentProcessing(true);
        try {
            // Simulate payment processing - replace with actual Stripe integration
            // Here you would typically call Stripe API to process payment

            // Simulate successful payment
            const updatedTest = { ...test, slots: test.slots - 1 };
            setTest(updatedTest);

            // Create booking with user email
            const bookingData = {
                userId: user.id,
                email: user.email,
                testId: test._id,
                testName: test.testName,
                date: test.date,
                price: test.price - discount,
                status: 'Booked',
            };
            await axiosSecure.post('/api/bookings', bookingData);

            alert("Payment successful and booking confirmed!");
            setIsModalOpen(false); // Close modal after successful payment
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setPaymentProcessing(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // Optionally reset promo code and discount state here if needed
        setPromoCode('');
        setDiscount(0);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <ClipLoader color="#6B46C1" size={35} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-md">
                <p className="text-red-600 text-center">{error}</p>
            </div>
        );
    }

    if (!test) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-md">
                <p className="text-gray-600 text-center">Test not found</p>
            </div>
        );
    }

    return (
        <>
            <PrivateRoute>
                <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">{test.testName}</h1>
                    <img
                        src={test.imageUrl}
                        alt={test.testName}
                        className="w-full h-80 object-cover rounded-md mb-6"
                    />
                    <div className="text-gray-600 mb-4 space-y-2">
                        <p>{test.details}</p>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-2xl text-gray-800 font-semibold">${(test.price - discount).toFixed(2)}</p>
                        <p className="text-lg text-gray-500">{new Date(test.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    </div>
                    <p className="text-lg text-gray-500 mb-6">Slots Available: {test.slots}</p>
                    <button
                        onClick={handleBookNow}
                        className="w-full bg-purple-600 text-white py-3 px-4 rounded-md text-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        Book Now
                    </button>

                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                            <div className="relative w-auto max-w-3xl mx-auto my-6">
                                <div className="modal-content">
                                    <div className="p-4 bg-white rounded-lg shadow-lg text-left">
                                        <h2 className="text-2xl font-bold mb-4">Payment</h2>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Promo Code</label>
                                            <input
                                                type="text"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                className="w-full p-2 border rounded"
                                            />
                                            <button
                                                onClick={handlePromoCodeApply}
                                                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                            >
                                                Apply Promo Code
                                            </button>
                                        </div>
                                        <p className="text-xl font-semibold">Total: ${(test.price - discount).toFixed(2)}</p>
                                        <div className="mt-4 space-x-4 flex">
                                            <button
                                                onClick={handlePayment}
                                                disabled={paymentProcessing}
                                                className="w-full bg-green-600 text-white py-3 px-4 rounded-md text-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                {paymentProcessing ? 'Processing...' : 'Pay Now'}
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="w-full bg-gray-400 text-white py-3 px-4 rounded-md text-lg hover:bg-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </PrivateRoute>
        </>
    );
};

export default ViewDetails;
