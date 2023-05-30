import React from 'react';

import AppSlide from './slide';
import AppAbout from './about';

// import AppLogin from './pages/user/login';
import AppContact from './contact';
import AppClient from './client-talk';
import HomeServices from './services';

function Home() {
    return (
        <main>
            <AppSlide />
            <AppAbout />
            <HomeServices />
            <AppClient />
            <AppContact />
        </main>
    );
}

export default Home;
