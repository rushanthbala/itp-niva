import Home from "../page/home";
import My404Component from "../page/404";
import Construction from "../page/construction";
import SignUp from "../page/authorization/signup";
import Login from "../page/authorization/login";
import RegisterWithUs from "../page/authorization/registeredWithUs";
import Booking from "../page/booking";
import Profile from "../page/profile";

export const publicRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/signup",
    component: SignUp,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/bookings",
    component: Booking,
    exact: true,
  },
  {
    path: "/profile",
    component: Profile,
    exact: true,
  },
  {
    path: "*",
    component: My404Component,
    exact: true,
  },
  {
    path: "/signup",
    component: SignUp,
    exact: false,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/user-details",
    component: RegisterWithUs,
    exact: true,
  },
];

export const AuthenticationRoutes = [
  {
    path: "/signup",
    component: SignUp,
    exact: false,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/user-details",
    component: RegisterWithUs,
    exact: true,
  },
  {
    path: "*",
    component: Login,
    exact: true,
  },
];
