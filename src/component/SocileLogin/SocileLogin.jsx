import { useContext } from "react";
import { FaFacebook, FaGithub, FaGoogle, FaInstagram, FaTwitter } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../UseHook/UseAxiosPublic/UseAxiosPublic";


const SocileLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = UseAxiosPublic();

    const from = location.state?.from?.pathname || "/"

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            const user = result.user;
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                //console.log(res.data)
            })
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
        <div className='text-center mt-4'>
            <p>Or sign in with</p>
            <div className='flex justify-center mt-2 gap-10 font-bold text-3xl'>
                <button onClick={handleGoogleSignIn}><FaGoogle></FaGoogle></button>
                <FaFacebook></FaFacebook>
                <FaInstagram></FaInstagram>
                <FaTwitter></FaTwitter>
                <FaGithub></FaGithub>
            </div>
        </div>
    );
};

export default SocileLogin;