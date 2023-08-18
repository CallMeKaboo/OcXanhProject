import React, { useContext, useEffect, useState } from 'react';

import AppSlide from './slide';
import AppAbout from './about';

// import AppLogin from './pages/user/login';

import ToastMessage from '../../../components/CompoChild/Toast/toast';
import AppClient from './client-talk';
import HomeServices from './services';
import AppHowWork from './work';
import { AuthContext } from '../../../context/authContext';

function Home() {
    const { currentUser } = useContext(AuthContext);
    // Toast
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);

    const showUpQuestion = () => {
        if (currentUser.fullName === null) {
            setInterval(() => {
                setMessage('Bạn chưa cập nhật thông tin, bạn có muốn cập nhật không ?');
                setVariant('danger');
                setShowToast(true);
            }, 5000);
        }
    };
    // useEffect(() => {
    //     showUpQuestion();
    //     setTimeout(() => {
    //         setShowToast(false);
    //     }, 3000);
    // }, [currentUser.fullName]);
    return (
        <>
            {/* {showToast && (
                <ToastMessage toast={showToast} setShowToast={setShowToast} message={message} variant={variant} />
            )} */}
            <main>
                <AppSlide />
                <AppAbout />
                <HomeServices />
                <AppClient />
                <AppHowWork />
            </main>
        </>
    );
}

export default Home;
