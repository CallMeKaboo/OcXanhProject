const connection = require("../../database/database");

// Select all kind of services of services have id
const getProvince = (req, res) => {
  const q = "SELECT id, name FROM cleaning_services.province where id = 01";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
const getDistrict = (req, res) => {
  const q =
    "SELECT id,name FROM cleaning_services.district where province_id = 01";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
const getWard = (req, res) => {
  const q = "SELECT id,name FROM cleaning_services.ward where district_id=01 ";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};


module.exports = { getDistrict, getProvince, getWard };
