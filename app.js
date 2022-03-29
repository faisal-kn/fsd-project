const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const viewRouter = require("./Routes/viewRouter");
const userRouter = require("./Routes/userRouter");
const eventRouter = require("./Routes/eventRouter");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//basically tells to serve all the static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(
    `the requested URL ${req.originalUrl} not found on this server`,
    404
  );
  next(err);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).render("pages/errors", {
    status: "error",
    message: statusCode === 500 ? "Something went wrong" : message,
  });
});

module.exports = app;
