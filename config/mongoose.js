// // Requiring the library i.e. mongoose
const mongoose = require("mongoose");

//Establishing the connection with the mongodb database
const URL= process.env.FM_DB_URL;

//Acquiring the connection
const db = async () => {
  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
      console.log('Error in connecting to database',err);
  });
};

module.exports = db;