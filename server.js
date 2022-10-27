const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3001;
const app = require("./app");
const DB = process.env.DATABASE_STRING;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    console.log("database successfully connected");
  });

app.listen( PORT, () => {
  console.log(`App running on port ${PORT}`);
});
