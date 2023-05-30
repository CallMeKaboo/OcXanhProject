import { React, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

import Loading from '../../components/CompoChild/Loading/loading';
import ModelOverlay from '../ModelOverlay';
import Pagination from '../../components/CompoChild/Pagination/pagination';
import Money from '../../components/CompoChild/Money/money';

import bg from '../../assets/img/BG/2.jpg';
import '../..//css/servicePage/cleaning.css';

const listData = [
    {
        id: uuid(),
        titleData: 'Tất cả dịch vụ',
        status: 'active-li',
    },
    {
        id: uuid(),
        titleData: 'Giúp việc',
        search: '?service_id=3',
    },
    {
        id: uuid(),
        titleData: 'Dọn nhà',
        search: '?service_id=2',
    },
];
function CleaningService() {
    const [overlay, setoverlay] = useState(false);
    const [services, setServices] = useState([]);
    const [serviceID, setServiceID] = useState('');
    const [index, setIndex] = useState('');
    const servicesID = useLocation().search; //Get id from location
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(4);

    // Load list of services
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/services${servicesID}`);
                setServices(res.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [servicesID]);

    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;

    return (
        <>
            {overlay && (
                <ModelOverlay
                    descrip={loading ? services[index].description : 'Đang cập nhật'}
                    onCancelbutton={() => setoverlay(false)}
                    serviceID={serviceID}
                />
            )}
            <main>
                <div className="hero-area">
                    <div className="slider-bg2 slider-height2 d-flex align-items-center">
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-xxl-12">
                                    <div className="hero-caption2 text-center">
                                        <h2>Dịch vụ của chúng tôi</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="services-page spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 order-lg-2 m-0">
                                {loading ? (
                                    <div className="row">
                                        {services.slice(firstItemIndex, lastItemIndex).map((e, index) => (
                                            <div className="col-lg-6 col-md-6 col-sm-6" key={index}>
                                                <div
                                                    className="services-page_item"
                                                    onClick={() => {
                                                        setoverlay(true);
                                                        setServiceID(e.id);
                                                        setIndex(index);
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            e.thumbnail
                                                                ? e.thumbnail
                                                                : require(`../../assets/img/services_img/default/${e.def_thumbnail}`)
                                                        }
                                                        alt={e.altData}
                                                    />
                                                    <div className="services-page_item__text">
                                                        <h5>{e.name}</h5>
                                                        <p>
                                                            Giá từ{' '}
                                                            <span>
                                                                <Money value={e.start_price} />
                                                            </span>
                                                        </p>
                                                        <a href="">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                className="w-5 h-5 "
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                                    clipRule="evenodd"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Loading />
                                )}
                                <div className="row" style={{ marginTop: 80 + 'px' }}>
                                    <Pagination
                                        totalItem={services.length}
                                        itemPerPage={itemPerPage}
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 order-lg-1 col-md-6">
                                <div className="services-sidebar">
                                    <div className="services-sidebar_filter">
                                        <h4>Dịch vụ đa dạng</h4>
                                        <ul>
                                            {listData.map((e) => (
                                                <li key={e.id}>
                                                    <Link
                                                        to={{ pathname: '/service/', search: e.search }}
                                                        className={e.status}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className={e.status + ' w-5 h-5'}
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        {e.titleData}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="services-sidebar_banner">
                                        <img src={bg} alt="" />
                                        <div className="services-sidebar_banner__text">
                                            <span>Chúng tôi giúp bạn</span>
                                            <h2 className="text-capitalize">Sạch sẽ nhà cửa</h2>
                                            <a href="#" className="primary-btn">
                                                Đặt lịch ngay
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default CleaningService;
