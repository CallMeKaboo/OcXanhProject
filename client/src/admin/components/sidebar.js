import React from 'react';
import '../styles/sidebar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const sideBarData = [
    {
        name: 'Tổng quan',
        to: '/admin/home/overview',
    },
    {
        name: 'Quản lý dịch vụ',
        to: '/admin/home/service',
    },
    {
        name: 'Quản lý nhân viên',
        to: '/admin/home/staff',
    },
    {
        name: 'Quản lý người dùng',
        to: '/admin/home/user',
    },
    {
        name: 'Quản lý lịch đặt',
        to: '/admin/home/booking',
    },
    {
        name: 'Quản lý hỗ trợ',
        to: '/admin/home/contact',
    },
    {
        name: 'Báo cáo thống kê',
        to: '/admin/home/report',
    },
];

function SideBar() {
    const [active, setActive] = useState(0);
    const handleOnClick = (index) => {
        setActive(index);
    };
    return (
        <>
            {/* Sidebar */}
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-text ms-3">OcXanh Admin</div>
                </a>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                {sideBarData.map((value, index) => (
                    <li className={`nav-item ${active === index ? 'active' : ''}`} key={index} onClick={()=>handleOnClick(index)}>
                        <Link to={value.to} className="nav-link" >
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span style={{fontSize:"18px"}}>{value.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            {/* End of Sidebar */}
        </>
    );
}

export default SideBar;
