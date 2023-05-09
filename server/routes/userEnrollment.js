const router = require("express").Router();
const userEnrollment = require("../models/userEnrollment");

router.post("/:userName/:contentName",async (req, res) => {
    try{

      console.log("here");
    
     let contentName = req.params.contentName;
     let email = req.params.userName;

     const enrolled = await userEnrollment.findOne({ email:email });
    
      console.log(enrolled);

     if(enrolled){
        return res.status(401).send({ message: "User already enrolled for another content. Unenroll and then enroll" });
     }

    await new userEnrollment({email: email, contentName: contentName}).save();
     res.status(201).send({ message: "User Enrolled Successfully" });
    }catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
  });

  router.get("/:contentName", async (req,res) => {
    try{
      let contentName = req.params.contentName;
      let returnCount = await userEnrollment.find({contentName: contentName}).count();
      res.json(returnCount);
    }catch (error) {
      console.log(error)
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  module.exports = router ;