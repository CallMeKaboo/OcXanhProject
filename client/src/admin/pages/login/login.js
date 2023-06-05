import React, { useState } from 'react';
import '../../styles/login.css';
import ToastMessage from '../../../components/CompoChild/Toast/toast';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
function LoginAdmin() {
    const navigate = useNavigate();
    const { loginAdmin } = useContext(AuthContext);

    const [eye, setEye] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // Toast
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState('');

    // const [admin, setAdmin] = useState({});

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await loginAdmin(inputs);

            // // localStorage.setItem('admin', JSON.parse(admin));
            // console.log(admin);
            setMessage('Đăng nhập thành công');
            setVariant('success');
            setShowToast(true);
            setTimeout(() => {
                navigate('/admin/home/overview');
            }, 1000);
        } catch (err) {
            console.log(err.response.data.errors);
            setError(err.response.data.errors.message);
        }
    };
    const handleFocus = () => {
        setError('');
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
        setEye(!eye);
    };
    return (
        <>
            {showToast && (
                <ToastMessage toast={showToast} setShowToast={setShowToast} message={message} variant={variant} />
            )}
            <div className="row justify-content-center mt-5">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card-inner card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* <!-- Nested Row within Card Body --> */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Chào mừng!</h1>
                                            {error && <p className="text-danger">{error.admin}</p>}
                                        </div>
                                        <form className="user" onSubmit={handleLogin}>
                                            <div className="form-group mb-3">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form-control form-control-user"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Nhập tên tài khoản..."
                                                    value={inputs.username}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                />
                                                {/* {error && <p className="text-danger">{error.userName}</p>} */}
                                            </div>
                                            <div className="form-group mb-3 position-relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    className="form-control form-control-user"
                                                    id="exampleInputPassword"
                                                    placeholder="Nhập mật khẩu..."
                                                    value={inputs.password}
                                                    onChange={handleChange}
                                                />
                                                <i
                                                    style={{
                                                        color: 'var(--main-color)',
                                                        top: '40%',
                                                        right: '20px',
                                                    }}
                                                    onClick={handleTogglePassword}
                                                    className={`eye fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}
                                                ></i>
                                                {error && <p className="text-danger">{error}</p>}
                                            </div>

                                            <button
                                                type="submit"
                                                href="index.html"
                                                className="btn btn-primary btn-user btn-block w-100 p-2"
                                            >
                                                Đăng nhập
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginAdmin;
