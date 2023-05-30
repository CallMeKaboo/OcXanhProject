import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-step-progress-bar/styles.css';
import OverviewDetail from './screen/overview';
import OrderDetail from './screen/order-detail';
import Payment from './screen/payment';
import ToastMessage from '../../components/CompoChild/Toast/toast';

import axios from 'axios';
import '../../css/booking/booking.css';

const steps = [
    {
        label: 'Chi tiết dịch vụ',
        step: 1,
    },
    {
        label: 'Thông tin của bạn',
        step: 2,
    },
    {
        label: 'Thanh toán',
        step: 3,
    },
];

function BookingService() {
    let componentToRender;
    // const location = useLocation();
    const navigate = useNavigate();
    // Toast
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState({});

    const [activeStep, setActiveStep] = useState(1);

    const [screen, setScreen] = useState(1);

    const [inputs, setInputs] = useState({
        user_id: '',
        service_detail_id: '',
        cleaner_id: '',
        payment_id: '',
        cleaning_date: '',
        cleaning_time: '',
        address: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
    });

    const localStorageData = () => {
        let data = {
            user_id: JSON.parse(localStorage.getItem('user')).id,
            service_detail_id: localStorage.getItem('service_id'),
            cleaner_id: localStorage.getItem('staff') ? JSON.parse(localStorage.getItem('staff')).id : {},
            payment_id: localStorage.getItem('payment_id'),

            cleaning_date: localStorage.getItem('date_stamp'),
            cleaning_time: localStorage.getItem('time_stamp'),
            address:
                localStorage.getItem('address') +
                ',' +
                localStorage.getItem('ward') +
                ',' +
                localStorage.getItem('district') +
                ',' +
                localStorage.getItem('province'),
            contact_name: localStorage.getItem('fullName'),
            contact_phone: localStorage.getItem('phoneNumber'),
            contact_email: localStorage.getItem('email'),
        };

        if (data === '') return null;
        else return data;
    };

    // screen movement

    const nextStep = () => {
        setActiveStep(activeStep + 1);
        setScreen(screen + 1);
    };

    const prevStep = () => {
        setActiveStep(activeStep - 1);
        setScreen(screen - 1);
    };

    const totalSteps = steps.length;

    const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

    if (screen === 1) {
        componentToRender = <OverviewDetail />;
    } else if (screen === 2) {
        componentToRender = <OrderDetail />;
    } else if (screen === 3) {
        componentToRender = <Payment />;
    }

    // update local data
    const updateInputsFromLocalStorage = () => {
        const data = localStorageData();

        setInputs(data);
    };
    useEffect(() => {
        updateInputsFromLocalStorage();
    }, [
        localStorage.getItem('staff'),
        localStorage.getItem('address'),
        localStorage.getItem('ward'),
        localStorage.getItem('district'),
        localStorage.getItem('province'),
        localStorage.getItem('fullName'),
        localStorage.getItem('phoneNumber'),
        localStorage.getItem('email'),
        localStorage.getItem('payment_id'),
    ]);
    // Handle payment
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/bookings/post', {
                user_id: inputs.user_id,
                service_detail_id: inputs.service_detail_id,
                cleaner_id: inputs.cleaner_id,
                payment_id: inputs.payment_id,
                cleaning_date: inputs.cleaning_date,
                cleaning_time: inputs.cleaning_time,
                address: inputs.address,
                contact_name: inputs.contact_name,
                contact_phone: inputs.contact_phone,
                contact_email: inputs.contact_email,
            });

            const user = localStorage.getItem('user');
            const rememberedUsername = localStorage.getItem('rememberedUsername');
            const rememberedPassword = localStorage.getItem('rememberedPassword');
            const rememberedCheckbox = localStorage.getItem('rememberedCheckbox');

            // Xóa toàn bộ dữ liệu trong localStorage
            // Đặt lại 2 trường rememberedUsername và rememberedPassword

            localStorage.clear();
            localStorage.setItem('user', user);
            localStorage.setItem('rememberedUsername', rememberedUsername);
            localStorage.setItem('rememberedPassword', rememberedPassword);
            localStorage.setItem('rememberedCheckbox', rememberedCheckbox);
            setMessage('Đặt lịch thành công');
            setVariant('success');
            setShowToast(true);
            setTimeout(() => {
                navigate('/service');
            }, 1000);
        } catch (err) {
            console.log(err);

            // setError(err.response.data.errors);
        }
    };

    return (
        <>
            {showToast && (
                <ToastMessage toast={showToast} setShowToast={setShowToast} message={message} variant={variant} />
            )}
            <main className="my-5 main-container">
                <div className="progress-contain" style={{ '--after-width': width }}>
                    {steps.map(({ step, label }) => (
                        <div className="wrapper" key={step}>
                            <div
                                className="step-style p-2"
                                step={activeStep >= step ? 'completed' : 'incomplete'}
                                style={{
                                    backgroundColor: `${
                                        (activeStep >= step ? 'completed' : 'incomplete') === 'completed'
                                            ? '#009c3b'
                                            : '#F3E7F3'
                                    }`,
                                }}
                            >
                                <div
                                    className="step-lable"
                                    style={{
                                        color: `${
                                            (activeStep >= step ? 'completed' : 'incomplete') === 'completed'
                                                ? '#fff'
                                                : '#000'
                                        }`,
                                    }}
                                >
                                    {label}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* /.job-tab */}
                </div>
                <section className="mt-5">{componentToRender}</section>
                <div className="button-contain mt-0">
                    <button className="btn button-style" onClick={prevStep} disabled={activeStep === 1 ? true : false}>
                        Trước
                    </button>

                    {activeStep === totalSteps ? (
                        <button className="btn button-style" onClick={handleSubmit}>
                            Hoàn thành
                        </button>
                    ) : (
                        <button className="btn button-style" onClick={activeStep === totalSteps ? null : nextStep}>
                            Tiếp tục
                        </button>
                    )}
                </div>
                {/* {showDialog && <Dialog/>} */}
            </main>
        </>
    );
}

export default BookingService;
