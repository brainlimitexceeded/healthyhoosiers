const router = require("express").Router();
const content = require("../models/content");

router.post("/:userName",async (req, res) => {

    try{

     let email = req.params.userName;
     let name = "all";

     if(email == "gowri@gmail.com"){
        name = "shankar";
     }

     const latestIdJson = await content.aggregate([
        {$group: {_id: null, maxId: {$max: "$contentId"}}},
        {$project: {_id: 0, maxId: 1}}]);
      
    const latestId = latestIdJson[0].maxId;

    await new content({contentId : latestId+1, contentName: req.body.contentName, contentCalories : parseInt(req.body.contentCalories), contentProfessional: name, contentTags: [name,req.body.type,...req.body.speciality,...req.body.gender], contentAge: req.body.eligible_age }).save();

     res.status(201).send({ message: "Content created Successfully" }); 
    }catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
  });

  router.put("/:name/:contentName",async (req, res) => {
   try{
    let contentName = req.params.contentName;
    let name = req.params.name;


   await content.updateOne({contentName: contentName},{$set:{contentName: req.body.contentName, contentCalories: parseInt(req.body.contentCalories),contentTags:[name,req.body.type,...req.body.speciality,...req.body.gender], contentAge:req.body.eligible_age }});


    res.status(201).send({ message: "Content updated Successfully" }); 
   }catch (error) {
     console.log(error)
     res.status(500).send({ message: "Internal Server Error" });
  }
 });



 router.delete("/:contentName",async (req, res) => {
   try{

    let contentName = req.params.contentName;

   await content.deleteOne({contentName: contentName});
   res.status(201).send({ message: "Content updated Successfully" }); 
   
   }catch (error) {
     console.log(error)
     res.status(500).send({ message: "Internal Server Error" });
  }
 });

module.exports = router ;