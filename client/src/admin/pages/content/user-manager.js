import React, { useEffect, useState } from 'react';
import Loading from '../../../components/CompoChild/Loading/loading';
import '../../styles/table.css';
import axios from 'axios';
import DeleteOverlay from '../../../admin/components/delete';
import Pagination from '../../../components/CompoChild/Pagination/pagination';

function UserManager() {
    const [user, setUser] = useState([]);
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
                const res = await axios.get(`/api/adminGet/user`);
                setUser(res.data);
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
            const checkedValue = user.map((value) => {
                return { ...value, isChecked: checked };
            });

            setUser(checkedValue);
        } else {
            const checkedValue = user.map((value) =>
                value.id.toString() === id ? { ...value, isChecked: checked } : value,
            );
            // console.log(checkedValue);
            setUser(checkedValue);
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
                                        Quản lý <b>Người dùng</b>
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
                                                checked={!user.some((value) => value?.isChecked !== true)}
                                                onChange={handleCheckBox}
                                            />
                                            <label htmlFor="selectAll" />
                                        </span>
                                    </th>
                                    <th>Họ và tên</th>
                                    <th style={{ width: '20%' }}>Tên tài khoản</th>
                                    <th style={{ width: '20%' }}>Số điện thoại</th>
                                    <th style={{ width: '30%' }}>Email</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    {user.slice(firstItemIndex, lastItemIndex).map((value, index) => (
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
                                            <td>{value.username}</td>
                                            <td>{value.phone}</td>
                                            <td>{value.email}</td>
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
                    totalItem={user.length}
                    itemPerPage={itemPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            {/* Add */}

            {overlay && type === 'delete' && (
                <DeleteOverlay onCancelbutton={() => setOverlay(false)} isChecked={user} typePost={'deleteUser'} />
            )}

            {/* 
            
            */}
        </>
    );
}

export default UserManager;
