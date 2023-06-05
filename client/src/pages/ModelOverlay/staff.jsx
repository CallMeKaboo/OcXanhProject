import React, { useEffect, useState } from 'react';
import Loading from '../../components/CompoChild/Loading/loading';
import axios from 'axios';
import formatDate from '../../utils/formatDate';
import '../../css/modelOverlay/staff.css';

function OurStaff({ staffID }) {
    const [cleaner, setCleaner] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/cleaners/${staffID}`);
                setCleaner(res.data);
                setLoading(true);
                // console.log(loading);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [staffID]);

    console.log(cleaner);
    return (
        <>
            {loading ? (
                <div className="row m-0 overflow-hidden main-rounded h-100" key={cleaner.id}>
                    <div className="col-6 service-bg ps-0">
                        {cleaner.avatar ? (
                            <img
                                className="img-fluid"
                                src={require(`../../assets/img/avatar/staff-logo/${cleaner.avatar}`)}
                                alt="staff-bg"
                            />
                        ) : (
                            <span>Đang cập nhật</span>
                        )}
                    </div>
                    <div className="col-6 staff-detail lg">
                        <div className="service-name mb-5">
                            <p>{cleaner.fullName}</p>
                        </div>
                        <div className="">
                            <p>Ngày sinh: {formatDate(cleaner.dob)}</p>
                        </div>
                        <div className="">
                            <p>Giới tính: {cleaner.gender}</p>
                        </div>
                        <div className="">
                            <p>Số điện thoại: {cleaner.phone}</p>
                        </div>
                        <div className="">
                            <p>Địa chỉ: {cleaner.address}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default OurStaff;
