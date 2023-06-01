import { React, useEffect, useState } from 'react';
import '../../../css/booking/screen/order-detail.css';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

function OrderDetail() {
    const { currentUser } = useContext(AuthContext);
    // Load address of VN
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Load provinces
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resProvince = await axios.get('/api/dropdowns/province');
                setProvinces(resProvince.data);

                // console.log(loading);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    // Handle select province

    const [selectedProvince, setSelectedProvince] = useState('Tỉnh/Thành phố');

    const [selectedProvinceId, setSelectedProvinceId] = useState('');

    const handleSelectProvince = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedValue = event.target.value;
        const selectedProvinceId = provinces[selectedIndex - 1].id;

        setSelectedProvince(selectedValue);
        setSelectedProvinceId(selectedProvinceId);
    };

    // Load districts
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedProvinceId) {
                    const resDis = await axios.get(`/api/dropdowns/district/${selectedProvinceId}`);
                    setDistricts(resDis.data);
                } else return 0;

                // console.log(loading);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [selectedProvinceId]);

    // Handle district select
    const [selectedDistrict, setSelectedDistrict] = useState('Quận/Huyện');
    const [selectedDistrictId, setSelectedDistrictId] = useState('');

    const handleSelectDistrict = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedValue = event.target.value;
        const selectedDistrictId = districts[selectedIndex - 1].id;

        setSelectedDistrict(selectedValue);
        setSelectedDistrictId(selectedDistrictId);
    };

    // Load ward data
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedDistrictId) {
                    const resWard = await axios.get(`/api/dropdowns/ward/${selectedDistrictId}`);
                    setWards(resWard.data);
                } else return 0;
                // console.log(loading);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [selectedDistrictId]);

    // Handle select ward
    const [selectedWard, setSelectedWard] = useState('Phường/Xã');
    const handleSelectWard = (event) => {
        setSelectedWard(event.target.value);
    };

    const [fullName, setFullName] = useState(currentUser.fullName);
    const [phoneNumber, setPhoneNumber] = useState(currentUser.phone);
    const [email, setEmail] = useState(currentUser.email);
    //
    const [inputAddress, setInputAddress] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Xử lý dựa trên tên của input
        switch (name) {
            case 'address':
                setInputAddress(value);
                break;
            case 'fullName':
                setFullName(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'email':
                setEmail(value);
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        localStorage.setItem('address', inputAddress);
        localStorage.setItem('province', selectedProvince);
        localStorage.setItem('ward', selectedWard);
        localStorage.setItem('district', selectedDistrict);
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('phoneNumber', phoneNumber);
        localStorage.setItem('email', email);
    }, [inputAddress, selectedProvince, selectedWard, selectedDistrict, fullName, phoneNumber, email]);

    // const onNext = () => {
    //     localStorage.setItem('date_stamp', formattedDate);
    //     localStorage.setItem('address_stamp', `${inputValue}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`);
    // }

    return (
        <div className="row m-0 h-100">
            <div className="col-6 dropdown ps-0">
                <div className="box-inner-1 py-4 px-3 mb-4 ">
                    <div className="row m-0 title">
                        <p>Chọn địa chỉ</p>
                    </div>

                    <div className="row m-0 pe-3">
                        <select
                            value={selectedProvince}
                            name="city_select_box"
                            className="form-select select_box"
                            onChange={handleSelectProvince}
                        >
                            <option value="Tỉnh/Thành phố" disabled>
                                Tỉnh/Thành phố
                            </option>
                            {provinces.map((e) => (
                                <option key={e.id} value={e.name}>
                                    {e.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedDistrict}
                            name="district_select_box"
                            className="form-select select_box"
                            onChange={handleSelectDistrict}
                        >
                            <option value="Quận/Huyện" disabled>
                                Quận/Huyện
                            </option>
                            {selectedProvince ? (
                                districts.map((e) => (
                                    <option key={e.id} value={e.name}>
                                        {e.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    Vui lòng chọn tỉnh/thành phố
                                </option>
                            )}
                        </select>
                        <select
                            value={selectedWard}
                            name="ward_select_box"
                            className="form-select select_box"
                            onChange={handleSelectWard}
                        >
                            <option value="Phường/Xã" disabled>
                                Phường/Xã
                            </option>
                            {wards.map((e) => (
                                <option key={e.id} value={e.name}>
                                    {e.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="address"
                            value={inputAddress}
                            className="form-control input_box mb-0"
                            placeholder="Số nhà, ngõ, ngách,...."
                            onChange={handleInputChange}
                        />
                    </div>
                    <p className="pe-0 mt-3 h-25 font-weight-bold text-weight " style={{ paddingLeft: 15 + 'px' }}>
                        Địa chỉ hiện tại:{' '}
                        {inputAddress && selectedWard && selectedDistrict && selectedProvince && (
                            <span style={{ fontSize: 14 + 'px' }}>
                                {inputAddress}, {selectedWard}, {selectedDistrict}, {selectedProvince}
                            </span>
                        )}
                    </p>
                </div>
            </div>
            <div className="col-6 lg">
                <div className=" py-4 px-3 mb-4">
                    <div className="row m-0 title">
                        <p>Thông tin người đặt</p>
                    </div>
                    <div className="row m-0 pe-3">
                        <input
                            type="text"
                            value={fullName}
                            name="fullName"
                            className="form-control input_box"
                            placeholder="Họ và tên ..."
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            className="form-control input_box"
                            placeholder="Số điện thoại ..."
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="email"
                            value={email}
                            className="form-control input_box"
                            placeholder="Email ..."
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
