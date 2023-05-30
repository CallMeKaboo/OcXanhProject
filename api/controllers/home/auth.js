const connection = require("../../database/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { username, phone, password } = req.body;

  const errors = {};
  // Check existing user
  const q = "SELECT * FROM cleaning_services.user WHERE username=? or phone=? ";
  connection.query(q, [username, phone], (err, data) => {
    if (err) return res.json(err);

    // Check for username conflict
    const existingUsername = data.find((user) => user.username === username);
    // Check for phone number conflict
    const existingPhoneNumber = data.find((user) => user.phone === phone);
    if (existingUsername && existingPhoneNumber) {
      errors.userName = "Tên tài khoản đã tồn tại";
      errors.phoneNumber = "Số điện thoại đã tồn tại";
      return res.status(409).json({ errors });
    } else if (existingUsername) {
      errors.userName = "Tên tài khoản đã tồn tại";
      // return res.status(409).json("Tên tài khoản đã tồn tại");
      return res.status(409).json({ errors });
    } else if (existingPhoneNumber) {
      errors.phoneNumber = "Số điện thoại đã tồn tại";
      // return res.status(409).json("Số điện thoại đã tồn tại");
      return res.status(409).json({ errors });
    }

    if (Object.keys(errors).length === 0) {
      //Hash pass
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      // create user
      const query =
        "INSERT INTO cleaning_services.user ( username, password, phone,role_id) VALUES (?,?,?,2)";
      connection.query(query, [username, hashPass, phone], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("User created successfully");
      });
    } else return errors;
  });
};
const login = (req, res) => {
  const { username } = req.body;
  const errors = {};
  // Check existing user
  const q =
    "SELECT * FROM cleaning_services.user WHERE username = ? AND  role_id = 2";
  connection.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      errors.userName = "Tài khoản không đúng";
      return res.status(404).json({ errors });
    }
    // compare password with hashPass
    const checkPass = bcrypt.compareSync(req.body.password, data[0].password);

    if (!checkPass) {
      errors.passWord = "Mật khẩu không đúng";

      return res.status(400).json({ errors });
    }
    //create token with userid, secretkey to sign and indetify user
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0]; // take all except pass to show
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};
const lougout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User logged out");
};

const getUsersInfor = (req, res) => {
  const q =
    "SELECT * FROM cleaning_services.user WHERE id = ? AND  role_id = 2";
  connection.query(q, [req.query.user_id], (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
const updateUserInfor = (req, res) => {
  const { fullName, avatar, city, email } = req.body;
  const q =
    "UPDATE cleaning_services.user SET `fullName` = ? , `avatar` = ? , `city` = ? , `email` = ? WHERE id = ?";

  connection.query(
    q,
    [fullName, avatar, city, email, req.params.user_id],
    (err, result) => {
      if (err) return res.send(err);
      return res.status(200).json(result);
    }
  );
};
// update password
const updatePassword = (req, res) => {
  const errors = {};
  const { currentPassword, newPassword } = req.body;
  // Check newpassword === confirmpassword

  const q = "select username,password from user where role_id =2 and id = ?";
  connection.query(q, [req.params.id], (err, result) => {
    if (err) return res.json(err);

    // Kiểm tra mật khẩu hiện tại có khớp hay không
    const isMatch = bcrypt.compareSync(currentPassword, result.password);
    if (!isMatch) {
      errors.pass = "Mật khẩu hiện tại không đúng";
      return res.status(400).json({ errors });
    }
  });
  if (Object.keys(errors).length === 0) {
    //Hash pass
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(newPassword, salt);

    // create user
    const query =
      "UPDATE cleaning_services.user SET password = ? WHERE id = ? AND role_id = 2";
    connection.query(query, [hashPass, req.query.id], (err) => {
      if (err) return res.json(err);
      return res.status(200).json("Password updated successfully");
    });
  } else return errors;
};

module.exports = {
  register,
  login,
  lougout,
  getUsersInfor,
  updateUserInfor,
  updatePassword,
};
