// export { default as DefaultLayout } from './DefaultLayout'
import AppNav from './Navbar';
import AppFooter from './Footer';
import { Outlet } from 'react-router-dom';
function DefaultLayout() {
    return (
        <>
            <AppNav/>
            <Outlet/>
            <AppFooter/>
        </>
    );
}

export default DefaultLayout;
