import React, { useContext, useState } from 'react';
import '../../css/user/profile-page.css';
import { AuthContext } from '../../context/authContext';
import ToastMessage from '../../components/CompoChild/Toast/toast';

import Avatar from 'react-avatar-edit';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ava from '../../assets/img/avatar/Kh4.png';
import axios from 'axios';
import validation from '../../utils/validation';

function ProfileUser() {
    const { currentUser, updateUserProfile } = useContext(AuthContext);

    const [modalShow, setModalShow] = useState(false);
    const [imageCrop, setImageCrop] = useState(false);
    const [image, setImage] = useState([]);

    const [key, setKey] = useState('profile');
    const [eye, setEye] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [inputs, setInputs] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [error, setError] = useState({});

    // Toast
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);

    const [values, setValues] = useState({
        fullName: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.phone,
        city: currentUser.city,
    });

    const onCrop = (view) => {
        setImageCrop(view);
    };
    const onClose = () => {
        setImageCrop(null);
    };
    const saveImage = () => {
        setImage([...image, { imageCrop }]);
        setModalShow(false);
    };
    const imgShow = image.map((item) => item.imageCrop);

    // Handle change
    const handleChange = (e) => {
        if (key === 'profile') {
            setValues({
                ...values,
                [e.target.name]: e.target.value,
            });
        }
        if (key === 'pass') {
            setInputs({ ...inputs, [e.target.name]: e.target.value });
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        // const { id, name, email, password } = userData;

        if (key === 'profile') {
            try {
                await axios.put('/api/auth/users/update/' + currentUser.id, {
                    fullName: values.fullName ? values.fullName : '',
                    avatar: imgShow[imgShow.length - 1],
                    city: values.city ? values.city : '',
                    email: values.email ? values.email : '',
                });
                const updatedUser = {
                    ...currentUser,
                    fullName: values.fullName,
                    avatar: imageCrop,
                    city: values.city,
                    email: values.email,
                };
                updateUserProfile(updatedUser);
                setMessage('Cập nhật thành công');
                setVariant('success');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 1000);
            } catch (err) {
                console.log(err);

                // setError(err.response.data.errors);
            }
            return;
        }
        if (key === 'pass') {
            if (inputs.newPassword !== inputs.confirmNewPassword) {
                setError({ ...error, pass: 'Mật khẩu mới không khớp' });
                return;
            }
            const validationErrors = validation(inputs);

            if (validationErrors.newPassword !== '') {
                setError({ ...error, vali: validationErrors.newPassword });
                return;
            }

            try {
                const response = await axios.post('/api/auth/users/changepass', {
                    id: currentUser.id,
                    currentPassword: inputs.currentPassword,
                    newPassword: inputs.newPassword,
                });

                console.log(response.data);

                setMessage('Cập nhật thành công');
                setVariant('success');
                setShowToast(true);
                // setTimeout(() => window.location.reload(), 2000);
                setTimeout(() => window.location.reload(), 1000);

                
            } catch (err) {
                console.error(err.response.data.message);
                setError({ ...error, message: err.response.data.message });
            }
            return;
        }
    };
    const handleTogglePassword = (event) => {
        event.stopPropagation();
        setShowPassword(!showPassword);
        setEye(!eye);
    };
    const handleFocus = () => {
        setError({});
    };
    console.log(error);
    return (
        <>
            {showToast && (
                <ToastMessage
                    autohide
                    toast={showToast}
                    setShowToast={setShowToast}
                    message={message}
                    variant={variant}
                />
            )}
            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img
                                    src={
                                        imgShow.length
                                            ? imgShow[imgShow.length - 1]
                                            : currentUser.avatar
                                            ? currentUser.avatar
                                            : ava
                                    }
                                    alt=""
                                />
                                <div className="file btn btn-lg btn-primary" onClick={() => setModalShow(true)}>
                                    Đổi ảnh
                                </div>
                                <Modal
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">Chọn ảnh</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Avatar width={100 + '%'} height={300} onCrop={onCrop} onClose={onClose} />
                                    </Modal.Body>
                                    <Modal.Footer className="justify-content-center">
                                        <div className="btn text-white" onClick={saveImage}>
                                            Lưu
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <p className="fs-1">{currentUser.username}</p>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="profile" title="Thông tin">
                                        <div className="tab-content profile-tab" id="myTabContent">
                                            <div
                                                className="tab-pane fade show active"
                                                id="home"
                                                role="tabpanel"
                                                aria-labelledby="home-tab"
                                            >
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label>Họ và tên</label>
                                                    </div>
                                                    <div className="col-md-6 d-flex align-items-center hover">
                                                        <input
                                                            type="text"
                                                            name="fullName"
                                                            value={values.fullName ? values.fullName : ''}
                                                            onChange={handleChange}
                                                            style={{
                                                                outline: 'none',
                                                                border: 'none',
                                                                color: 'var(--main-color)',
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label>Email</label>
                                                    </div>
                                                    <div className="col-md-6 d-flex align-items-center hover">
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            value={values.email ? values.email : ''}
                                                            onChange={handleChange}
                                                            style={{
                                                                outline: 'none',
                                                                border: 'none',
                                                                color: 'var(--main-color)',
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label>Số điện thoại</label>
                                                    </div>
                                                    <div className="col-md-6 d-flex align-items-center hover">
                                                        <input
                                                            type="text"
                                                            value={values.phone}
                                                            style={{
                                                                outline: 'none',
                                                                border: 'none',
                                                                color: 'var(--main-color)',
                                                            }}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label>Thành phố</label>
                                                    </div>
                                                    <div className="col-md-6 d-flex align-items-center hover">
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            value={values.city ? values.city : ''}
                                                            style={{
                                                                outline: 'none',
                                                                border: 'none',
                                                                color: 'var(--main-color)',
                                                            }}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="pass" title="Thay đổi mật khẩu">
                                        <div className="tab-content profile-tab" id="myTabContent">
                                            <div
                                                className="tab-pane fade show active"
                                                id="home"
                                                role="tabpanel"
                                                aria-labelledby="home-tab"
                                            >
                                                <div className="row mb-3">
                                                    <div className="col-md-5">
                                                        <label>Nhập mật khẩu cũ</label>
                                                    </div>
                                                    <div className="col-md-7 align-items-center hover ">
                                                        <input
                                                            className="w-100"
                                                            type="password"
                                                            name="currentPassword"
                                                            value={inputs.currentPassword}
                                                            onChange={handleChange}
                                                            onFocus={handleFocus}
                                                        />
                                                        {error && (
                                                            <small className="text-danger">{error.message}</small>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-5">
                                                        <label>Nhập mật khẩu mới</label>
                                                    </div>
                                                    <div className="col-md-7 hover position-relative">
                                                        <input
                                                            className="w-100"
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="newPassword"
                                                            value={inputs.newPassword}
                                                            onChange={handleChange}
                                                            onFocus={handleFocus}
                                                        />
                                                        <i
                                                            style={{
                                                                color: 'var(--main-color)',
                                                            }}
                                                            onClick={handleTogglePassword}
                                                            className={`eye fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}
                                                        ></i>
                                                        {error && <small className="text-danger">{error.vali}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-5">
                                                        <label>Nhập lại mật khẩu mới</label>
                                                    </div>
                                                    <div className="col-md-7 hover position-relative">
                                                        <input
                                                            className="w-100"
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="confirmNewPassword"
                                                            value={inputs.confirmNewPassword}
                                                            onChange={handleChange}
                                                            onFocus={handleFocus}
                                                        />
                                                        <i
                                                            style={{
                                                                color: 'var(--main-color)',
                                                            }}
                                                            onClick={handleTogglePassword}
                                                            className={`eye fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}
                                                        ></i>
                                                        {error && <small className="text-danger">{error.pass}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button
                                type="submit"
                                className="btn profile-edit-btn text-white"
                                name="btnAddMore"
                                defaultValue="Edit Profile"
                                onClick={updateUser}
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ProfileUser;
