import React from 'react';
import '../styles/sidebar.css';
import { Link } from 'react-router-dom';
function SideBar() {
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
                <li className="nav-item active">
                    <Link to={'/admin/home/overview'} className="nav-link" >
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Tổng quan</span>
                    </Link>
                </li>

                {/* Nav Item - Tables */}
                <li className="nav-item">
                    <Link to={'/admin/home/service'} className="nav-link">
                        <i className="fas fa-fw fa-table" />
                        <span>Quản lý dịch vụ</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/admin/home/staff'} className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table" />
                        <span>Quản lý nhân viên</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/admin/home/user'} className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table" />
                        <span>Quản lý người dùng</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/admin/home/booking'} className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table" />
                        <span>Quản lý lịch đặt</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/admin/home/contact'} className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table" />
                        <span>Quản lý hỗ trợ</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/admin/home/report'} className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table" />
                        <span>Báo cáo thống kê</span>
                    </Link>
                </li>
                
                
                
            </ul>
            {/* End of Sidebar */}
        </>
    );
}

export default SideBar;
