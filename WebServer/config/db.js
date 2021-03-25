const mongoose = require("mongoose");
const { mongodb } = require("./keys");

// generating connection object
const connectDB = mongoose.connect(mongodb.dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

// handling promise object
connectDB.then(
  (db) => {
    console.log("Connected To Database!");
    return db;
  },
  (error) => {
    console.log("Unable To Connect To Database!");
    console.log(error);
  }
);
