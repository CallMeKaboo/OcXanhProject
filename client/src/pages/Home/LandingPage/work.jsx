import React from 'react';

import '../../../css/home/landingPage/work.css';

function AppHowWork() {
    return (
        <section className="work spad set-bg">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-7 text-lg-center">
                        <div className="section-title">
                            <span>HOẠT ĐỘNG RA SAO</span>
                            <h2>Làm sạch trong 3 bước đơn giản</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="work__item">
                            <div className="work__item__icon">
                                <div className="icon">
                                    <span>01</span>
                                    <img src={require('../../../assets/img/logo/check-list.png')} className='w-25' alt="" />
                                    
                                </div>
                            </div>
                            <h5>Chọn kế hoạch phù hợp</h5>
                            <p>Lựa chọn thời gian phù hợp để bắt đầu dịch vụ</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="work__item">
                            <div className="work__item__icon">
                                <div className="icon">
                                    <span>02</span>
                                    <img src={require('../../../assets/img/logo/settings.png')} className='w-25' alt="" />

                                </div>
                            </div>
                            <h5>Đặt lịch của bạn</h5>
                            <p>Chọn dịch vụ và bắt đầu đặt lịch</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="work__item">
                            <div className="work__item__icon">
                                <div className="icon">
                                    <span>03</span>
                                    <img src={require('../../../assets/img/logo/diamond.png')} className='w-25' alt="" />

                                </div>
                            </div>
                            <h5>Tận hưởng thành quả</h5>
                            <p>Ngồi đợi và tận hưởng dịch vụ thôi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AppHowWork;
