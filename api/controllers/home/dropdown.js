const connection = require("../../database/database");

// Select all kind of services of services have id
const getProvince = (req, res) => {
  const q = "SELECT id, name FROM cleaning_services.province where id in (01,24,34)";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
const getDistrict = (req, res) => {
  const q =
    "SELECT id,name FROM cleaning_services.district where province_id = ?";

  connection.query(q, [req.params.id], (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
const getWard = (req, res) => {
  const q = "SELECT id,name FROM cleaning_services.ward where district_id=? ";

  connection.query(q, [req.params.id], (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};

module.exports = { getDistrict, getProvince, getWard };
