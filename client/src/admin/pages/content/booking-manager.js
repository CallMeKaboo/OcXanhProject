import React, { useEffect, useState } from 'react';
import Loading from '../../../components/CompoChild/Loading/loading';
import axios from 'axios';
import AddOverlay from '../../../admin/components/add';
import DeleteOverlay from '../../../admin/components/delete';
import EditOverlay from '../../../admin/components/edit';
import Pagination from '../../../components/CompoChild/Pagination/pagination';
import ToastMessage from '../../../components/CompoChild/Toast/toast';

import '../../styles/table.css';

function BookingManager() {
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(false);

    // Toast
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);

    const [overlay, setOverlay] = useState(false);
    const [type, setType] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(6);

    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/adminGet/booking`);
                setBooking(res.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleClickOverlay = (overlayType) => {
        setType(overlayType);
        setOverlay(true);
    };
    // Check box handle
    const handleCheckBox = (e) => {
        const { id, checked } = e.target;
        if (id === 'selectAll') {
            const checkedValue = booking.map((value) => {
                return { ...value, isChecked: checked };
            });

            setBooking(checkedValue);
        } else {
            const checkedValue = booking.map((value) =>
                value.id.toString() === id ? { ...value, isChecked: checked } : value,
            );
            // console.log(checkedValue);
            setBooking(checkedValue);
        }
    };

    const handleAgree = (rowData) => {
        try {
            axios.put('/api/adminUpdate/booking/' + rowData.id);
            setMessage('Cập nhật thành công');
            setVariant('success');
            setShowToast(true);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {showToast && (
                <ToastMessage toast={showToast} setShowToast={setShowToast} message={message} variant={variant} />
            )}
            <div className="container-xl" style={{ height: '440px' }}>
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <h2>
                                        Quản lý <b>Lịch đặt</b>
                                    </h2>
                                </div>
                                <div className="col-sm-6">
                                    <a
                                        className="btn btn-danger"
                                        data-toggle="modal"
                                        onClick={() => handleClickOverlay('delete')}
                                    >
                                        <i className="fa-solid fa-circle-minus"></i> <span>Xóa</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <span className="custom-checkbox">
                                            <input
                                                type="checkbox"
                                                id="selectAll"
                                                checked={!booking.some((value) => value?.isChecked !== true)}
                                                onChange={handleCheckBox}
                                            />
                                            <label htmlFor="selectAll" />
                                        </span>
                                    </th>
                                    <th>Tài khoản</th>
                                    {/* <th>Người đặt</th> */}
                                    <th>Điện thoại</th>
                                    <th>Email</th>
                                    <th>Dịch vụ</th>
                                    <th>Nhân viên</th>
                                    <th>Lịch đặt</th>
                                    <th>Địa chỉ</th>
                                    <th>Trạng thái</th>
                                    <th style={{ width: '5%' }}>Công cụ</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    {booking.slice(firstItemIndex, lastItemIndex).map((value, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className="custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        id={value.id}
                                                        value={value.id}
                                                        checked={value?.isChecked || false}
                                                        onChange={handleCheckBox}
                                                    />
                                                    <label htmlFor={`checkbox${index}`} />
                                                </span>
                                            </td>
                                            <td>{value.username}</td>
                                            {/* <td>{value.contact_name}</td> */}
                                            <td>{value.contact_phone}</td>
                                            <td>{value.contact_email}</td>
                                            <td>{value.name}</td>
                                            <td>{value.fullName}</td>
                                            <td>{value.time_stamp}</td>
                                            <td>{value.address}</td>
                                            <td className="text-success">
                                                {value.status === 0 ? 'Đang chuẩn bị' : 'Sẵn sàng'}
                                            </td>
                                            <td className="text-center">
                                                <a
                                                    className="edit"
                                                    data-toggle="modal"
                                                    onClick={() => handleAgree(booking[index])}
                                                >
                                                    <i
                                                        className="fa-solid fa-circle-check"
                                                        style={{ color: value.status === 0 ? 'ffc107' : '#4fe37b' }}
                                                        data-toggle="tooltip"
                                                        title="check"
                                                    ></i>
                                                </a>
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
                    </div>
                </div>
            </div>
            <div className="row" style={{ margin: '80px 47px 0 47px' }}>
                <Pagination
                    totalItem={booking.length}
                    itemPerPage={itemPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            {/* Add */}
            {overlay && type === 'add' && <AddOverlay onCancelbutton={() => setOverlay(false)} />}

            {overlay && type === 'delete' && (
                <DeleteOverlay
                    onCancelbutton={() => setOverlay(false)}
                    isChecked={booking}
                    typePost={'deleteBooking'}
                />
            )}
            {overlay && type === 'edit' && <EditOverlay onCancelbutton={() => setOverlay(false)} />}

            {/* 
            
            */}
        </>
    );
}

export default BookingManager;
