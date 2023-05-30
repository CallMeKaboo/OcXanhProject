import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../../../css/booking/screen/overview.css';
import Loading from '../../../components/CompoChild/Loading/loading';

function OverviewDetail() {
    const [cleaner, setCleaner] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/cleaners`);
                setCleaner(res.data);
                setLoading(true);
                // console.log(loading);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const localStorageStaff = () => {
        if (loading) {
            let newLocalData = localStorage.getItem('staff');
            if (newLocalData === null) {
                return cleaner[0];
            } else {
                return JSON.parse(newLocalData);
            }
        } else return [];
    };
    const [isDivClicked, setIsDivClicked] = useState(localStorageStaff());
    const handleDivClick = (data) => {
        setIsDivClicked(data);
    };

    const formattedDate = localStorage.getItem('date_stamp')
        ? format(new Date(localStorage.getItem('date_stamp')), 'dd-MM-yyyy')
        : '';

    // sessionStorage.removeItem("staff")
    useEffect(() => {
        localStorage.setItem('staff', JSON.stringify(isDivClicked));
    }, [isDivClicked]);

    return (
        <div className="row m-0 h-100">
            <div className="row m-0 p-0">
                <div className="col-6 box-1 user p-0">
                    <div className="box-inner-1 py-4 px-3">
                        <div className="row m-0 title">
                            <p className="p-0">Chi tiết yêu cầu dịch vụ</p>
                        </div>
                        <div className="row me-0 ms-2 service-row">
                            <div className="col-6 service-img ps-0">
                                <img src={localStorage.getItem('service_img')} className="d-block w-100" alt="" />
                            </div>
                            <div className="col-6 ps-1 ">
                                <p className="dis info mb-2 font-weight-bold" style={{ fontSize: 20 + 'px' }}>
                                    {localStorage.getItem('service_name')}
                                </p>
                                <p className="info mb-1">
                                    <i className="fa-regular fa-calendar-days me-2" style={{ color: '#009c3b' }}></i>
                                    {formattedDate}
                                </p>
                                <p className="info">
                                    <i className="fa-regular fa-clock me-2" style={{ color: '#009c3b' }}></i>
                                    {localStorage.getItem('time_stamp')}
                                </p>
                            </div>
                        </div>

                        <div className="row me-0 ms-2 pb-2 price-row">
                            <div className="d-flex justify-content-between">
                                <p className="info mt-3 mb-0">Phí dịch vụ: </p>
                                <p className="info mt-3 mb-0">
                                    {localStorage
                                        .getItem('money')
                                        .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}{' '}
                                    VNĐ
                                </p>
                            </div>

                            <div className="d-flex justify-content-between">
                                <p className="info mt-3 mb-0">Phí thêm: </p>
                                <p className="info mt-3 mb-0">50000 VNĐ</p>
                            </div>
                        </div>
                        <div className="me-0 ms-2 pb-1 d-flex justify-content-between">
                            <p className="info mt-3 mb-0" style={{ paddingLeft: 12 + 'px' }}>
                                Tổng tiền:{' '}
                            </p>
                            <p className="info mt-3 mb-0" style={{ paddingRight: 12 + 'px', color: '#009c3b' }}>
                                {parseInt(localStorage.getItem('money')) + 50000} VNĐ
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-6 box-2 p-0 " style={{ maxWidth: 100 + '%' }}>
                    <div className="box-inner-2 py-4 px-3 ">
                        <div className="row m-0 title">
                            <p className="p-0">Chọn nhân viên</p>
                        </div>
                        <div className="ps-1">
                            <div className="list-group staff-group mb-2 ps-0">
                                {loading ?
                                    cleaner.map((value) => (
                                        <div
                                            className={`row staff-box ms-0 ps-0 ${
                                                isDivClicked && isDivClicked.id === value.id ? 'active' : ''
                                            }`}
                                            onClick={() => handleDivClick(value)}
                                            key={value.id}
                                        >
                                            <div className="col-4 text-center">
                                                <img
                                                    src={value.avatar}
                                                    alt="avatar"
                                                    className="rounded-circle"
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>
                                            <div className="col-5">
                                                <div className="d-flex flex-column mb-1">
                                                    <span>{value.fullName}</span>
                                                    <div className="ratings ml-2">
                                                        {Array(value.rate)
                                                            .fill()
                                                            .map((_, index) => (
                                                                <i
                                                                    key={index}
                                                                    className="fa-solid fa-star me-2"
                                                                    style={{ color: '#fbff00' }}
                                                                />
                                                            ))}
                                                    </div>
                                                    <span>{value.gender}</span>
                                                    <span>{value.phone}</span>
                                                </div>
                                            </div>
                                            <div className="col-3 text-end more-detail">
                                                <p className="p-2 m-0 text-center">Chi tiết</p>
                                            </div>
                                        </div>
                                    )) : <Loading/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverviewDetail;
