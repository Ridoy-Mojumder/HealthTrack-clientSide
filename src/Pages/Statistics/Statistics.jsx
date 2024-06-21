import { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UseAxiosSecure from '../../UseHook/UseAxiosSecure/UseAxiosSecure';

const Statistics = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axiosSecure.get('/bookings'); // Adjust URL as per your backend API
      console.log('Fetched bookings:', response.data); // Log fetched bookings
      setBookings(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Calculate service counts for the Pie chart
  const calculateServiceCounts = () => {
    const serviceCounts = {};
    bookings.forEach((booking) => {
      const serviceName = booking.service; // Assuming service name is stored in 'service' field
      if (serviceCounts[serviceName]) {
        serviceCounts[serviceName]++;
      } else {
        serviceCounts[serviceName] = 1;
      }
    });

    return Object.entries(serviceCounts).map(([name, count], index) => ({
      name,
      value: count,
      fill: colors[index % colors.length],
    }));
  };

  // Calculate delivery status for the Bar chart
  const calculateDeliveryStatus = () => {
    const deliveryCounts = {
      pending: 0,
      completed: 0,
    };

    bookings.forEach((booking) => {
      if (booking.status === 'Booked') { // Corrected from 'Booked' to 'pending'
        deliveryCounts.pending++;
      } else if (booking.status === 'Delivered') {
        deliveryCounts.completed++;
      }
    });

    return [
      { name: 'Pending', value: deliveryCounts.pending, fill: '#FF5733' }, // Adjust colors as needed
      { name: 'Completed', value: deliveryCounts.completed, fill: '#33FF69' }, // Adjust colors as needed
    ];
  };

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733', '#33FF69'];

  return (
    <div>
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">Service Bookings</h1>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={calculateServiceCounts()} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {calculateServiceCounts().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">Service Delivery Ratio</h1>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={calculateDeliveryStatus()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {calculateDeliveryStatus().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
