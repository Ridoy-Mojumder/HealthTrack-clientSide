import { createBrowserRouter } from "react-router-dom";
import Root from "../component/Root/Root";
import ErrorPage from "../component/ErrorPage/ErrorPage";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import SignUp from "../component/signUp/SignUp";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import HomeForDashboard from "../Dashboard/HomeForDashboard/HomeForDashboard";
import AllUsers from "../Pages/AllUsers/AllUsers";
import AddBanner from "../Pages/AddBanner/AddBanner";
import AddTest from "../Pages/AddTest/AddTest";
import AllTest from "../Pages/AllTest/AllTest";
import AllBanner from "../Pages/AllBanner/AllBanner";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MyProfile from "../Pages/GeneralUserInfo/MyProfile/MyProfile";
import ViewDetails from "../Dashboard/Home/viewDetails/ViewDetails";
import Statistics from "../Pages/Statistics/Statistics";
import Reservation from "../Pages/Reservation/Reservation";
import UpcomingAppointments from "../Pages/GeneralUserInfo/UpcomingAppointments/UpcomingAppointments";
import TestResults from "../Pages/GeneralUserInfo/TestResults/TestResults";
import Service from "../component/Service/Service";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/viewDetails/:id",
          element: <ViewDetails />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/services",
          element: <Service />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
      ],
    },
    {
      path:'dashboard',
      element:  <PrivateRoute><HomeForDashboard /></PrivateRoute>,
      children: [
        {
          path:"allUsers",
          element:<AllUsers></AllUsers>
        },
        {
          path:"add-banner",
          element:<AddBanner/>
        },
        {
          path:"add-test",
          element:<AddTest/>
        },
        {
          path:"all-tests",
          element:<AllTest/>
        },
        {
          path:"all-banners",
          element:<AllBanner/>
        },
        {
          path:"statistics",
          element:<Statistics/>
        },
        {
          path:"reservation",
          element:<Reservation/>
        },
        {
          path:"my-profile",
          element:<MyProfile/>
        },
        {
          path:"upcoming-appointments",
          element:<UpcomingAppointments/>
        },
        {
          path:"test-results",
          element:<TestResults/>
        },
      ]
    },
    
    
  ]);