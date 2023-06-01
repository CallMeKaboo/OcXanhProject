import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import { useDownloadExcel } from 'react-export-table-to-excel';

import AddOverlay from '../../../admin/components/add';
import DeleteOverlay from '../../../admin/components/delete';
import EditOverlay from '../../../admin/components/edit';
import Loading from '../../../components/CompoChild/Loading/loading';
import '../../styles/table.css';
import Pagination from '../../../components/CompoChild/Pagination/pagination';

function ReportManager() {
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false);

    const [overlay, setOverlay] = useState(false);
    const [type, setType] = useState('');

    const [total, setTotal] = useState(0);

    const tableRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(6);

    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/adminGet/report`);
                setReport(res.data);
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

    const getRowSpan = (type, index) => {
        let count = 1;
        let nextIndex = index + 1;
        while (nextIndex < report.length && report[nextIndex].type === type) {
            count++;
            nextIndex++;
        }
        return count;
    };

    // Total money
    const calculateTotal = () => {
        const sum = report.reduce((accumulator, value) => accumulator + parseFloat(value.tong), 0);
        setTotal(sum);
    };

    useEffect(() => {
        calculateTotal();
    }, [report]);
    localStorage.setItem('total', numeral(total).format('0,0'));
    // Export excel
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users',
    });
    return (
        <>
            <div className="container-xl" style={{height: "440px"}}>
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <h2>Báo cáo doanh thu</h2>
                                </div>
                                <div className="col-sm-6">
                                    <a className="btn btn-success" data-toggle="modal" onClick={onDownload}>
                                        <i className="fa-solid fa-file-export"></i> <span>Xuất Excel</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <table className="table" ref={tableRef}>
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>Loại dịch vụ</th>
                                    <th style={{ width: '30%' }}>Tên dịch vụ</th>
                                    <th>Số đơn</th>
                                    <th style={{ width: '30%' }}>Tổng tiền</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody className="table-hover">
                                    {report.slice(firstItemIndex, lastItemIndex).map((value, index) => (
                                        <tr key={index}>
                                            {index === 0 || value.type !== report[index - 1].type ? (
                                                <td rowSpan={getRowSpan(value.type, index)}>{value.type}</td>
                                            ) : null}
                                            <td>{value.name}</td>
                                            <td>{value.sodon}</td>
                                            <td>{numeral(value.tong).format('0,0')} VNĐ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <Loading />
                            )}
                            <tfoot>
                                <tr>
                                    <th colSpan={3} className="text-center">
                                        Tổng doanh thu
                                    </th>
                                    <th>{numeral(total).format('0,0')} VNĐ</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                
            </div>
            <div class="row" style={{ margin: "80px 47px 0 47px" }}>
                <Pagination
                    totalItem={report.length}
                    itemPerPage={itemPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            {/* Add */}
            {overlay && type === 'add' && <AddOverlay onCancelbutton={() => setOverlay(false)} />}

            {overlay && type === 'delete' && <DeleteOverlay onCancelbutton={() => setOverlay(false)} />}
            {overlay && type === 'edit' && <EditOverlay onCancelbutton={() => setOverlay(false)} />}
        </>
    );
}

export default ReportManager;
