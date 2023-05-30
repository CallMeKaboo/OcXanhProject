const validation = (values) => {
    let err = {};
    const nameRegex = /^[a-zA-Z0-9]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (values.username === '') {
        err.userName = 'Tên tài khoản không được bỏ trống!';
    } else if (!nameRegex.test(values.username)) {
        err.userName = 'Tên đăng nhập không hợp lệ (Chỉ chứa chữ cái và số)';
    } else {
        err.userName = '';
    }
    if (values.phone === '') {
        err.phoneNumber = 'Số điện thoại không được bỏ trống!';
    } else if (!phoneRegex.test(values.phone)) {
        err.phoneNumber = 'Số điện thoại không hợp lệ (10 chữ số)';
    } else {
        err.phoneNumber = '';
    }
    if (values.password === '') {
        err.passWord = 'Mật khẩu không được bỏ trống!';
    } else if (!passwordRegex.test(values.password)) {
        err.passWord = 'Tối thiểu 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
    } else {
        err.passWord = '';
    }

    return err;
};

export default validation;
