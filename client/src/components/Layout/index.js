// export { default as DefaultLayout } from './DefaultLayout'
import AppNav from './Navbar/navbar';
import AppFooter from './Footer/footer';
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
