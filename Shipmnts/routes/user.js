const User = require("../models/User_data");
const router = require("express").Router();

// Register 

// user as been added to database 

router.post("/register", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password : req.body.password,
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// router.get("/register",()=>{
//     console.log("HII");
// })

module.exports = router;