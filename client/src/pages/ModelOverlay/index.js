import { React, useEffect, useState } from 'react';
import '../../css/modelOverlay/overlay.css';
import DetailsService from './details';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import OurStaff from './staff';

function ModelOverlay(props) {
    // const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [screen, setScreen] = useState('');
    
    // navigate to login orm
    const handleDetail = () => {
        navigate(`/service/detail/${props.serviceID}`);
        localStorage.setItem('def_thumbnail',props.def_thumbnail)
    };
    // tooltip
    const tooltip = <Tooltip id="tooltip">Đi tới trang chi tiết</Tooltip>;
    let showScreen;

    // cancel
    let cancelClick = (e) => {
        if (e.target.className === 'main') props.onCancelbutton();
    };
    // //back
    // let goback = () => {
    //     setScreen((p) => p - 1);
    // };
    // //next
    // let nextPage = () => setScreen((p) => p + 1);

    useEffect(() => {
        if (props.serviceID) {
            setScreen(1);
        }
        if (props.staffID) {
            setScreen(2);
        }
    }, [props.serviceID, props.staffID]);

    if (props.serviceID) {
        showScreen = <DetailsService serviceID={props.serviceID} descrip={props.descrip} def_thumbnail={props.def_thumbnail}/>;
    }
    if (props.staffID) {
        showScreen = <OurStaff staffID={props.staffID} />;
    }

    // } else if (screen === 2) {
    //     showScreen = <OrderService nextPage={nextPage} serviceID={serviceID} />;
    //     nextflag = true;
    // } else if (screen === 3) {
    //     showScreen = <OurStaff nextPage={nextPage} />;
    //     nextflag = true;
    // }
    return (
        <div className="main" onClick={cancelClick}>
            <div
                className="main-overlay d-flex flex-column"
                style={screen === 2 ? { height: '65vh', width: '45%' } : {}}
            >
                <div className="head">
                    {/* {screen > 1 && (
                        <span className="back-arrow" onClick={goback}>
                            ←
                        </span>
                    )} */}
                    {screen === 1 && 'CHI TIẾT DỊCH VỤ'}
                    {screen === 2 && 'CHI TIẾT NHÂN VIÊN'}
                    <span className="cancel rouded-circle" onClick={props.onCancelbutton}>
                        <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.705 1.70498L10.295 0.294983L5.99998 4.58998L1.70498 0.294983L0.294983 1.70498L4.58998 5.99998L0.294983 10.295L1.70498 11.705L5.99998 7.40998L10.295 11.705L11.705 10.295L7.40998 5.99998L11.705 1.70498Z"
                                fill="black"
                            />
                        </svg>
                    </span>
                </div>
                {showScreen}
                {/* {currentUser ? (
                    nextflag ? (
                        <button className="btn text-white next-btn" onClick={nextPage}>
                            Tiếp theo
                        </button>
                    ) : (
                        <button className="btn text-white next-btn" onClick={nextPage}>
                            Hoàn thành
                        </button>
                    )
                ) : (
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <button className="btn text-white  next-btn" onClick={handleLogin}>
                            Đăng Nhập
                        </button>
                    </OverlayTrigger>
                )} */}
                {screen === 1 && (
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <button className="btn text-white  next-btn" onClick={handleDetail}>
                            Chi tiết
                        </button>
                    </OverlayTrigger>
                )}
            </div>
        </div>
    );
}

export default ModelOverlay;
