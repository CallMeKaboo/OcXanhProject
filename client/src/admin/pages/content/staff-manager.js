import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

import '../../styles/table.css';
import AddOverlay from '../../../admin/components/add';
import DeleteOverlay from '../../../admin/components/delete';
import EditOverlay from '../../../admin/components/edit';
import Loading from '../../../components/CompoChild/Loading/loading';
import Pagination from '../../../components/CompoChild/Pagination/pagination';
import Money from '../../../utils/money';

function StaffManager() {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);


    const [overlay, setOverlay] = useState(false);
    const [type, setType] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(6);

    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/adminGet/staff`);
                setStaff(res.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleClickOverlay = (overlayType,rowData) => {
        setType(overlayType);
        setOverlay(true);
        setSelectedRow(rowData);

    };
    // Check box handle
    const handleCheckBox = (e) => {
        const { id, checked } = e.target;
        if (id === 'selectAll') {
            const checkedValue = staff.map((value) => {
                return { ...value, isChecked: checked };
            });

            setStaff(checkedValue);
        } else {
            const checkedValue = staff.map((value) =>
                value.id.toString() === id ? { ...value, isChecked: checked } : value,
            );
            // console.log(checkedValue);
            setStaff(checkedValue);
        }
    };

    return (
        <>
            <div className="container-xl" style={{ height: '440px' }}>
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <h2>
                                        Quản lý <b>Nhân viên</b>
                                    </h2>
                                </div>
                                <div className="col-sm-6">
                                    <a
                                        className="btn btn-success"
                                        data-toggle="modal"
                                        onClick={() => handleClickOverlay('add')}
                                    >
                                        <i className="fa-solid fa-circle-plus"></i> <span>Thêm nhân viên mới</span>
                                    </a>
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
                                                checked={!staff.some((value) => value?.isChecked !== true)}
                                                onChange={handleCheckBox}
                                            />
                                            <label htmlFor="selectAll" />
                                        </span>
                                    </th>
                                    <th>Họ và tên</th>
                                    <th>Ngày sinh</th>
                                    <th>Giới tính</th>
                                    <th>Số điện thoại</th>
                                    <th>Ngày vào</th>
                                    <th>Lương</th>
                                    <th>Công cụ</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    {staff.slice(firstItemIndex, lastItemIndex).map((value, index) => (
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
                                            <td>{value.fullName}</td>
                                            <td>{format(new Date(value.dob), 'dd/MM/yyyy')}</td>
                                            <td>{value.gender}</td>
                                            <td>{value.phone}</td>
                                            <td>{format(new Date(value.date_in), 'dd/MM/yyyy')}</td>
                                            <td><Money value={value.salary} /></td>
                                            <td className="text-center">
                                                <a
                                                    className="edit"
                                                    data-toggle="modal"
                                                    onClick={() => handleClickOverlay('edit', staff[firstItemIndex + index])}
                                                >
                                                    <i
                                                        className="fa-solid fa-pencil"
                                                        data-toggle="tooltip"
                                                        title="Edit"
                                                    ></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan={8} className='text-center'>
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
                    totalItem={staff.length}
                    itemPerPage={itemPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            {/* Add */}
            {overlay && type === 'add' && (
                <AddOverlay onCancelbutton={() => setOverlay(false)} name={'Thêm nhân viên mới'} type={2} />
            )}
            {overlay && type === 'delete' && (
                <DeleteOverlay onCancelbutton={() => setOverlay(false)} isChecked={staff} typePost={'deleteStaff'} />
            )}
            {overlay && type === 'edit' && <EditOverlay onCancelbutton={() => setOverlay(false)} name={'Sửa nhân viên'} type={2} data={selectedRow}/>}
        </>
    );
}

export default StaffManager;
