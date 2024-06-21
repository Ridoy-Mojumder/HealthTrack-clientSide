import { useRef, useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import SocileLogin from "../SocileLogin/SocileLogin";

const Login = () => {
    const captchaRef = useRef(null);
    const [disable, setDisable] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        loadCaptchaEnginge(6);  // Load captcha with 6 characters
    }, []);

    const handleValidateCaptcha = () => {
        const userCaptchaValue = captchaRef.current.value;
        if (validateCaptcha(userCaptchaValue)) {
            alert('Captcha Matched');
            setDisable(false);
        } else {
            alert('Captcha Does Not Match');
            setDisable(true);
        }
    };

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const captcha = form.captcha.value;
        const password = form.password.value;
        //console.log(email, captcha, password);



        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: 'Success!',
                    text: 'Login successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate(from, {replace:true})
                //console.log(user);
            })



    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center py-16" style={{ backgroundImage: `url('https://i.ibb.co/tcZsTZN/240-F-796303804-I699c-FQ76-E0nyri-PMIZy09-FSAsnejh-Ht.jpg')` }}>
            <Helmet>
                <title>Login - HealthTrack Diagnostic Center</title>
                <meta name="description" content="Contact us to get in touch with our diagnostic center. Leave your comments and feedback." />
            </Helmet>
            <div className="max-w-lg w-full bg-white bg-opacity-80 rounded-xl shadow-lg p-8 backdrop-blur-md">
                <div className="flex justify-center mb-6">
                    <img className="h-10 w-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                </div>
                <h2 className="text-4xl font-semibold text-center mb-6 text-gray-800">Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    {/* Input fields */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" id="email" className="w-full border-b-2 border-gray-300 py-3 px-4 focus:outline-none focus:border-indigo-500 transition duration-300" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password" id="password" className="w-full border-b-2 border-gray-300 py-3 px-4 focus:outline-none focus:border-indigo-500 transition duration-300" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="captcha" className='block text-gray-700'>Captcha</label>
                        <div className='mb-4'>
                            <LoadCanvasTemplate className="" />
                            <input type="text" ref={captchaRef} name="captcha" placeholder="Type here" id="captcha" className='w-full bg-white mt-2 p-2 border border-gray-300 rounded' />
                            <button type="button" className='text-blue-500 mt-4 ' onClick={handleValidateCaptcha} >Validate</button>
                        </div>
                    </div>
                    {/* Login button */}
                    <button type="submit" disabled={disable} className="w-full bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Login</button>
                </form>
                {/* Forgot password */}
                <div className="mt-4 text-center">
                    <a href="#" className="text-indigo-500 hover:text-indigo-700 transition duration-300">Forgot Password?</a>
                </div>
                {/* Sign up */}
                <div className="mt-4 text-center">
                    <span className="text-gray-700">Do not have an account? </span>
                    <Link to='/signUp' className="text-indigo-500 hover:text-indigo-700 transition duration-300">Sign Up</Link>
                </div>
                {/* Social icons */}
                <div className="mt-6 flex justify-center">
                    <SocileLogin></SocileLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
