const express = require("express");
const connection = require("./database/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const session = require('express-session');

const authRoutes = require("./routes/auth")
const serviceRoutes = require("./routes/service")
const dropRoutes = require("./routes/dropdown")
const cleanerRoutes = require("./routes/cleaner")
const contactRoutes = require("./routes/contact")
const bookingRoutes = require("./routes/booking")
const adminRoutes = require("./routes/admin")
// const { default: router } = require("./routes/user");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
// app.use(
//   session({
//     // secret: 'Admin123456',
//     resave: false,
//     saveUninitialized: true,
//   })
// );
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/dropdowns", dropRoutes);
app.use("/api/cleaners", cleanerRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);


app.listen(8800, function () {
  connection.getConnection(function (err) {
    if (err) throw err;
    console.log("database connected!");
  });
});
// connection.end();
