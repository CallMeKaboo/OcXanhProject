import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import Loading from '../../components/CompoChild/Loading/loading';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Pagination from '../../components/CompoChild/Pagination/pagination';
import DeleteOverlay from '../../components/CompoChild/Dialog/dialog';

function CartHistory() {
    const { currentUser } = useContext(AuthContext);
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showIcon, setShowIcon] = useState(true);

    // icon gone after 5'
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowIcon(false);
        }, 5 * 60 * 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const [selectedRow, setSelectedRow] = useState(null);

    const [overlay, setOverlay] = useState(false);
    const [type, setType] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(6);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/bookings/${currentUser.id}`);
                setBooking(res.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [currentUser.id]);

    const handleClickOverlay = (overlayType, rowData) => {
        setType(overlayType);
        setOverlay(true);
        setSelectedRow(rowData);
    };

    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;

    return (
        <>
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title" style={{ backgroundColor: 'var(--main-color)' }}>
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <h2>
                                        Quản lý <b>Lịch đặt</b>
                                    </h2>
                                </div>
                                <div className="col-sm-6"></div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th style={{ width: 10 + '%' }}>Mã lịch đặt</th>
                                    <th>Tên dịch vụ</th>
                                    <th>Thời gian</th>
                                    <th>Địa chỉ</th>

                                    <th>Trạng thái</th>
                                    <th>Công cụ</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    {booking.slice(firstItemIndex, lastItemIndex).map((value, index) => (
                                        <tr key={index}>
                                            <td>MLD{value.id}</td>
                                            <td>{value.name}</td>
                                            {/* <td>{value.contact_phone}</td> */}
                                            <td>
                                                {value.cleaning_time}
                                                <br />
                                                {format(new Date(value.cleaning_date), 'dd-MM-yyyy')}
                                            </td>
                                            <td>{value.address}</td>

                                            <td className="text-success">
                                                {value.status === 0 ? 'Đang chuẩn bị' : 'Hoàn thành'}
                                            </td>
                                            <td className="text-center">
                                                {value.status === 0 && showIcon && (
                                                    <a
                                                        className="delete"
                                                        data-toggle="modal"
                                                        onClick={() => handleClickOverlay('delete', booking[index])}
                                                    >
                                                        <i
                                                            class="fa-solid fa-trash"
                                                            data-toggle="tooltip"
                                                            title="Delete"
                                                        ></i>
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan={12} className="text-center">
                                            <Loading />
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                        <div className="row" style={{ marginTop: 80 + 'px' }}>
                            <Pagination
                                totalItem={booking.length}
                                itemPerPage={itemPerPage}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {overlay && type === 'delete' && (
                <DeleteOverlay onCancelbutton={() => setOverlay(false)} data={selectedRow} />
            )}

            {/* 
                
                */}
        </>
    );
}

export default CartHistory;
