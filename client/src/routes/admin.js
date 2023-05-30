import UserManager from '../admin/pages/content/user-manager';
import OverviewDash from '../admin/pages/content/dashboard';
import ServiceManager from '../admin/pages/content/service-manager';
import StaffManager from '../admin/pages/content/staff-manager';
import BookingManager from '../admin/pages/content/booking-manager';
import ContactManager from '../admin/pages/content/contact-manager';
import ReportManager from '../admin/pages/content/report';


// Public route
const adminRoutes = [
    // { path: 'index', element: <LoginAdmin /> },
    { path: '/admin/home/service', element: <ServiceManager /> },
    { path: '/admin/home/user', element: <UserManager /> },
    { path: '/admin/home/staff', element: <StaffManager /> },
    { path: '/admin/home/booking', element: <BookingManager /> },
    { path: '/admin/home/contact', element: <ContactManager /> },
    { path: '/admin/home/overview', element: <OverviewDash /> },
    { path: '/admin/home/report', element: <ReportManager /> },
];

export { adminRoutes };
