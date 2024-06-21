import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';
import UseAxiosSecure from '../../../UseHook/UseAxiosSecure/UseAxiosSecure';

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const {user} = useContext(AuthContext)
  const axiosSecure = UseAxiosSecure()

  useEffect(() => {
    // Fetch upcoming appointments from an API endpoint
    const fetchAppointments = async () => {
      try {
        // Replace with your actual API call
        const response = await axiosSecure.get('/bookings');
        //console.log(response.data)
        const filteredAppointments = response.data.filter(appointment => {
          return appointment.email === user.email && appointment.status === 'Booked';
        });
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [user.email, axiosSecure]);

  const handleCancel = (appointmentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this appointment?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Replace with your actual API call
          await axiosSecure.delete(`/bookings/${appointmentId}`);
          setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
          Swal.fire('Cancelled!', 'Your appointment has been cancelled.', 'success');
        } catch (error) {
          console.error('Error cancelling appointment:', error);
          Swal.fire('Error!', 'There was an error cancelling your appointment.', 'error');
        }
      }
    });
  };
//console.log(appointments)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Appointments</h1>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map(appointment => (
            <div key={appointment._id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2">{appointment.testName}</h2>
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Time:</strong> {new Date(appointment.date).toLocaleTimeString()}
              </p>
              <button
                onClick={() => handleCancel(appointment._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md mt-2 hover:bg-red-600 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
