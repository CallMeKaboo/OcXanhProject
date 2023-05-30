const connection = require("../../database/database");

// Select all kind of services of services have id
const getCleaners = (req, res) => {
    const q = "SELECT * FROM cleaning_services.cleaner";

    connection.query(q, (err, result) => {
      if (err) return res.send(err);
  
      return res.status(200).json(result);
    });
};
// Select all details of a service
const getCleaner = (req, res) => {
  const q = "SELECT * FROM cleaning_services.cleaner WHERE id=?";

  connection.query(q, [req.params.id], (err, result) => {
    if (err) return res.send(err);
    
    return res.status(200).json(result[0]);
  });
};

// const postService = (req, res) => {};
// const deleteService = (req, res) => {};
// const updateService = (req, res) => {};

module.exports = {
  getCleaners,
  getCleaner,
//   postService,
//   deleteService,
//   updateService,
};
