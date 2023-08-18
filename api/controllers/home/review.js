const connection = require("../../database/database");

// Select all kind of services of services have id
const getReviews = (req, res) => {
  const q =
    "select user.username, rating, comment from review join user on review.user_id = user.id where service_detail_id = ?";

  connection.query(q, [req.params.service_detail_id], (err, result) => {
    if (err) return res.send(err);
    return res.status(200).json(result);
  });
};
// insert new request
const postReview = (req, res) => {
  const { user_id, service_detail_id, rating, comment } = req.body;

  const query =
    "SELECT * FROM cleaning_services.review where user_id = ? AND service_detail_id = ? ";
  connection.query(query, [user_id, service_detail_id], (err, result) => {
    if (err) return res.send(err);

    if (result.length > 0) {
      return res
        .status(400)
        .json({ message: "Bạn đã đánh giá dịch vụ này rồi" });
    } else {
      const q =
        "INSERT INTO cleaning_services.review (user_id,service_detail_id,rating,comment) VALUES (?,?,?,?)";
      connection.query(
        q,
        [user_id, service_detail_id, rating, comment],
        (err, data) => {
          if (err) return res.json(err);

          return res.status(200).json("Good");
        }
      );
    }
  });
  // insert review
};

// const postService = (req, res) => {};
// const deleteService = (req, res) => {};
// const updateService = (req, res) => {};

module.exports = {
  getReviews,
  postReview,
  //   postService,
  //   deleteService,
  //   updateService,
};
