const connection = require("../../database/database");

// Select all kind of services of services have id
const getServices = (req, res) => {
  const q = req.query.service_id
    ? "SELECT service_details.id, service_details.name,service.thumbnail as `def_thumbnail`, service_details.thumbnail, service.start_price,service.description "+
    +"FROM service_details JOIN service ON service.id = service_details.service_id WHERE service_id = ?"
    : "SELECT * FROM service_view";

  connection.query(q, [req.query.service_id], (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
// Select time of service
const getTime = (req, res) => {
  const q =
    "SELECT service.time FROM service_details JOIN service ON service.id = service_details.service_id WHERE service_details.id = ?";
  connection.query(q, [req.params.service_id], (err, result) => {
    if (err) return res.send(err);
    return res.status(200).json(result[0]);
  });
};
// Select all details of a service
const getService = (req, res) => {
  const q = "SELECT * FROM cleaning_services.service_details WHERE id=?";

  connection.query(q, [req.params.detail_id], (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result[0]);
  });
};
// Search
const searchService = (req, res) => {
  const q =
    "SELECT id,name,service_id FROM cleaning_services.service_details where name like CONCAT('%', ?, '%')";
  connection.query(q, [req.query.term], (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
const postService = (req, res) => {};
const deleteService = (req, res) => {};
const updateService = (req, res) => {};

module.exports = {
  getServices,
  getService,
  searchService,
  getTime,
  postService,
  deleteService,
  updateService,
};
