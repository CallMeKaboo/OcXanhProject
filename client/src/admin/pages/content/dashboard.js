import React, { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import Loading from '../../../components/CompoChild/Loading/loading';

import axios from 'axios';
import Money from '../../../utils/money';

function OverviewDash() {
    const { admin } = useState(AuthContext);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [count, setCount] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/adminGet/total`);
                setTotal(res.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    // console.log(total);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/adminGet/contact`);
                setCount(res.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    console.log(count);
    const handleNavigateContact = () => {
        window.location.href = '/admin/home/contact';
    };
    const handleNavigateReport = () => {
        window.location.href = '/admin/home/report';
    };
    return (
        <>
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Tổng quan</h1>
                    {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                        <i className="fas fa-download fa-sm text-white-50" /> Generate Report
                    </a> */}
                </div>
                {/* Content Row */}
                <div className="row">
                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body" onClick={handleNavigateReport}>
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Tổng doanh thu
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            {loading ? <Money value={total} /> : <Loading />}
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Earnings (Monthly) Card Example
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Earnings (Annual)
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Pending Requests Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body" onClick={handleNavigateContact}>
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Yêu cầu hỗ trợ
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            {loading ? count.length : <Loading />}
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-comments fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /.container-fluid */}

            {/* End of Content Wrapper */}
        </>
    );
}

export default OverviewDash;
