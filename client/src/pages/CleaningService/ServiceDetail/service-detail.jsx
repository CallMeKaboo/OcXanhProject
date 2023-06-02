import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

import '../../../css/servicePage/details.css';
import Loading from '../../../components/CompoChild/Loading/loading';
import BookingTime from '../../../components/CompoChild/TimeCard/time-form';
import Money from '../../../components/CompoChild/Money/money';
import Reviews from '../../../components/Layout/ServiceDetail/Review/review';

function ServiceDetail() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const [show, setShow] = useState(false);
    // Loading
    const [loading, setLoading] = useState(false);
    // Load data
    const [service, setService] = useState([]);

    // Check local storage
    const localStorageDate = () => {
        let newLocalData = localStorage.getItem('date_stamp');

        if (newLocalData === null) {
            return 'null';
        } else {
            return newLocalData;
        }
    };

    const [selectedDate, setSelectedDate] = useState(localStorageDate());
    const [selectedTime, setSelectedTime] = useState(localStorage.getItem('time_stamp'));

    const handleDateChange = (value) => {
        setSelectedDate(value);
    };
    const selectedTimer = (value) => {
        setSelectedTime(value);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/services/details/${id}`);
                setService(res.data);
                setLoading(true);
                // console.log(loading);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    // Hanle login
    const handleLogin = () => {
        navigate('/login');
    };

    const checkValue = () => {
        console.log(selectedDate);
        if (selectedDate === 'null' && selectedTime === 'null') setShow(true);
        else if (selectedDate === 'null' || selectedTime === 'null') setShow(true);
        else navigate(`/service/booking/${service.id}`);
    };

    useEffect(() => {
        localStorage.setItem('date_stamp', selectedDate);
        localStorage.setItem('money', service.price);
        localStorage.setItem('service_id', id);
    }, [selectedDate, service.price, id]);

    return (
        <>
            <main className="my-5">
                <div className="container">
                    <div className="row detail d-flex mt-3">
                        {loading ? (
                            <>
                                <div className="col-6 service-imgs d-flex">
                                    <div className="img-display">
                                        <div className="img-showcase d-flex">
                                            <img
                                                src={
                                                    selectedImage
                                                        ? selectedImage
                                                        : service.thumbnail
                                                        ? require(`../../../assets/img/services_img/${service.thumbnail}`)
                                                        : require(`../../../assets/img/services_img/default/${service.def_thumbnail}`)
                                                }
                                                alt="bg"
                                            />
                                        </div>
                                        <div className="img-select d-flex mt-2">
                                            {service.imgs
                                                ? service.imgs.map((e, index) => (
                                                      <div
                                                          className="img-item"
                                                          onClick={() => handleImageClick(e)}
                                                          key={index}
                                                      >
                                                          <a>
                                                              <img src={e} alt="bg" />
                                                          </a>
                                                      </div>
                                                  ))
                                                : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h2 className="s-title">{service.name}</h2>
                                    <div className="hot-sale">
                                        <p>Hotsale</p>
                                    </div>
                                    <div className="s-rating mb-3">
                                        {Array(service.rate)
                                            .fill()
                                            .map((index) => (
                                                <i className="fas fa-star" key={index}></i>
                                            ))}
                                    </div>
                                    <p className="s-money">
                                        Giá:{' '}
                                        <span>
                                            {' '}
                                            <Money value={service.price} />
                                        </span>
                                    </p>
                                    <p className="s-des">{service.desc}</p>
                                    <span>...</span>
                                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                                        <ul className="p-0 feature-list">
                                            {service.feature
                                                ? service.feature.map((e, index) => (
                                                      <li key={index}>
                                                          <span className="icon_check" />
                                                          <span className="ms-2">{e}</span>
                                                      </li>
                                                  ))
                                                : ''}
                                        </ul>
                                    </div>
                                    <div className="date-picker">
                                        <p>Chọn ngày</p>
                                        <input
                                            type="date"
                                            className="form-control input_box"
                                            value={selectedDate ? selectedDate : ''}
                                            onChange={(e) => handleDateChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="time-picker">
                                        <p>Chọn thời gian</p>
                                        <BookingTime serviceID={service.service_id} setSelectedTime={selectedTimer} />
                                    </div>
                                    {currentUser ? (
                                        <button className="btn text-white" onClick={checkValue}>
                                            Đặt lịch ngay
                                        </button>
                                    ) : (
                                        <button className="btn text-white" onClick={handleLogin}>
                                            Đăng nhập
                                        </button>
                                    )}
                                    <p className="text-danger" style={{ display: show ? 'block' : 'none' }}>
                                        Vui lòng chọn ngày và giờ để tiếp tục
                                    </p>
                                </div>
                            </>
                        ) : (
                            <Loading />
                        )}
                    </div>
                    <div className="row mx-auto m-5">
                        <div className="col-6">
                            <div className="detail-text">
                                <h4>Chi tiết</h4>
                                <span className="desc-long">
                                    {' '}
                                    <p>{service.desc}</p>
                                </span>
                            </div>
                            <div className="detail-more">
                                <div className="about-thing">
                                    <i className="fa-regular fa-clock"></i>
                                    <span className="text-success"> {service.duration} Tiếng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Reviews service_detail_id={id} />
                </div>
            </main>
        </>
    );
}

export default ServiceDetail;
