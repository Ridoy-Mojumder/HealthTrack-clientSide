import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../../UseHook/UseAxiosPublic/UseAxiosPublic';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import SocileLogin from '../SocileLogin/SocileLogin';

const SignUp = () => {
    const axiosPublic = UseAxiosPublic();
    const { createUser, updatedProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //console.log(confirmPassword);


    // Form validation and submission logic
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // Check if password and confirm password match
        if (data.password !== data.confirm_password) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Proceed with form submission
        createUser(data.email, data.password)
            .then((user) => {
                navigate('/login');
                //console.log("User created:", user.user);
                updatedProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            bloodGroup: data.bloodGroup,
                            district: data.district,
                            upazila: data.upazila,
                            photoURL: data.photoURL,
                        };
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertId) {
                                    console.log("User added to database successfully");
                                    reset();
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'User created successfully.',
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    });
                                }
                            })
                            .catch(error => {
                                console.error("Error adding user to database:", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error updating profile:", error);
                    });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.error("Error creating user:", error);
            });
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center py-16" style={{ backgroundImage: `url('https://i.ibb.co/tcZsTZN/240-F-796303804-I699c-FQ76-E0nyri-PMIZy09-FSAsnejh-Ht.jpg')` }}>
            <Helmet>
                <title>Sign Up - HealthTrack Diagnostic Center</title>
                <meta name="description" content="Contact us to get in touch with our diagnostic center. Leave your comments and feedback." />
            </Helmet>
            <div className="max-w-screen-sm w-full bg-white bg-opacity-80 rounded-xl shadow-lg p-8 backdrop-blur-md">
                <div className="flex justify-center mb-6">
                    <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                </div>
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Create an Account</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            {...register('name', { required: true })}
                            className="w-full border-b-2 rounded-md border-gray-300 py-2 px-4 focus:outline-none focus:border-indigo-500 transition duration-300"
                        />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            {...register('email', { required: true })}
                            className="w-full border-b-2 rounded-md border-gray-300 py-2 px-4 focus:outline-none focus:border-indigo-500 transition duration-300"
                        />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="avatar" className="block text-gray-700 font-semibold mb-2">
                            Upload Picture
                        </label>
                        <input
                            type="text"
                            name="photoURL"
                            {...register("photoURL", { required: true })}
                            placeholder="Enter your photo URL" id="photoURL"
                            className='w-full border-b-2 rounded-md border-gray-300 py-2 px-4 focus:outline-none focus:border-indigo-500 transition duration-300' />
                        {errors.photoURL && <span className='text-red-600'>PhotoURL is required</span>}


                    </div>
                    {/* New fields */}
                    <div className="mb-6">
                        <label htmlFor="bloodGroup" className="block text-gray-700 font-semibold mb-2">
                            Blood Group
                        </label>
                        <select
                            id="bloodGroup"
                            name="bloodGroup"
                            {...register('bloodGroup', { required: true })}
                            className="w-full border-b-2 rounded-md border-gray-300 py-2 px-4 focus:outline-none focus:border-indigo-500 transition duration-300"
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        {errors.bloodGroup && <span className="text-red-600">Blood Group is required</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="district" className="block text-gray-700 font-semibold mb-2">
                            District
                        </label>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            {...register('district', { required: true })}
                            className="w-full border-b-2 rounded-md border-gray-300 py-2 px-4 focus:outline-none focus:border-indigo-500 transition duration-300"
                        />
                        {errors.district && <span className="text-red-600">District is required</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="upazila" className="block text-gray-700 font-semibold mb-2">
                            Upazila
                        </label>
                        <input
                            type="text"
                            id="upazila"
                            name="upazila"
                            {...register('upazila', { required: true })}
                            className="w-full border-b-2 rounded-md border-gray-300 py-2 px-4 focus:outline-none focus:border-indigo-500 transition duration-300"
                        />
                        {errors.upazila && <span className="text-red-600">Upazila is required</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: {
                                    value: /(?=.*[A-Z].)(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,20}$/,
                                    message: "Password must contain at least one uppercase letter, one special character, one digit, and one lowercase letter"
                                }
                            })}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-b-2 rounded-md border-gray-300 py-2 px-4 focus:outline-none focus:border-indigo-500 transition duration-300"
                        />
                        {errors.password && <span className="text-red-600">{errors.password.message || "Password is required"}</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirm_password" className="block text-gray-700 font-semibold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            {...register("confirm_password", {
                                required: true,
                                validate: value => value === password || "The passwords do not match"
                            })}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border-b-2 rounded-md border-gray-300 py-2 px-4 focus:outline-none focus:border-indigo-500 transition duration-300"
                        />
                        {errors.confirm_password && <span className="text-red-600">{errors.confirm_password.message || "Confirm Password is required"}</span>}
                    </div>
                    {/* End of new fields */}
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Sign Up</button>


                    <div className='text-center mt-4'>
                        <SocileLogin></SocileLogin>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-gray-700">Already have an account? </span>
                    <Link to='/login' className="text-indigo-500 hover:text-indigo-700 transition duration-300">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
