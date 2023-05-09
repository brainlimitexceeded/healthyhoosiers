const router = require("express").Router();
const preferences= require("../models/userPreferenes");


router.post("/:userName",async (req, res) => {
  console.log(req.body);
    try{
    await new preferences({email:req.body.email, contentType: req.body.type, workoutGoal: req.body.workoutGoal, workoutIntensity: req.body.workoutIntensity}).save();

     res.status(201).send({ message: "User preferences created Successfully" }); 
    }catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
  });

  module.exports = router ;