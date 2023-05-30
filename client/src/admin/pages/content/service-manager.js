import React, { useEffect, useState } from 'react';
import Loading from '../../../components/CompoChild/Loading/loading';
import '../../styles/table.css';
import axios from 'axios';
import AddOverlay from '../../../admin/components/add';
import DeleteOverlay from '../../../admin/components/delete';
import EditOverlay from '../../../admin/components/edit';
import Pagination from '../../../components/CompoChild/Pagination/pagination';
function ServiceManager() {
    // console.log("kkk");
    const [service, setService] = useState([]);
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
                const res = await axios.get(`/api/admin/service`);
                setService(res.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleClickOverlay = (overlayType,id) => {
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
                                        Quản lý <b>Dịch vụ</b>
                                    </h2>
                                </div>
                                <div className="col-sm-6">
                                    <a
                                        className="btn btn-success"
                                        data-toggle="modal"
                                        onClick={() => handleClickOverlay('add')}
                                    >
                                        <i className="fa-solid fa-circle-plus"></i> <span>Thêm dịch vụ mới</span>
                                    </a>
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
                                    <th>Tên dịch vụ</th>
                                    <th>Loại</th>
                                    <th>Tính năng</th>
                                    <th>Thời lượng</th>
                                    <th>Giá</th>
                                    <th>Công cụ</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody>
                                    {service.slice(firstItemIndex, lastItemIndex).map((value, index) => (
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
                                            <td>{value.name}</td>
                                            <td>{value.type}</td>
                                            <td>{Array(value.feature).join(', ')}</td>
                                            <td>{value.duration} Tiếng</td>
                                            <td>{value.price} VNĐ</td>
                                            <td>
                                                <a
                                                    className="edit"
                                                    data-toggle="modal"
                                                    onClick={() => handleClickOverlay('edit')}
                                                >
                                                    <i
                                                        className="fa-solid fa-pencil"
                                                        data-toggle="tooltip"
                                                        title="Edit"
                                                    ></i>
                                                </a>
                                                <a
                                                    className="delete"
                                                    data-toggle="modal"
                                                    onClick={() => handleClickOverlay('delete',value.id)}
                                                >
                                                    <i
                                                        class="fa-solid fa-trash"
                                                        data-toggle="tooltip"
                                                        title="Delete"
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
                        totalItem={service.length}
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

export default ServiceManager;
