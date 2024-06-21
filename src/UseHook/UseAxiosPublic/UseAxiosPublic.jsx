import axios from "axios";

const axiosPublic= axios.create({
    baseURL: "https://health-track-serverside.vercel.app"
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;