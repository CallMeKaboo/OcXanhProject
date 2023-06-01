import React, { useEffect, useState } from 'react';
import '../styles/modal.css';
import axios from 'axios';
import ToastMessage from '../../components/CompoChild/Toast/toast';

function EditOverlay(props) {
    const [type, setType] = useState({});
    const [apiLoad, setApiLoad] = useState(false);

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
    console.log(inputService.sFeature);
    const handleService = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put('/api/adminUpdate/service/' + props.data.id, {
                name: inputService.sName,
                thumbnail: inputService.sThumbnail.split('\\').pop(),
                // imgs: inputService.sImgs,
                desc: inputService.sDesc,
                feature: JSON.stringify(inputService.sFeature.split(',').map((feature) => feature.trim())),
                price: inputService.sPrice,
                service_id: inputService.sType,
                duration: inputService.sDuration,
            });

            setMessage('Thêm thành công');
            setVariant('success');
            setShowToast(true);
            setTimeout(() => window.location.reload(), 2000);
        } catch (error) {
            console.log(error);
        }
    };

    const [inputStaff, setInputStaff] = useState({
        sfName: props.data.fullName,
        sDob: new Date(props.data.dob).toISOString().substring(0, 10),
        sGender: props.data.gender,
        sPhone: props.data.phone,
        sAddress: props.data.address,
        sSalary: props.data.salary,
        sDIn: new Date(props.data.date_in).toISOString().substring(0, 10),
        sAva: props.data.avatar,
    });

    const handleStaffChange = (event) => {
        setInputStaff({ ...inputStaff, [event.target.name]: event.target.value });
    };
    const a = new Date(inputStaff.sDIn);
    console.log(a);

    const handleStaff = (e) => {
        // e.preventDefault();
        try {
            axios.put('/api/adminUpdate/staff/' + props.data.id, {
                fullName: inputStaff.sfName,
                avatar: inputStaff.sAva.split('\\').pop(),
                date_in: inputStaff.sDIn,
                dob: inputStaff.sDob,
                gender: inputStaff.sGender,
                phone: inputStaff.sPhone,
                address: inputStaff.sAddress,
                salary: inputStaff.sSalary,
            });
            setMessage('Thêm thành công');
            setVariant('success');
            setShowToast(true);
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
                                    <div className="form-group">
                                        <label>Tên dịch vụ</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required=""
                                            name="sName"
                                            value={inputService.sName}
                                            onChange={handleServiceChange}
                                        />
                                    </div>

                                    <div className="form-group">
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
                                    <div className="form-group">
                                        <label>Tính năng</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required=""
                                            name="sFeature"
                                            value={inputService.sFeature}
                                            onChange={handleServiceChange}
                                        />
                                    </div>
                                    <div className="form-group">
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
                                    <div className="form-group d-flex justify-content-between">
                                        <div className="col-6" style={{ width: '45%' }}>
                                            <label>Thời lượng</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                required=""
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
                                                required=""
                                                name="sPrice"
                                                value={inputService.sPrice}
                                                onChange={handleServiceChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
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
                                    <div className="form-group">
                                        <label>Họ và tên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required=""
                                            name="sfName"
                                            value={inputStaff.sfName}
                                            onChange={handleStaffChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Ngày sinh</label>
                                        <input
                                            type="date"
                                            value={inputStaff.sDob}
                                            name="sDob"
                                            className="form-control"
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Giới tính</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required=""
                                            name="sGender"
                                            value={inputStaff.sGender}
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày vào</label>
                                        <input
                                            type="date"
                                            value={inputStaff.sDIn}
                                            name="sDIn"
                                            className="form-control"
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Điện thoại</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required=""
                                            name="sPhone"
                                            value={inputStaff.sPhone}
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                    <div className="form-group ">
                                        <label>Địa chỉ</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required=""
                                            name="sAddress"
                                            value={inputStaff.sAddress}
                                            onChange={handleStaffChange}
                                        />
                                    </div>
                                    <div className="form-group ">
                                        <label>Lương</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required=""
                                            name="sSalary"
                                            value={inputStaff.sSalary}
                                            onChange={handleStaffChange}
                                        />
                                    </div>

                                    <div className="form-group">
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
