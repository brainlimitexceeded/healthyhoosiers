const router = require("express").Router();
const content = require("../models/subcontent");

router.get("/:contentName",async (req, res) => {
     let contentName = req.params.contentName;

     const returnSubContent = await content.find(
      { contentName:contentName} 
    );
    res.json(returnSubContent);
  });

router.get("/:contentName/:subContent",async (req, res) => {
    let contentName = req.params.subContent;

    const returnSubContent = await content.find(
     { subContentName:contentName} 
   );
   res.json(returnSubContent);
 });

router.post("/",async (req, res) => {
    try{
      console.log(req.body);
    await new content({...req.body}).save();
    res.status(201).send({ message: "Subcontent Creataed Successfully" });
  }catch (error) {
  console.log(error)
  res.status(500).send({ message: "Internal Server Error" });
}
  });

  module.exports = router ;