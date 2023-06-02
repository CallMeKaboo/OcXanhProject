import React from 'react';

import AppSlide from './slide';
import AppAbout from './about';

// import AppLogin from './pages/user/login';
import AppClient from './client-talk';
import HomeServices from './services';
import AppHowWork from './work';

function Home() {
    return (
        <main>
            <AppSlide />
            <AppAbout />
            <HomeServices />
            <AppClient />
            <AppHowWork />
        </main>
    );
}

export default Home;
