require("dotenv").config();
const createError = require("http-errors");
const cors = require('cors');
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const productsRouter = require("./routes/products");
const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/cart");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;
