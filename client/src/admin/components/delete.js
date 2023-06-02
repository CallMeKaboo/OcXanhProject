import axios from 'axios';
import React, { useState } from 'react';
import ToastMessage from '../../components/CompoChild/Toast/toast';

function DeleteOverlay(props) {
    // Toast
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);
    const multipleDelete = async () => {
        const checkedInputValue = [];
        const data = props.isChecked;
        for (let i = 0; i < data.length; i++) {
            if (data[i].isChecked === true) {
                checkedInputValue.push(parseInt(data[i].id));
            }
        }

        try {
            const res = await axios.post('/api/adminPost/' + props.typePost, {
                ids: checkedInputValue,
            });
            setMessage('Xóa thành công');
            setVariant('success');
            setShowToast(true);
            console.log(showToast);
            setTimeout(() => window.location.reload(), 2000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {showToast && (
                <ToastMessage toast={showToast} setShowToast={setShowToast} message={message} variant={variant} />
            )}
            <div className="modal-admin modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Xóa bản ghi</h4>
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
                        <p>Bạn có chắc muốn xóa những bản ghi vừa chọn ?</p>
                        <p className="text-warning">
                            <small>Hành dộng này không thể khôi phục.</small>
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="submit"
                            className="btn btn-danger ms-3"
                            defaultValue="Delete"
                            onClick={multipleDelete}
                        >
                            Đồng ý
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteOverlay;
