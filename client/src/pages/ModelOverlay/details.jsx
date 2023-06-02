import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../css/modelOverlay/detail.css';
import Loading from '../../components/CompoChild/Loading/loading';
import Money from '../../components/CompoChild/Money/money';

function DetailsService({ serviceID, descrip }) {
    // const [data, setData] = useState('');
    // const serviceID = props.serviceID;
    const [service, setService] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/services/details/${serviceID}`);
                setService(res.data);
                setLoading(true);
                // console.log(loading);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [serviceID]);
    useEffect(() => {
        // Lưu dữ liệu vào localStorage
        localStorage.setItem('service_name', service.name);
        localStorage.setItem('service_img', service.thumbnail);
    }, [service.name, service.thumbnail]);

    return (
        <>
            {loading ? (
                <div className="row m-0 overflow-hidden main-rounded h-100" key={service.id}>
                    <div className="col-6 service-bg ps-0">
                        <img
                            className="img-fluid"
                            src={
                                service.thumbnail
                                    ? require(`../../assets/img/services_img/${service.thumbnail}`)
                                    : require(`../../assets/img/services_img/default/${service.def_thumbnail}`)
                            }
                            alt="service-bg"
                        />
                    </div>
                    <div className="col-6 service-detail lg">
                        <div className="hot-sale">
                            <p>Hotsale</p>
                        </div>
                        <div className="service-name">
                            <p>{service.name}</p>
                        </div>
                        <div className="service-star">
                            {Array(service.rate)
                                .fill()
                                .map((_, index) => (
                                    <i key={index} className="fa-solid fa-star me-2" style={{ color: '#fbff00' }} />
                                ))}
                        </div>
                        <div className="service-descrip">
                            <p>Mô tả:</p>
                            <p className="row-sm-6">{descrip}</p>
                        </div>
                        <div className="service-detail_features">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <ul>
                                        {service.feature &&
                                            service.feature.slice(0, 3).map((value, index) => (
                                                <li key={index}>
                                                    <span className="icon_check" />
                                                    {value}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <ul>
                                        {service.feature &&
                                            service.feature.slice(3, 6).map((value, index) => (
                                                <li key={index}>
                                                    <span className="icon_check" />
                                                    {value}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="service-detail_pic">
                            <div className="row">
                                {service.imgs &&
                                    service.imgs.slice(0,2).map((value, index) => (
                                        <div className="col-lg-6 col-md-6 col-sm-6" key={index}>
                                            <img src={value} alt={index} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="service-price">
                            <data className="money" value={100.0}>
                                <Money value={service.price} />
                            </data>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default DetailsService;
