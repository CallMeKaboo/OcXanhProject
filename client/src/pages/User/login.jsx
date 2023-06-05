import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.js';

import ToastMessage from '../../components/CompoChild/Toast/toast';
import validation from '../../utils/validation.js';
import bgLogin from '../../assets/img/BG/bg-login.jpg';
import '../../css/user/user-page.css';

function AppLogin() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [eye, setEye] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // Toast
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState({});

    const [rememberPass, setRememberPass] = useState(false);
    // set default state
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    //
    useEffect(() => {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        const rememberedCheckbox = localStorage.getItem('rememberedCheckbox');

        if (rememberedCheckbox) {
            setRememberPass(rememberedCheckbox === 'true');
        }

        if (rememberedUsername && rememberedPassword && rememberedCheckbox === 'true') {
            setValues({
                ...values,
                username: rememberedUsername,
                password: rememberedPassword,
            });
        }
    }, []);
    //
    const handleCheckboxChange = (event) => {
        setRememberPass(event.target.checked);
    };
    //
    const handleChange = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const validationErrors = validation(values);

        if (validationErrors.userName !== '' || validationErrors.passWord !== '') {
            setError(validationErrors);
            return;
        } else {
            try {
                await login(values);
                if (rememberPass) {
                    localStorage.setItem('rememberedUsername', values.username);
                    localStorage.setItem('rememberedPassword', values.password);
                    localStorage.setItem('rememberedCheckbox', rememberPass);
                } else {
                    localStorage.removeItem('rememberedUsername');
                    localStorage.removeItem('rememberedPassword');
                    localStorage.removeItem('rememberedCheckbox');
                }

                setMessage('Đăng nhập thành công');
                setVariant('success');
                setShowToast(true);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } catch (err) {
                console.log(err.response.data.errors);
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
        <main className="login">
            {showToast && (
                <ToastMessage toast={showToast} setShowToast={setShowToast} message={message} variant={variant} />
            )}
            <div className="row main-account">
                <div className="col bg-user_page p-0">
                    <img src={bgLogin} alt="bg-login" />
                </div>
                <div className="col-7 bg-light form-user_page">
                    <div className="box-login">
                        <h1 className="text-center">Đăng nhập</h1>
                        <form className="form-user" onSubmit={handleLogin}>
                            <div className="mb-3 input-custom">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Tên tài khoản
                                </label>
                                <input
                                    type="username"
                                    className="form-control"
                                    id="InputName"
                                    aria-describedby="emailHelp"
                                    placeholder="Nhập tên tài khoản của bạn"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                />
                                <div id="userNameDanger" className="form-text text-danger">
                                    {error.userName && <span>{error.userName}</span>}
                                </div>
                            </div>
                            <div className="mb-3 input-custom position-relative">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Mật khẩu
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="InputPassword"
                                    placeholder="Nhập mật khẩu của bạn"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
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
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    checked={rememberPass}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    Nhớ mật khẩu
                                </label>
                            </div>
                            <button type="submit" className="btn text-white">
                                Đăng nhập
                            </button>
                        </form>
                        <p className="text-center signup-text">
                            Bạn chưa có tài khoản?{' '}
                            <Link to={'/register'} href="#" className="link-primary text-decoration-none">
                                ĐĂNG KÝ
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AppLogin;
