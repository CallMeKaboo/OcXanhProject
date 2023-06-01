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
// Add serv
const postService = (req, res) => {
  const { name, thumbnail, desc, feature, price, service_id, duration } =
    req.body;
  // create user
  const query =
    "INSERT INTO `cleaning_services`.`service_details` ( `name`, `thumbnail`, `desc`, `feature`, `price`, `service_id`, `duration`) VALUES (?,?,?,?,?,?,?)";
  connection.query(
    query,
    [name, thumbnail, desc, feature, price, service_id, duration],
    (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Request send successfully");
    }
  );
};
// Add staff
const postStaff = (req, res) => {
  const { avatar, fullName, dob, gender, phone, address, salary, date_in } =
    req.body;
  // create user
  const query =
    "INSERT INTO `cleaning_services`.`cleaner` (`avatar`, `fullName`, `dob`, `gender`, `phone`, `address`, `salary`, `date_in`, `status`) VALUES (?,?,?,?,?,?,?,?,1)";
  connection.query(
    query,
    [avatar, fullName, dob, gender, phone, address, salary, date_in],
    (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Request send successfully");
    }
  );
};
// Delete multiple
const deleteMultipleService = (req, res) => {
  const ids = req.body.ids;
  const query = "DELETE FROM service_details WHERE id IN (?)";

  connection.query(query, [ids], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete records" });
    } else {
      res.status(200).json({ message: "Records deleted successfully" });
    }
  });
};
// Delete multiple
const deleteMultipleStaff = (req, res) => {
  const ids = req.body.ids;
  const query = "DELETE FROM cleaner WHERE id IN (?)";

  connection.query(query, [ids], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete records" });
    } else {
      res.status(200).json({ message: "Records deleted successfully" });
    }
  });
};
// Delete multiple
const deleteMultipleUser = (req, res) => {
  const ids = req.body.ids;
  const query = "DELETE FROM user WHERE id IN (?)";

  connection.query(query, [ids], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete records" });
    } else {
      res.status(200).json({ message: "Records deleted successfully" });
    }
  });
};
// Delete multiple
const deleteMultipleBooking = (req, res) => {
  const ids = req.body.ids;
  const query = "DELETE FROM booking WHERE id IN (?)";

  connection.query(query, [ids], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete records" });
    } else {
      res.status(200).json({ message: "Records deleted successfully" });
    }
  });
};
// Delete multiple
const deleteMultipleContact = (req, res) => {
  const ids = req.body.ids;
  const query = "DELETE FROM contact WHERE id IN (?)";

  connection.query(query, [ids], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete records" });
    } else {
      res.status(200).json({ message: "Records deleted successfully" });
    }
  });
};

module.exports = {
  login,
  deleteMultipleService,
  deleteMultipleStaff,
  deleteMultipleUser,
  deleteMultipleBooking,
  deleteMultipleContact,
  postStaff,
  postService
};
