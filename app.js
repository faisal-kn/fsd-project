const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/userRouter");
const eventRouter = require("./Routes/eventRouter");
const AppError = require("./utils/AppError");
const multer = require("multer");
var bodyParser = require("body-parser");
const app = express();
const Email = require("./utils/Email");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// your routes here

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//basically tells to serve all the static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);

// app.get("/verify/:token", (req, res, next) => {
//   const token = req.params.token;
//   if (Email.verifyEmail(token)) {
//     res.redirect("/");
//   } else {
//     res.send("No page exists");
//   }
// });

app.get("/api/verifyEmail/:token", async (req, res, next) => {
  const token = req.params.token;
  const isVerified = await Email.verifyEmail(token);
  console.log(isVerified);
  if (isVerified) {
    res.status(200).json({
      status: "success",
      message: "Email verified",
    });
  } else {
    res.status(400).json({
      status: "failed",
      message: "Email not verified",
    });
  }
});

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
  res.status(statusCode).json({
    status: "error",
    message,
  });
});

module.exports = app;
