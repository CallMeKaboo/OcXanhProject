import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

import '../../../css/servicePage/details.css';
import Loading from '../../../components/CompoChild/Loading/loading';
import BookingTime from '../../../components/CompoChild/TimeCard/time-form';
import Money from '../../../components/CompoChild/Money/money';

function ServiceDetail() {
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
            return null;
        } else {
            return newLocalData;
        }
    };

    const [selectedDate, setSelectedDate] = useState(localStorageDate());
    const [selectedTime, setSelectedTime] = useState('');


    const handleDateChange = (value) => {
        setSelectedDate(value);
    };
    const selectedTimer = (value) => {
        setSelectedTime(value)
    }
    const [activeItems, setActiveItems] = useState([]);
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

    const isItemActive = (value) => {
        const clickedIndex = activeItems.indexOf(value);
        return clickedIndex !== -1;
    };
    const navigate = useNavigate();

    // Handle back
    const handleBack = () => {
        navigate(`/service/?service_id=${service.service_id}`);
    };
    // Hanle login
    const handleLogin = () => {
        navigate('/login');
    };

    // handle star click
    const handleClick = (value) => {
        const activeItems = Array.from({ length: value }, (_, index) => index + 1);
        setActiveItems(activeItems);
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
                    <div className="row mx-auto my-3">
                        <span className="back-arrow" onClick={handleBack}>
                            ← Quay lại{' '}
                        </span>
                    </div>
                    <div className="row detail d-flex">
                        {loading ? (
                            <>
                                <div className="col-6 service-imgs d-flex">
                                    <div className="img-display">
                                        <div className="img-showcase d-flex">
                                            {service.thumbnail ? (
                                                <img src={selectedImage ? selectedImage : service.thumbnail} alt="bg" />
                                            ) : (
                                                <span>Đang cập nhật</span>
                                            )}
                                        </div>
                                        <div className="img-select d-flex mt-2">
                                            <div
                                                className="img-item"
                                                onClick={() => handleImageClick(service.thumbnail)}
                                            >
                                                <a>
                                                    <img src={service.thumbnail} alt="bg" />
                                                </a>
                                            </div>
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
                                        <BookingTime serviceID={service.service_id} setSelectedTime={selectedTimer}/>
                                    </div>
                                    {currentUser ? (
                                        <button
                                            className="btn text-white"
                                            onClick={() => {
                                                if (selectedDate !== '' && selectedTime !== '') {
                                                    navigate(`/service/booking/${service.id}`);
                                                } else {
                                                    setShow(true);
                                                }
                                            }}
                                        >
                                            Đặt lịch ngay
                                        </button>
                                    ) : (
                                        <button className="btn text-white" onClick={handleLogin}>
                                            Đăng nhập
                                        </button>
                                    )}
                                    <p className='text-danger' style={{ display: show ? 'block' : 'none' }}>
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
                    <div className="row mx-auto">
                        <form className="col-6">
                            <div className="select-star">
                                <ul className="ul-star">
                                    <li data-val={1} onClick={() => handleClick(1)}>
                                        <i className={`iconratingnew-star--big ${isItemActive(1) ? 'active' : ''}`} />
                                        <p>Rất tệ</p>
                                    </li>
                                    <li data-val={2} onClick={() => handleClick(2)}>
                                        <i className={`iconratingnew-star--big ${isItemActive(2) ? 'active' : ''}`} />
                                        <p>Tệ</p>
                                    </li>
                                    <li data-val={3} onClick={() => handleClick(3)}>
                                        <i className={`iconratingnew-star--big ${isItemActive(3) ? 'active' : ''}`} />
                                        <p className="active-slt">Bình thường</p>
                                    </li>
                                    <li data-val={4} onClick={() => handleClick(4)}>
                                        <i className={`iconratingnew-star--big ${isItemActive(4) ? 'active' : ''}`} />
                                        <p>Tốt</p>
                                    </li>
                                    <li data-val={5} onClick={() => handleClick(5)}>
                                        <i className={`iconratingnew-star--big ${isItemActive(5) ? 'active' : ''}`} />
                                        <p>Rất tốt</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="read-assess-form" style={{ display: 'block' }}>
                                <div className="textarea">
                                    <div className="inputrating__group">
                                        <textarea
                                            className="ct"
                                            name="fRContent"
                                            placeholder="Mời bạn chia sẻ thêm một số cảm nhận về sản phẩm ..."
                                            defaultValue={''}
                                        />
                                        <div className="txtcount__box">
                                            <span className="ct-words" style={{ display: 'none' }}>
                                                1 chữ
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <a className="submit-assess">Gửi đánh giá ngay</a>
                            </div>
                        </form>
                    </div>
                    <div className="row mx-auto">
                        <div className="col-6 comment comment--all ratingLst">
                            <div className="comment__item par" id="r-54303832">
                                <div className="item-top">
                                    <p className="txtname m-0">Cẩm Lanh</p>
                                </div>
                                <div className="item-rate">
                                    <div className="comment-star">
                                        <i className="icon-star" />
                                        <i className="icon-star" />
                                        <i className="icon-star" />
                                        <i className="icon-star" />
                                        <i className="icon-star" />
                                    </div>
                                </div>
                                <div className="comment-content">
                                    <p className="cmt-txt">Rất tốt</p>
                                </div>
                            </div>
                            <div className="comment__item par" id="r-54303832">
                                <div className="item-top">
                                    <p className="txtname m-0">Cẩm Lanh</p>
                                </div>
                                <div className="item-rate">
                                    <div className="comment-star">
                                        <i className="icon-star" />
                                        <i className="icon-star" />
                                        <i className="icon-star" />
                                        <i className="icon-star" />
                                        <i className="icon-star" />
                                    </div>
                                </div>
                                <div className="comment-content">
                                    <p className="cmt-txt">Rất tốt</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ServiceDetail;
