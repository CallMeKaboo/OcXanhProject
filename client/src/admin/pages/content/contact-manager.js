import React, { useEffect, useState } from 'react';
import Loading from '../../../components/CompoChild/Loading/loading';
import '../../styles/table.css';
import axios from 'axios';
import DeleteOverlay from '../../../admin/components/delete';
import Pagination from '../../../components/CompoChild/Pagination/pagination';
import ReplyOverlay from '../../../admin/components/reply';

function ContactManager() {
    const [contact, setContact] = useState([]);
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
                const res = await axios.get(`/api/adminGet/contact`);
                setContact(res.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleClickOverlay = (overlayType, rowData) => {
        setType(overlayType);
        setOverlay(true);
        setSelectedRow(rowData);
    };

    // Check box handle
    const handleCheckBox = (e) => {
        const { id, checked } = e.target;
        if (id === 'selectAll') {
            const checkedValue = contact.map((value) => {
                return { ...value, isChecked: checked };
            });

            setContact(checkedValue);
        } else {
            const checkedValue = contact.map((value) =>
                value.id.toString() === id ? { ...value, isChecked: checked } : value,
            );
            // console.log(checkedValue);
            setContact(checkedValue);
        }
    };

    useEffect(() => {
        localStorage.setItem('contact_request', contact.length);
    }, [contact.length]);

    return (
        <>
            <div className="container-xl" style={{ height: '440px' }}>
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <h2>
                                        Quản lý <b>Yêu cầu hỗ trợ</b>
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
                                                checked={!contact.some((value) => value?.isChecked !== true)}
                                                onChange={handleCheckBox}
                                            />
                                            <label htmlFor="selectAll" />
                                        </span>
                                    </th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th style={{ width: '50%' }}>Yêu cầu hỗ trợ</th>
                                    <th>Công cụ</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    {contact.slice(firstItemIndex, lastItemIndex).map((value, index) => (
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
                                            <td>{value.email}</td>
                                            <td style={{ width: '50%' }}>{value.message}</td>

                                            <td className="text-center">
                                                <a
                                                    className="reply"
                                                    data-toggle="modal"
                                                    onClick={() => handleClickOverlay('reply', contact[index])}
                                                >
                                                    <i
                                                        className="fa-solid fa-reply"
                                                        data-toggle="tooltip"
                                                        title="reply"
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
                    totalItem={contact.length}
                    itemPerPage={itemPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            {/* Add */}
            {overlay && type === 'reply' && (
                <ReplyOverlay
                    onCancelbutton={() => setOverlay(false)}
                    id={selectedRow.id}
                    email={selectedRow.email}
                    message={selectedRow.message}
                    usernames={selectedRow.username}
                />
            )}

            {overlay && type === 'delete' && (
                <DeleteOverlay onCancelbutton={() => setOverlay(false)} isChecked={contact} typePost={"deleteContact"} />
            )}

            {/* 
            
            */}
        </>
    );
}

export default ContactManager;
