import React, { useEffect, useState } from 'react';
import Loading from '../../../components/CompoChild/Loading/loading';
import '../../styles/table.css';
import axios from 'axios';
import AddOverlay from '../../../admin/components/add';
import DeleteOverlay from '../../../admin/components/delete';
import EditOverlay from '../../../admin/components/edit';
import Pagination from '../../../components/CompoChild/Pagination/pagination';


function ContactManager() {
    const [contact, setContact] = useState([]);
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
                const res = await axios.get(`/api/admin/contact`);
                setContact(res.data);
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
    useEffect(() => {localStorage.setItem('contact_request',contact.length)},[contact.length]);
    return (
        <>
            <div className="container-xl">
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
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th style={{ width: '50%' }}>Yêu cầu hỗ trợ</th>
                                    <th>Công cụ</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    {contact.slice(firstItemIndex,lastItemIndex).map((value, index) => (
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
                                            <td>{value.fullName}</td>
                                            <td>{value.email}</td>
                                            <td style={{ width: '50%' }}>{value.message}</td>

                                            <td className="text-center">
                                                <a
                                                    className="edit"
                                                    data-toggle="modal"
                                                    onClick={() => {
                                                        if (value.status === 0) value.status = 1;
                                                        else value.status = 0;
                                                    }}
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
                                <Loading />
                            )}
                        </table>
                        
                    </div>
                </div>
                <div class="row" style={{ marginTop: 80 + 'px' }}>
                    <Pagination
                        totalItem={contact.length}
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

export default ContactManager;
