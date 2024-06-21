import { useContext } from "react";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const PrivateRoute = ({children}) => {
   
    const {user, loadingState} =useContext(AuthContext)
    const location = useLocation();

    if(loadingState){
        return <span className="loading loading-spinner text-info"></span>;
    }
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to="/logIn"></Navigate>
};
PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;