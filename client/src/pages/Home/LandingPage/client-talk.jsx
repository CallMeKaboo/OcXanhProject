import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';

import '../../../css/home/landingPage/client-talk.css';

let reviewData = [
    {
        id: 1,
        title: 'Rất tuyệt vời',
        detail: 'Dịch vụ thuê dọn nhà là một lựa chọn tuyệt vời cho những ai đang có bận rộn trong công việc và không có thời gian để tự dọn dẹp nhà cửa của mình',
        img: require('../../../assets/img/Kh1.png'),
        name: 'Hoàng Thị Hà',
        address: 'Hà Nội',
    },
    {
        id: 2,
        title: 'Rất tuyệt vời',
        detail: 'Tôi đã sử dụng dịch vụ thuê dọn nhà và rất hài lòng với kết quả. Những người làm việc rất chuyên nghiệp và thân thiện.',
        img: require('../../../assets/img/Kh2.png'),
        name: 'Nguyễn Khánh',
        address: 'Bắc Giang',
    },
    {
        id: 3,
        title: 'Rất tuyệt vời Oke',
        detail: 'Tôi cảm thấy đáng tiền với chi phí thuê dọn nhà này và sẽ sử dụng dịch vụ của họ trong tương lai.',
        img: require('../../../assets/img/Kh3.png'),
        name: 'Nguyễn Tuấn',
        address: 'Bắc Ninh',
    },
];

export default function AppClient() {
    return (
        <div className="home-testimonial">
            <div className="container">
                <div className="row d-flex justify-content-center testimonial-pos">
                    <div className="col-md-12 d-flex justify-content-center">
                        <h3>Khách hàng nói gì</h3>
                    </div>
                    <div className="col-md-12 d-flex justify-content-center">
                        <h2>Trải nghiệm của khách hàng tại miền Bắc</h2>
                    </div>
                </div>

                <div className="row d-flex justify-content-center">
                    {reviewData.map((e) => (
                        <div className="col-md-4 col-md-3 col-sm-6" key={e.id}>
                            <div className="user-item ">
                                <div className="d-flex justify-content-center pt-2 pb-2">
                                    <img className="tm-people" src={e.img} alt="" />
                                </div>
                                <h5 className="user-title mt-3 mb-3 text-center">{e.title}</h5>
                                <div className="user-text text-center">{e.detail}</div>

                                <div className="user-name d-flex justify-content-center">{e.name}</div>
                                <div className="user-add d-flex justify-content-center">{e.address}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
