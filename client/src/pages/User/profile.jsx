import React, { useContext, useState } from 'react';
import '../../css/user/profile-page.css';
import { AuthContext } from '../../context/authContext';

import Avatar from 'react-avatar-edit';
import Modal from 'react-bootstrap/Modal';
import ava from '../../assets/img/avatar/Kh4.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileUser() {
    const { currentUser, updateUserProfile } = useContext(AuthContext);
    const naviagte = useNavigate()
    const [modalShow, setModalShow] = useState(false);
    const [imageCrop, setImageCrop] = useState(false);
    const [image, setImage] = useState([]);

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

    console.log(imageCrop);
    // Handle change
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    const updateUser = async (e) => {
        e.preventDefault();
        // const { id, name, email, password } = userData;

        try {
            await axios.put('/api/auth/users/' + currentUser.id, {
                fullName: values.fullName ? values.fullName : '',
                avatar: imageCrop ? imageCrop : '',
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
            alert('Gui thanh cong');
            // naviagte('http://localhost:3000/profile')
        } catch (err) {
            console.log(err);
            // setTextVisibility(true);
            // console.log(err.response.data.errors);
            // setError(err.response.data.errors);
        }
    };
    console.log(currentUser);
    return (
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
                                {/* <input
                                    type="file"
                                    name="file"
                                    accept="/image/*"
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        if (file && file.type.substring(0, 5) === 'image') {
                                            setImage(file);
                                        } else {
                                            setImage(null);
                                        }
                                    }}
                                /> */}
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
                            <p className='fs-1'>{currentUser.username}</p>
                            <ul className="nav nav-tabs mt-5" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        id="home-tab"
                                        data-toggle="tab"
                                        href="#home"
                                        role="tab"
                                        aria-controls="home"
                                        aria-selected="true"
                                    >
                                        Thông tin
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        id="pass-tab"
                                        data-toggle="tab"
                                        href="#pass"
                                        role="tab"
                                        aria-controls="pass"
                                        aria-selected="false"
                                    >
                                        Thay đổi mật khẩu
                                    </a>
                                </li>
                            </ul>
                            <div className="col-md-8">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="home"
                                        role="tabpanel"
                                        aria-labelledby="home-tab"
                                    >
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label>Họ và tên</label>
                                            </div>
                                            <div className="col-md-6 d-flex align-items-center hover">
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={values.fullName ? values.fullName : ' '}
                                                    onChange={handleChange}
                                                    style={{
                                                        outline: 'none',
                                                        border: 'none',
                                                        color: 'var(--main-color)',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6 d-flex align-items-center hover">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={values.email ? values.email : ' '}
                                                    onChange={handleChange}
                                                    style={{
                                                        outline: 'none',
                                                        border: 'none',
                                                        color: 'var(--main-color)',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
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
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <label>Thành phố</label>
                                            </div>
                                            <div className="col-md-6 d-flex align-items-center hover">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={values.city ? values.city : ' '}
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
                                    <div
                                        className="tab-pane fade show "
                                        id="pass"
                                        role="tabpanel"
                                        aria-labelledby="pass-tab"
                                    >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Tên tài khoản</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{currentUser.username}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{currentUser.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Số điện thoại</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{currentUser.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    );
}

export default ProfileUser;
