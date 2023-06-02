import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../../context/authContext.js';
import { Link, useLocation } from 'react-router-dom';

import { useContext, useState } from 'react';

import './navbar.css';
import MenuContext from '../../../components/CompoChild/ContextMenu/ContextMenu.jsx';
import SearchBar from './search/search-bar.js';

var logo = require('../../../assets/img/logo/Logo.png');
var ava = require('../../../assets/img/avatar/Kh4.png');

function AppNav() {
    const { currentUser, admin } = useContext(AuthContext);
    const [isDropDown, setDropDown] = useState(false);

    const handleMenu = () => {
        setDropDown(!isDropDown);
        // console.log(isDropDown);
    };

    let setLog = () => {
        window.location.href = `/login`;
    };
    const location = useLocation();
    // let setHome = () => {
    //     window.location.href = `./`;
    // };

    return (
        <Navbar bg="dark" expand="lg" variant="" fixed="top" className="text-uppercase position-relative">
            <Container>
                <Navbar.Brand>
                    <img src={logo} height="30" alt="" loading="lazy" />
                </Navbar.Brand>
                <Navbar.Toggle className="bg-light" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav className="flex-grow-1">
                        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                            Trang chủ
                        </Link>
                        <Link to="/service" className={`nav-link ${location.pathname === '/service' ? 'active' : ''}`}>
                            Dịch vụ
                        </Link>

                        {/* <NavDropdown title="Dịch vụ" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Vệ sinh</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Giúp việc</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                            Liên hệ
                        </Link>
                        <div className="m-auto">
                            <SearchBar />
                        </div>
                    </Nav>
                    <div className="nav-link login-avatar d-flex justify-content-end ">
                        {currentUser ? (
                            <>
                                <span className="text-white align-self-center mx-4">{currentUser.username}</span>
                                <div className="avatar positon-relative d-flex">
                                    <img
                                        className="rounded-circle"
                                        src={currentUser.avatar ? currentUser.avatar : ava}
                                        alt="#"
                                        onClick={handleMenu}
                                    />
                                </div>
                            </>
                        ) : (
                            <Button variant="success" onClick={setLog}>
                                Đăng nhập
                            </Button>
                        )}
                        {isDropDown && <MenuContext />}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default AppNav;
