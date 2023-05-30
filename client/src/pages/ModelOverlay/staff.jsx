import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../css/modelOverlay/staff.css';
import axios from 'axios';

function OurStaff() {
    return (
        <div className="row m-0 overflow-hidden main-rounded h-100">
            <div className="col-6 ps-0">
                <div className="row m-0 text-center title">
                    <p>Chọn nhân viên</p>
                </div>

                <div className="row m-0 justify-content-center ps-5">
                    <p className="m-0 mb-3 text-weight">Danh sách nhân viên</p>
                    <div className="list-group staff-group">
                        <div className="row staff-box ms-0">
                            <div className="col-4">
                                <div className="image mr-3">
                                    <img alt="avatar" className="rounded-circle" width={60} />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="d-flex flex-column mb-1">
                                    <span>a</span>
                                    <div className="ratings ml-2">
                                        {/* {Array(e.rate)
                                                    .fill()
                                                    .map((_, index) => (
                                                        <i
                                                            key={index}
                                                            className="fa-solid fa-star me-2"
                                                            style={{ color: '#fbff00' }}
                                                        />
                                                    ))} */}
                                    </div>
                                    <span>a</span>
                                    <span>a</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6 lg">
                <div className="row m-0 text-center title">
                    <p>Thông tin thêm</p>
                </div>
                <div className="row m-0 justify-content-center px-5">
                    <p className="m-0 mb-3 text-weight">Dịch vụ thêm</p>
                    <div className="d-flex">
                        <select name="select_box" className="form-select select_box">
                            <option value>Dịch vụ...</option>
                            <option value="a">a</option>
                            <option value="v">b</option>
                            <option value="b">c</option>
                        </select>
                    </div>
                    <p className="m-0 mb-3 text-weight">Lưu ý cho nhân viên</p>
                    <textarea className="form-control area_box" placeholder="Lưu ý..." rows={6} defaultValue={''} />
                </div>
            </div>
        </div>
    );
}

export default OurStaff;
