import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import bgSignup from '../../assets/img/BG/bg-regis.jpg';
import '../../css/user/user-page.css';
import validation from '../../utils/validation';
import ToastMessage from '../../components/CompoChild/Toast/toast';

function AppSignup() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);

    const [eye, setEye] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [values, setValues] = useState({
        username: '',
        phone: '',
        password: '',
    });
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    const [error, setError] = useState({});
    // Connect api then post user
    const registerUser = async (e) => {
        e.preventDefault();

        const validationErrors = validation(values);
        
        if (
            validationErrors.userName !== '' ||
            validationErrors.passWord !== '' ||
            validationErrors.phoneNumber !== ''
        ) {
            setError(validationErrors);
            return;
        } else {
            try {
                const res = await axios.post('/api/auth/register', {
                    username: values.username,
                    phone: values.phone,
                    password: values.password,
                });

                setMessage('Đăng ký thành công');
                setVariant('success');
                setShowToast(true);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } catch (err) {
                setError(err.response.data.errors);
            }
        }
    };
    const handleFocus = () => {
        setError({});
    };
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
        setEye(!eye);
    };

    return (
        <main>
            {showToast && (
                <ToastMessage toast={showToast} setShowToast={setShowToast} message={message} variant={variant} />
            )}
            <div className="row main-account">
                <div className="col bg-user_page p-0">
                    <img src={bgSignup} alt="bg-signup" />
                </div>
                <div className="col-7 bg-light form-user_page">
                    <div className="box-signup">
                        <h1 className="text-center">Đăng ký</h1>
                        <form className="form-user" onSubmit={registerUser}>
                            <div className="mb-3 input-custom">
                                <label htmlFor="InputName" className="form-label">
                                    Tên tài khoản
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    id="InputName"
                                    placeholder="Nhập tên tài khoản"
                                    value={values.username}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                />
                                <div id="userNameDanger" className="form-text text-danger">
                                    {error.userName && <span>{error.userName}</span>}
                                </div>
                            </div>
                            <div className="mb-3 input-custom">
                                <label htmlFor="InputPhone" className="form-label">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control"
                                    id="InputPhone"
                                    placeholder="Nhập số điện thoại của bạn"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                />
                                <div id="phoneNumDanger" className="form-text text-danger">
                                    {error.phoneNumber && <span>{error.phoneNumber}</span>}
                                </div>
                            </div>
                            <div className="mb-3 input-custom position-relative">
                                <label htmlFor="InputPass" className="form-label">
                                    Mật khẩu
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="form-control"
                                    id="InputPass"
                                    placeholder="Nhập mật khẩu của bạn"
                                    value={values.password}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                />
                                <i
                                    style={{
                                        color: 'var(--main-color)',
                                        right: '15px',
                                        top: '45px',
                                    }}
                                    onClick={handleTogglePassword}
                                    className={`eye fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}
                                ></i>
                                <div id="passDanger" className="form-text text-danger">
                                    {error.passWord && <span>{error.passWord}</span>}
                                </div>
                            </div>

                            <button type="submit" className="btn text-white">
                                Đăng ký
                            </button>
                        </form>
                        <p className="text-center signup-text">
                            Bạn đã có tài khoản?{' '}
                            <Link to={'/login'} href="#" className="link-primary text-decoration-none">
                                ĐĂNG NHẬP
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default AppSignup;
