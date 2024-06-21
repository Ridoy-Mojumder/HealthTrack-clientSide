import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import UseAxiosSecure from '../../../UseHook/UseAxiosSecure/UseAxiosSecure';
import axios from 'axios';
import { BarLoader } from 'react-spinners'; // Importing BarLoader from react-spinners

const TestResults = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading state
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await axiosSecure.get('/bookings');
        const filteredResults = response.data.filter(result => {
          return result.email === user.email && result.status === 'Delivered';
        });
        setTestResults(filteredResults);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching test results:', error);
      }
    };

    fetchTestResults();
  }, [user.email, axiosSecure]);

  const handleDownload = async (resultId, resultName) => {
    try {
      // Replace with your actual download endpoint
      const downloadUrl = `/test-results/${resultId}/download`;
      const response = await axios.get(downloadUrl, {
        responseType: 'blob', // Important: responseType 'blob' for binary data
        headers: {
          Authorization: `Bearer ${axiosSecure.token}` // Assuming you need authorization token
        }
      });

      // Create a blob object from the response data
      const blob = new Blob([response.data], { type: response.data.type });

      // Create a link element, set its href and download attributes, and click it programmatically
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${resultName}.pdf`; // File name
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading test result:', error);
    }
  };

  const handlePrint = (resultId) => {
    // Simulate printing functionality
    console.log(`Printing test result with ID: ${resultId}`);
    // Replace with actual print logic, e.g., opening a print dialog
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Results</h1>
      {loading ? ( // Render spinner while loading
        <div className="flex justify-center items-center h-64">
          <BarLoader color="#4A90E2" loading={loading} size={50} />
        </div>
      ) : testResults.length === 0 ? (
        <p>No test results available.</p>
      ) : (
        <div className="grid gap-4">
          {testResults.map(result => (
            <div key={result._id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2">{result.testName}</h2>
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong> {new Date(result.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Time:</strong> {new Date(result.date).toLocaleTimeString()}
              </p>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => handleDownload(result._id, result.testName)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Download
                </button>
                <button
                  onClick={() => handlePrint(result._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Print
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestResults;
