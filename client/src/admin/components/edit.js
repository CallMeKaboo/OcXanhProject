import React, { useEffect, useState } from 'react';

import axios from 'axios';
import ToastMessage from '../../components/CompoChild/Toast/toast';
import '../styles/modal.css';
import { useNavigate } from 'react-router-dom';

function EditOverlay(props) {
    const [type, setType] = useState({});
    const [apiLoad, setApiLoad] = useState(false);

    const navigate = useNavigate();

    // console.log(props.type, type);
    // Toast
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showToast, setShowToast] = useState(false);

    const [inputService, setInputService] = useState({
        sName: props.data.name,
        sType: props.data.type === 'Vệ sinh' ? 2 : 3,
        sFeature: props.data.feature,
        sDesc: props.data.desc,
        sDuration: props.data.duration,
        sPrice: props.data.price,
        sThumbnail: props.data.thumbnail,
    });

    const handleServiceChange = (event) => {
        setInputService({ ...inputService, [event.target.name]: event.target.value });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/adminGet/service/`);
                setType(res.data);
                setApiLoad(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    console.log(props.data.feature);
    console.log(JSON.stringify(inputService.sFeature));
    // console.log(
    //     typeof JSON.stringify(inputService.sFeature)
    //         .split(',')
    //         .map((feature) => feature.trim())
    //         .join(','),
    // );
    const handleService = (e) => {
        e.preventDefault();
        try {
            const res = axios.put('/api/adminUpdate/service/' + props.data.id, {
                name: inputService.sName,
                thumbnail: inputService.sThumbnail.split('\\').pop(),
                // imgs: inputService.sImgs,
                desc: inputService.sDesc,
                feature: JSON.stringify(inputService.sFeature)
                    .split(',')
                    .map((feature) => feature.trim())
                    .join(','),
                price: inputService.sPrice,
                service_id: inputService.sType,
                duration: inputService.sDuration,
            });
            console.log(res.data);

            setMessage('Cập nhật thành công');
            setVariant('success');
            setShowToast(true);
            // setTimeout(() => window.location.reload(), 2000);
            setTimeout(() => {
                window.location.replace(window.location.href);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    const [inputStaff, setInputStaff] = useState({
        sfName: props.data.fullName,
        sDob: props.type === 2 ? new Date(props.data.dob).toISOString().substring(0, 10) : '',
        sGender: props.data.gender,
        sPhone: props.data.phone,
        sAddress: props.data.address,
        sSalary: props.data.salary,
        sDIn: props.type === 2 ? new Date(props.data.date_in).toISOString().substring(0, 10) : '',
        sAva: props.data.avatar,
    });

    const handleStaffChange = (event) => {
        setInputStaff({ ...inputStaff, [event.target.name]: event.target.value });
    };
    // const a = new Date(inputStaff.sDIn);

    const handleStaff = (e) => {
        e.preventDefault();
        try {
            const res = axios.put('/api/adminUpdate/staff/' + props.data.id, {
                fullName: inputStaff.sfName,
                avatar: inputStaff.sAva.split('\\').pop(),
                date_in: inputStaff.sDIn,
                dob: inputStaff.sDob,
                gender: inputStaff.sGender,
                phone: inputStaff.sPhone,
                address: inputStaff.sAddress,
                salary: inputStaff.sSalary,
            });
            console.log(res.data);
            setMessage('Cập nhật thành công');
            setVariant('success');
            setShowToast(true);
            setTimeout(() => {
                window.location.replace(window.location.href);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {showToast && (
                <ToastMessage toast={showToast} setShowToast={setShowToast} message={message} variant={variant} />
            )}
            <div className=" modal-admin modal-dialog">
                <div className="modal-content">
                    <form onSubmit={props.type === 1 ? handleService : handleStaff}>
                        <div className="modal-header">
                            <h4 className="modal-title">{props.name}</h4>
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
                            {props.type === 1 && (
                                <>
                                    <div className="form-group mb-2">
                                        <label>Tên dịch vụ</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            name="sName"
                                            value={inputService.sName}
                                            onChange={handleServiceChange}
                                        />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label>Loại dịch vụ</label>
                                        <select
                                            value={inputService.sType}
                                            name="sType"
                                            className="form-select"
                                            onChange={handleServiceChange}
                                        >
                                            {apiLoad
                                                ? type.map((e) => (
                                                      <option key={e.id} value={e.id}>
                                                          {e.name}
                                                      </option>
                                                  ))
                                                : null}
                                        </select>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Tính năng</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            name="sFeature"
                                            value={inputService.sFeature}
                                            onChange={handleServiceChange}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Mô tả</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            required=""
                                            name="sDesc"
                                            value={inputService.sDesc}
                                            onChange={handleServiceChange}
                                            style={{ height: '130px', resize: 'none' }}
                                        />
                                    </div>
                                    <div className="form-group d-flex justify-content-between mb-2">
                                        <div className="col-6" style={{ width: '45%' }}>
                                            <label>Thời lượng</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                required
                                                name="sDuration"
                                                value={inputService.sDuration}
                                                onChange={handleServiceChange}
                                            />
                                        </div>
                                        <div className="col-6 " style={{ width: '45%' }}>
                                            <label>Giá</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                required
                                                name="sPrice"
                                                value={inputService.sPrice}
                                                onChange={handleServiceChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Ảnh bìa</label>
                                        <input
                                            type={inputService.sThumbnail ? 'text' : 'file'}
                                            className="form-control"
                                            required=""
                                            name="sThumbnail"
                                            value={inputService.sThumbnail}
                                            onChange={handleServiceChange}
                                        />
                                    </div>
                                </>
                            )}
                            {props.type === 2 && (
                                <>
                                    <div className="form-group mb-2">
                                        <label>Họ và tên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            name="sfName"
                                            value={inputStaff.sfName}
                                            onChange={handleStaffChange}
                                        />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label>Ngày sinh</label>
                                        <input
                                            type="date"
                                            value={inputStaff.sDob}
                                            name="sDob"
                                            required
                                            className="form-control"
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Giới tính</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            name="sGender"
                                            value={inputStaff.sGender}
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Ngày vào</label>
                                        <input
                                            type="date"
                                            value={inputStaff.sDIn}
                                            name="sDIn"
                                            required
                                            className="form-control"
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Điện thoại</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            name="sPhone"
                                            value={inputStaff.sPhone}
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Địa chỉ</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            name="sAddress"
                                            value={inputStaff.sAddress}
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Lương</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            name="sSalary"
                                            value={inputStaff.sSalary}
                                            onChange={handleStaffChange}
                                        />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label>Ảnh đại diện</label>
                                        <input
                                            type={inputStaff.sAva ? 'text' : 'file'}
                                            className="form-control"
                                            required=""
                                            name="sAva"
                                            value={inputStaff.sAva}
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            {/* <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" /> */}
                            <input type="submit" className="btn btn-info text-white" defaultValue="Save" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditOverlay;
