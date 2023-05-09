const router = require("express").Router();
const content = require("../models/content");


router.get("/:contentApproval",async (req, res) => {

    let contentApproval = req.params.contentApproval;
  
    returnContent = await content.find({contentApproval: contentApproval});    
  
   res.json(returnContent);
  });

router.put("/:contentApproval/:contentName",async (req, res) => {
    try{
      console.log("hello here in there"); 
     let contentName = req.params.contentName;
     let contentApproval =req.params.contentApproval;
  
   await content.updateOne({contentName: contentName},{$set:{contentApproval: contentApproval}});
  
  
     res.status(201).send({ message: "Content Approved Successfully" }); 
    }catch (error) {
      console.log(error)
      res.status(500).send({ message: "Internal Server Error" });
   }
  });


  module.exports = router ;