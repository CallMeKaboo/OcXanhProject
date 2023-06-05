import React, { useContext } from 'react';
import '../styles/navbar.css';
import logo from '../../assets/img/avatar/KH-logo/Kh1.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
function NavBar() {
    const { logoutAdmin } = useContext(AuthContext);
    

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    };
    return (
        <>
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow justify-content-end">
                {/* Topbar Search */}

                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                    {/* Nav Item - Search Dropdown (Visible Only XS) */}
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="searchDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-search fa-fw" />
                        </a>
                        {/* Dropdown - Messages */}
                        <div
                            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                            aria-labelledby="searchDropdown"
                        >
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0 small"
                                        placeholder="Search for..."
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>

                    {/* Nav Item - User Information */}
                    <li className="nav-item dropdown no-arrow me-3" onClick={handleClick}>
                        <Link
                            className="nav-link dropdown-toggle"
                            href=""
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="mr-2 d-none d-lg-inline text-dark small me-2">Admin</span>
                            <img className="img-profile rounded-circle" src={logo} alt="" />
                        </Link>
                        {/* Dropdown - User Information */}
                        <div
                            className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
                                show ? 'show' : ''
                            }`}
                            aria-labelledby="userDropdown"
                            style={{ right: '-19px', top: '75px' }}
                        >
                            <Link to={'/admin'} className="dropdown-item" href="#" onClick={logoutAdmin}>
                                <i className="fa-solid fa-arrow-right-from-bracket text-gray-400" />
                                Đăng xuất
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
            {/* End of Topbar */}
        </>
    );
}

export default NavBar;
