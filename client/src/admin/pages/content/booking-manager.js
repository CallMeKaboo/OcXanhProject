import React, { useEffect, useState } from 'react';
import Loading from '../../../components/CompoChild/Loading/loading';
import '../../styles/table.css';
import axios from 'axios';
import AddOverlay from '../../../admin/components/add';
import DeleteOverlay from '../../../admin/components/delete';
import EditOverlay from '../../../admin/components/edit';
import Pagination from '../../../components/CompoChild/Pagination/pagination';

function BookingManager() {
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(false);

    const [overlay, setOverlay] = useState(false);
    const [type, setType] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(6);

    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/admin/booking`);
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
    
    return (
        <>
            <div className="container-xl">
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
                                        href="#deleteEmployeeModal"
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
                                            <input type="checkbox" id="selectAll" />
                                            <label htmlFor="selectAll" />
                                        </span>
                                    </th>
                                    <th>Tài khoản</th>
                                    <th>Người đặt</th>
                                    <th>Điện thoại</th>
                                    <th>Email</th>
                                    <th>Dịch vụ</th>
                                    <th>Nhân viên</th>
                                    <th>Lịch đặt</th>
                                    <th>Địa chỉ</th>
                                    <th>Trạng thái</th>
                                    <th>Công cụ</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    {booking.slice(firstItemIndex,lastItemIndex).map((value, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className="custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        id={`checkbox${index}`}
                                                        name="options[]"
                                                        defaultValue={index}
                                                    />
                                                    <label htmlFor={`checkbox${index}`} />
                                                </span>
                                            </td>
                                            <td>{value.username}</td>
                                            <td>{value.contact_name}</td>
                                            <td>{value.contact_phone}</td>
                                            <td>{value.contact_email}</td>
                                            <td>{value.name}</td>
                                            <td>{value.fullName}</td>
                                            <td>{value.time_stamp}</td>
                                            <td>{value.address}</td>
                                            <td className="text-success">
                                                {value.status === 0 ? 'Đang chuẩn bị' : 'Sẵn sàng'}
                                            </td>
                                            <td className='text-center'>
                                                <a
                                                    className="edit"
                                                    data-toggle="modal"
                                                    onClick={() => {
                                                        if(value.status === 0) value.status = 1;
                                                        else value.status = 0;
                                                    }}
                                                >
                                                    <i
                                                        className="fa-solid fa-circle-check"
                                                        data-toggle="tooltip"
                                                        title="check"
                                                    ></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <Loading />
                            )}
                        </table>
                        
                    </div>
                </div>
                <div class="row" style={{ marginTop: 80 + 'px' }}>
                    <Pagination
                        totalItem={booking.length}
                        itemPerPage={itemPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
            {/* Add */}
            {overlay && type === 'add' && <AddOverlay onCancelbutton={() => setOverlay(false)} />}

            {overlay && type === 'delete' && <DeleteOverlay onCancelbutton={() => setOverlay(false)} />}
            {overlay && type === 'edit' && <EditOverlay onCancelbutton={() => setOverlay(false)} />}

            {/* 
            
            */}
        </>
    );
}

export default BookingManager;
