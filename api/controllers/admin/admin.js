const connection = require("../../database/database");
const jwt = require("jsonwebtoken");
// Login
const login = (req, res) => {
  const { username, password } = req.body;
  const errors = {};
  // Check existing user
  const q =
    "SELECT * FROM cleaning_services.user WHERE username = ?  AND password = ? AND role_id = 1";
  connection.query(q, [username, password], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      errors.message = "Tài khoản không đúng";
      return res.status(404).json({ errors });
    }
    req.session.admin = { username: username, password: password };

    // create token with userid, secretkey to sign and indetify user
    const token = jwt.sign({ username: username }, "secretkey");

    const { password, ...others } = data[0]; // take all except pass to show
    res
      .cookie("accessToken", token, {
        httpOnly: true,

        maxAge: 86400000,
      })
      .status(200)
      .json(others);
  });
};
const getAdminProfile = (req, res) => {
  // Kiểm tra xem admin đã đăng nhập hay chưa
  if (req.session.admin) {
    // Admin đã đăng nhập, trả về thông tin tài khoản
    res.status(200).json({ admin: req.session.admin });
  } else {
    // Admin chưa đăng nhập, trả về lỗi không xác thực
    res.status(401).json({ message: "Chưa xác thực" });
  }
};
// Select all kind of services of services have id
const getService = (req, res) => {
  const q =
    "select service_details.id, service_details.name, service.name as 'type',feature,duration,price from service_details join service on service_details.service_id=service.id  ";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
// Select all user
const getUsers = (req, res) => {
  const q =
    "SELECT fullName,username,phone,email FROM cleaning_services.user where role_id = 2";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
// Select all staff
const getStaffs = (req, res) => {
  const q =
    "SELECT fullName,dob,gender,phone,date_in,salary FROM cleaning_services.cleaner";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
// Select booking
const getBooking = (req, res) => {
  const q =
    "SELECT user.username, contact_name,contact_phone,contact_email,service_details.name,cleaner.fullName,CONCAT (cleaning_time, ' ', cleaning_date) as time_stamp,booking.address, booking.status " +
    "FROM cleaning_services.booking join service_details " +
    "on booking.service_id = service_details.id join user on user.id = booking.user_id join cleaner on cleaner.id = booking.cleaner_id";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
// Select contact
const getContact = (req, res) => {
  const q = "SELECT * FROM cleaning_services.contact where status = 0";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
// Select report
const getReport = (req, res) => {
  const q =
    "select service.name as type, service_details.name, count(booking.service_id) as sodon, ((service_details.price + 50000)*count(booking.service_id)) as tong" +
    " from service_details join booking on service_details.id=booking.service_id join service on service.id = service_details.service_id " +
    "group by service_details.service_id, service_details.name, booking.service_id, service_details.price";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
module.exports = {
  login,
  getService,
  getUsers,
  getStaffs,
  getBooking,
  getContact,
  getReport,
};
