import { useEffect } from 'react';
import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

function ToastMessage(props) {
    const { toast, setShowToast } = props;

    useEffect(() => {
        setShowToast(toast);
    }, [toast, setShowToast]);
    return (
        <ToastContainer position="top-end">
            <Toast
                className="d-inline-block m-1"
                bg={props.variant}
                // onClose={() => setShowToast(false)}
                show={toast}
                delay={1000}
                autohide
            >
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Thông báo</strong>
                    <small>1s trước</small>
                </Toast.Header>
                <Toast.Body className={props.variant === 'success' && 'text-white'}>
                    {props.message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastMessage;
