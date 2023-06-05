import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/index';
import DefaultLayout from './components/Layout';
import axios from 'axios';

import LoginAdmin from './admin/pages/login/login';
import { adminRoutes } from './routes/admin';
import AppAdmin from './admin/admin';
import RequireAuth from './routes/RequireAuth';

axios.defaults.baseURL = 'http://localhost:8800';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin" element={<LoginAdmin />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/admin/home" element={<AppAdmin />}>
                            {adminRoutes.map((route, index) => {
                                return <Route key={index} path={route.path} element={route.element} />;
                            })}
                        </Route>
                    </Route>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route index element={publicRoutes[0].element} />
                        {publicRoutes.slice(1).map((route, index) => {
                            return <Route key={index} path={route.path} element={route.element} />;
                        })}
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
