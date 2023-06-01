const connection = require("../../database/database");
const jwt = require("jsonwebtoken");

// update sv
const updateService = (req, res) => {
  const { name, service_id, feature, desc, duration, price, thumbnail } =
    req.body;
  const q =
    "UPDATE service_details SET name=?, service_id=?, feature=?, service_details.desc=?,duration=?,price=?,thumbnail=? where id = ?";

  connection.query(
    q,
    [
      name,
      service_id,
      feature,
      desc,
      duration,
      price,
      thumbnail,
      req.params.id,
    ],
    (err, result) => {
      if (err) return res.send(err);

      return res.status(200).json("Done");
    }
  );
};
// update staff
const updateStaff = (req, res) => {
  const { fullName, avatar, dob, gender, phone, address, salary, date_in } =
    req.body;
  const q =
    "UPDATE cleaner SET fullName=?, avatar=?, dob=?, gender=?,phone=?,address=?,salary=?,date_in=? where id = ?";

  connection.query(
    q,
    [
      fullName,
      avatar,
      dob,
      gender,
      phone,
      address,
      salary,
      date_in,
      req.params.id,
    ],
    (err, result) => {
      if (err) return res.send(err);

      return res.status(200).json("Done");
    }
  );
};
// update bk
const updateBooking = (req, res) => {
  const q = "UPDATE booking SET status = 1 where id = ?";

  connection.query(q, [req.params.id], (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json("Done");
  });
};
// update contact
const updateContact = (req, res) => {
  const q = "UPDATE contact SET status = 1 where id = ?";

  connection.query(q, [req.params.id], (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json("Done");
  });
};

module.exports = {
  updateContact,
  updateBooking,
  updateService,
  updateStaff
};
