require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

// Express Routes
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const orderRoutes = require("./routes/order");
// const stripeRoutes = require("./routes/stripePayment");

//Db Connection & Server Creation
const dbConnection = require("./config/db");
const app = express();

//Middlewares
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

//My Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
// app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);
// app.use("/api", orderRoutes);
// app.use("/api", stripeRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting a Server
app.listen(port, () => {
  console.log(`Server Started At ${port}`);
});
