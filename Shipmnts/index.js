const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const GenreRoutes = require("./routes/genres")
const movieRoutes = require('./routes/movies');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });


  app.use(express.json());
  app.use("/api/auth", userRoute);
  app.use("/api", GenreRoutes);
  app.use('/api', movieRoutes);

app.listen(5000,() =>{
    console.log("Backend Server is running")
});