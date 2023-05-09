const router = require("express").Router();
const userEnrollment = require("../models/userEnrollment");

router.get("/:userName",async (req, res) => {

    let email = req.params.userName;

    const returnSearchContent = await userEnrollment.find(
     { email:email} 
   );
   res.json(returnSearchContent);
 });

router.delete("/:userName",async (req, res) => {

  let email = req.params.userName;

  await userEnrollment.deleteOne({ email:email});
}); 

 module.exports = router ;
