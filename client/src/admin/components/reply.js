import React from 'react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import ToastMessage from '../../components/CompoChild/Toast/toast';

import '../styles/modal.css';
import axios from 'axios';

function ReplyOverlay(props) {
    const [messages, setMessages] = useState('');
    const handleMesage = (e) => {
        setMessages(e.target.value);
    };
    // Toast
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_50yg3wg', 'template_rmrr5f7', e.target, 'hWFvgvDZ7_ltgq-xG').then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            },
        );
        e.target.reset();

        try {
            const res = axios.put('/api/adminUpdate/contact/' + props.id);
        } catch (error) {
            setMessage(error);
        }
        setMessage('Gửi thành công');
        setVariant('success');
        setShowToast(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <>
            {showToast && (
                <ToastMessage toast={showToast} setShowToast={setShowToast} message={message} variant={variant} />
            )}
            <div className="modal-admin modal-dialog">
                <div className="modal-content">
                    <form onSubmit={sendEmail}>
                        <div className="modal-header">
                            <h4 className="modal-title">Trả lời yêu cầu</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                                onClick={props.onCancelbutton}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Đang trả lời: <span className="text-success fs-5">{props.email}</span>{' '}
                            </p>
                            <div className="textarea">
                                <div className="inputrating__group">
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        name="username"
                                        defaultValue={props.username}
                                    />
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        name="your_message"
                                        defaultValue={props.message}
                                    />
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        name="email"
                                        defaultValue={props.email}
                                    />
                                    <textarea
                                        value={messages}
                                        onChange={handleMesage}
                                        className="ct"
                                        name="message"
                                        placeholder="Nhập câu trả lời ..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-default text-white">
                                Gửi câu trả lời
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ReplyOverlay;
