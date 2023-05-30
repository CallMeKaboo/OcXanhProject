const connection = require("../../database/database");

// Select all kind of services of services have id
const getContact = (req, res) => {
  const q = "SELECT * cleaning_services.contact";

  connection.query(q, (err, result) => {
    if (err) return res.send(err);

    return res.status(200).json(result);
  });
};
// insert new request
const postContact = (req, res) => {
  const { fullName, email, message } = req.body;
  // create user
  const query =
    "INSERT INTO cleaning_services.contact ( fullName, email, message) VALUES (?,?,?)";
  connection.query(query, [fullName, email, message], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Request send successfully");
  });
};

// const postService = (req, res) => {};
// const deleteService = (req, res) => {};
// const updateService = (req, res) => {};

module.exports = {
  getContact,
  postContact,
  //   postService,
  //   deleteService,
  //   updateService,
};
