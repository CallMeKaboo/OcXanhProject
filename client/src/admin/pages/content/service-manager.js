import React, { useEffect, useState } from 'react';
import Loading from '../../../components/CompoChild/Loading/loading';
import '../../styles/table.css';
import axios from 'axios';
import AddOverlay from '../../../admin/components/add';
import DeleteOverlay from '../../../admin/components/delete';
import EditOverlay from '../../../admin/components/edit';
import Pagination from '../../../components/CompoChild/Pagination/pagination';
import Money from '../../../components/CompoChild/Money/money';
function ServiceManager() {
    // console.log("kkk");
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [overlay, setOverlay] = useState(false);
    const [type, setType] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);

    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;
    // const firstItemIndex = (currentPage - 1) * itemPerPage;
    // const lastItemIndex = firstItemIndex + itemPerPage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/adminGet/serviceD`);
                setService(res.data);
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
            const checkedValue = service.map((value) => {
                return { ...value, isChecked: checked };
            });

            setService(checkedValue);
        } else {
            const checkedValue = service.map((value) =>
                value.id.toString() === id ? { ...value, isChecked: checked } : value,
            );
            console.log(checkedValue);
            setService(checkedValue);
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
                                                checked={!service.some((value) => value?.isChecked !== true)}
                                                onChange={handleCheckBox}
                                            />
                                            <label htmlFor="selectAll" />
                                        </span>
                                    </th>
                                    <th>Tên dịch vụ</th>
                                    <th>Loại</th>
                                    <th>Tính năng</th>
                                    <th>Thời lượng</th>
                                    <th>Giá</th>
                                    <th style={{width: '7%'}}>Công cụ</th>
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
                                                        id={value.id}
                                                        value={value.id}
                                                        checked={value?.isChecked || false}
                                                        onChange={handleCheckBox}
                                                    />
                                                    <label htmlFor={`checkbox${index}`} />
                                                </span>
                                            </td>
                                            <td>{value.name}</td>
                                            <td>{value.type}</td>
                                            <td>{Array(value.feature).join(', ')}</td>
                                            <td>{value.duration} Tiếng</td>
                                            <td><Money value={value.price} /></td>
                                            <td className="text-center">
                                                <a
                                                    className="edit"
                                                    data-toggle="modal"
                                                    onClick={() =>
                                                        handleClickOverlay('edit', service[firstItemIndex + index])
                                                    }
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
            <div className="row" style={{ margin: '100px 47px 0 47px' }}>
                <Pagination
                    totalItem={service.length}
                    itemPerPage={itemPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            {/* Add */}
            {overlay && type === 'add' && (
                <AddOverlay onCancelbutton={() => setOverlay(false)} name={'Thêm dịch vụ mới'} type={1} />
            )}

            {overlay && type === 'delete' && (
                <DeleteOverlay
                    onCancelbutton={() => setOverlay(false)}
                    isChecked={service}
                    typePost={'deleteService'}
                />
            )}
            {overlay && type === 'edit' && (
                <EditOverlay
                    onCancelbutton={() => setOverlay(false)}
                    name={'Sửa dịch vụ'}
                    type={1}
                    data={selectedRow}
                />
            )}

            {/* 
            
            */}
        </>
    );
}

export default ServiceManager;
