import React, { useEffect, useState } from 'react';
import '../../../css/booking/screen/payment.css';

function Payment({ setDataValid }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.id);
        setDataValid(false);
    };

    useEffect(() => {
        localStorage.setItem('payment_id', selectedOption === 'cash' ? 1 : 2);
    }, [selectedOption]);

    return (
        <div className="row m-0 h-100 justify-content-center">
            <div className="col-8 m-0 p-0">
                <div className="p-0">
                    <div className="box-inner-1 py-4 px-3 mb-4">
                        <div className="row m-0 title">
                            <p className="p-0">Chọn phương thức thanh toán</p>
                        </div>
                        <div className="radiobtn mb-2 pb-4  ">
                            <div className="">
                                <input
                                    type="radio"
                                    name="box"
                                    id="cash"
                                    checked={selectedOption === 'cash'}
                                    onChange={handleOptionChange}
                                />
                                <label htmlFor="cash" className="label-box py-2 first">
                                    <div className="d-flex align-items-start">
                                        <span className="circle align-self-center" />
                                        <div className="course">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className="fw-bold"> Tiền mặt </span>
                                                <div className="col-2">
                                                    <img
                                                        className=""
                                                        src="https://icons.veryicon.com/png/o/business/coin-series/cash-payment.png"
                                                        width={40}
                                                        height={40}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div className="">
                                <input
                                    type="radio"
                                    name="box"
                                    id="momo"
                                    checked={selectedOption === 'momo'}
                                    onChange={handleOptionChange}
                                />

                                <label htmlFor="momo" className="label-box py-2 second">
                                    <div className="d-flex">
                                        <span className="circle align-self-center" />
                                        <div className="course">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className="fw-bold"> Momo </span>
                                                <div className="col-2">
                                                    <img
                                                        className=""
                                                        src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png?20201011055544"
                                                        width={40}
                                                        height={40}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="row me-0 ms-2 pb-4 price-row">
                            <div className="d-flex">
                                <p className="info mb-0 ">Họ và tên: </p>
                                <p className="info  mb-0 ms-2 ">{localStorage.getItem('fullName')}</p>
                            </div>
                            <div className="d-flex">
                                <p className="info mb-0 ">Số điện thoại: </p>
                                <p className="info  mb-0 ms-2">{localStorage.getItem('phoneNumber')}</p>
                            </div>

                            <div className="d-flex">
                                <p className="info mb-0 ">Địa chỉ: </p>
                                <p className="info  mb-0 ms-2">
                                    {localStorage.getItem('address')} {localStorage.getItem('ward')}{' '}
                                    {localStorage.getItem('district')} {localStorage.getItem('province')}
                                </p>
                            </div>
                        </div>
                        <div className="me-0 ms-2 pb-1 d-flex justify-content-between">
                            <p className="info mt-3 mb-0" style={{ paddingLeft: 12 + 'px' }}>
                                Tổng tiền:{' '}
                            </p>
                            <p className="info mt-3 mb-0" style={{ paddingRight: 12 + 'px', color: '#009c3b' }}>
                                {localStorage.getItem('money')} VNĐ{' '}
                            </p>
                        </div>

                        {/* <button class="btn d-flex mx-auto"><b>Add card</b></button> */}
                    </div>{' '}
                </div>
            </div>
        </div>
    );
}

export default Payment;
