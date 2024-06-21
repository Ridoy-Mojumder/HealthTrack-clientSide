import { useState, useEffect, useContext } from 'react';
import UseAxiosSecure from '../../../UseHook/UseAxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Circles } from 'react-loader-spinner';

const MyProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    district: '',
    upazila: '',
    photoURL: '',
    role: '',
    status: '',
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    district: '',
    upazila: '',
    photoURL: '',
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(`/users`);
        const currentUserEmail = user.email;

        const currentUserData = response.data.find((user) => user.email === currentUserEmail);

        if (currentUserData) {
          setProfileData(currentUserData);
          setUserId(currentUserData._id);
          setFormData({
            name: currentUserData.name,
            email: currentUserData.email,
            bloodGroup: currentUserData.bloodGroup,
            district: currentUserData.district,
            upazila: currentUserData.upazila,
            photoURL: currentUserData.photoURL,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [axiosSecure, user.email]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...profileData,
        name: formData.name,
        email: formData.email,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
        photoURL: formData.photoURL,
      };
      await axiosSecure.patch(`/users/${userId}`, updatedUser);
      setProfileData(updatedUser);
      setEditing(false);

      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating user data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error updating your profile.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleEditClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to edit your profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setEditing(true);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-5 border border-gray-300 rounded-lg  mx-auto mt-10 bg-white shadow-md">
      {!editing ? (
        <>
          <div className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={profileData.photoURL || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="w-36 h-36 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{profileData.name}</h1>
                  <p className="text-lg text-gray-600">{profileData.email}</p>
                  <p className="mt-2 text-gray-700">
                    {profileData.bloodGroup} | {profileData.district}, {profileData.upazila}
                  </p>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 m-10 rounded-md"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Medical History</h2>
              <div className="space-y-4">
                {/* Example medical history items */}
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
                  <div>
                    <p className="text-lg font-semibold">Chronic Conditions</p>
                    <p className="text-gray-600">Hypertension</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
                  <div>
                    <p className="text-lg font-semibold">Allergies</p>
                    <p className="text-gray-600">Pollen</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
                  <div>
                    <p className="text-lg font-semibold">Medications</p>
                    <p className="text-gray-600">Aspirin</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      ) : (
        <form className="w-full" onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </label>
          <label className="block mb-2">
            Blood Group:
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </label>
          <label className="block mb-2">
            District:
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </label>
          <label className="block mb-2">
            Upazila:
            <input
              type="text"
              name="upazila"
              value={formData.upazila}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </label>
          <label className="block mb-4">
            Profile Picture URL:
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleInputChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MyProfile;
