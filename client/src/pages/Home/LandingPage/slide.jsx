import Carousel from 'react-bootstrap/Carousel';
import React, { useContext, useState } from 'react';
import '../../../css/home/landingPage/slider.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

var slideData = [
    {
        id: 1,
        image: require('../../../assets/img/BG.png'),
        title: 'Dọn nhà yêu',
        description: 'Hãy để chúng tôi dọn nhà hộ bạn',
    },
    {
        id: 2,
        image: require('../../../assets/img/bg2.jpg'),
        title: 'Đội ngũ chuyên nghiệp',
        description: 'Hãy để chúng tôi dọn nhà hộ bạn',
    },
    // {
    //     id: 3,
    //     image: require('../../../assets/img/bg3.jpg'),
    //     title: 'Dịch vụ đa dạng',
    //     description: 'Hãy để chúng tôi dọn nhà hộ bạn',
    // },
];
export default function AppSlide() {
    const [index, setIndex] = useState(0);
    const {currentUser} = useContext(AuthContext);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {slideData.map((data) => {
                    return (
                        <Carousel.Item className="slider text-center" key={data.id}>
                            <img
                                className="d-block"
                                // style={{maxHeight: '50%', maxWidth: '100%',objectFit: 'cover'}}
                                src={data.image}
                                alt={data.title}
                            />
                            <Carousel.Caption>
                                <h3>{data.title}</h3>
                                <p>{data.description}</p>
                                <div className="carousel-action">
                                    <a href="#about" className="btn btn-primary">
                                        Xem thêm
                                    </a>
                                    <Link to={currentUser ? "/service" : "/login"} className="btn btn-success">
                                        Đặt lịch ngay
                                    </Link>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </>
    );
}
