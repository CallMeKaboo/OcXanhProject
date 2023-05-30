import Home from '../pages/Home/LandingPage';
import CleaningService from '../pages/CleaningService';
import AppLogin from '../pages/User/login';
import AppSignup from '../pages/User/signup';
import ContactPage from '../pages/Home/Contact/contact-page';
import ProfileUser from '../pages/User/profile';
import ServiceDetail from '../pages/CleaningService/ServiceDetail/service-detail';
import BookingService from '../pages/Booking/booking-page';
import CartHistory from '../pages/Cart';

// Public route
const publicRoutes = [
    { path: 'index', element: <Home /> },
    { path: '/login', element: <AppLogin /> },
    { path: '/register', element: <AppSignup /> },
    { path: '/service', element: <CleaningService /> },
    { path: '/service/detail/:id', element: <ServiceDetail /> },
    { path: '/service/booking/:id', element: <BookingService /> },
    { path: '/contact', element: <ContactPage /> },
    { path: '/profile', element: <ProfileUser /> },
    { path: '/history', element: <CartHistory /> },
];
// Private route
const privateRoutes = [];

export { publicRoutes, privateRoutes };
