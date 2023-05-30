import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../../../context/authContext.js';
import { useContext, useState } from 'react';

import '../../../components/CompoChild/ContextMenu/context-menu.css';
import { Link } from 'react-router-dom';

const link = [
    {
        id: uuid(),
        text: 'Cá nhân',
        src: require('../../../assets/img/logo/user.png'),
        to: "/profile"
    },
    {
        id: uuid(),
        text: 'Lịch sử',
        src: require('../../../assets/img/logo/history.png'),
        to: "/history"
    },

    {
        id: uuid(),
        text: 'Đăng xuất',
        src: require('../../../assets/img/logo/log-out.png'),
        to:"/login"
    },
];
function MenuContext() {
    const { logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = () => {
        setIsOpen(false);
    };

    return (
        <ul className="user-menu" style={{ display: isOpen ? 'block' : 'none' }}>
            {link.slice(0,2).map((data, index) => (
                <li className="user-menu__item" key={data.id} onClick={handleClick}>
                    <Link to={data.to} className="user-menu-link">
                        <img src={data.src} alt={data.text} width={20} height={20} />
                        <div>{data.text}</div>
                    </Link>
                </li>
            ))}

            <div className="end">
                <li className="user-menu__item" onClick={logout} >
                    <Link to={link[2].to} className="user-menu-link" style={{ color: '#F44336' }} onClick={handleClick}>
                        <img src={link[2].src} alt={link[2].text} width={20} height={20} />
                        <div>{link[2].text}</div>
                    </Link>
                </li>
            </div>
        </ul>
    );
}

export default MenuContext;
