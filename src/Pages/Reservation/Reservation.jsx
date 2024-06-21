import { useState, useEffect } from 'react';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [testResultUrls, setTestResultUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    fetchReservations(); // Fetch reservations on component mount
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/bookings');
      setReservations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setError('Error fetching reservations. Please try again.');
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/bookings?email=${searchEmail}`);
      setReservations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error searching reservations:', error);
      setError('Error searching reservations. Please try again.');
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/${id}`, {
        status: 'Booked' // Update status to 'Booked'
      });

      // If successful, update local state to reflect the change
      const updatedReservations = reservations.map(reservation =>
        reservation._id === id ? { ...reservation, status: 'Booked' } : reservation
      );

      setReservations(updatedReservations);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      if (error.response) {
        console.error('Backend Response:', error.response.data);
        setError('Error cancelling reservation: ' + error.response.data.message);
      } else {
        setError('Unknown error occurred while cancelling reservation');
      }
    }
  };

  const handleTestResultChange = (id, value) => {
    setTestResultUrls(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitTestResult = async (id) => {
    const reservation = reservations.find(r => r._id === id);

    if (reservation.status === 'Delivered') {
      Swal.fire({
        title: 'Already Delivered',
        text: 'This test result has already been delivered.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      setLoading(true);
      const testResultUrl = testResultUrls[id];

      // Make API call to update reservation
      await axiosSecure.patch(`/bookings/${id}`, {
        testResultUrl,
        status: 'Delivered' // Update status to 'Delivered'
      });

      // If successful, update state to reflect the change
      const updatedReservations = reservations.map(reservation =>
        reservation._id === id ? { ...reservation, testResultUrl, status: 'Delivered' } : reservation
      );

      setReservations(updatedReservations);
      setTestResultUrls(prev => ({ ...prev, [id]: '' })); // Clear test result URL input for this reservation

      Swal.fire({
        title: 'Success!',
        text: 'Test result submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      setLoading(false);
    } catch (error) {
      console.error('Error submitting test result:', error);
      setError('Error submitting test result. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Reservations</h1>

      {/* Search by email */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 flex-1"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none">
          Search
        </button>
      </div>

      {/* List of reservations */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {reservations.length > 0 ? (
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{reservation.email}</td>
                  <td className="px-4 py-2">{reservation.status}</td>
                  <td className="px-4 py-2">
                    {reservation.status !== 'Blocked' && (
                      <>
                        {
                          reservation.status === 'Delivered' ? (
                            <button onClick={() => handleCancel(reservation._id)} className="px-4 py-2 bg-red-500 text-white rounded-md mr-2 hover:bg-red-600 focus:outline-none">
                              Cancel
                            </button>
                          ) : (
                            <button className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md mr-2 cursor-not-allowed focus:outline-none" disabled>
                              Not cancellable
                            </button>
                          )
                        }

                        <input
                          type="text"
                          placeholder="Test Result URL"
                          value={testResultUrls[reservation._id] || ''}
                          onChange={(e) => handleTestResultChange(reservation._id, e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-blue-500"
                          style={{ width: '200px' }}
                        />
                        
                        {
                          reservation.status !== 'Delivered' ? (
                            <button onClick={() => handleSubmitTestResult(reservation._id)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                              Submit Test Result
                            </button>
                          ) : (
                            <button disabled className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md mr-2 cursor-not-allowed focus:outline-none">
                              Submitted
                            </button>
                          )
                        }
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-center">No reservations found.</p>
        )}
      </div>
    </div>
  );
};

export default Reservation;
