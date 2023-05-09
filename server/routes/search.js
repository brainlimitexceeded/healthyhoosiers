const router = require("express").Router();
const content = require("../models/content");
const userEnrollment = require("../models/userEnrollment");

router.get("/:search/:professionals/:moi/:speciality/:gender/:age_of_content",async (req, res) => {

     var filter = [];
     var returnAll = 0;
     var genderList = [];
     var returnContent = null;
     var returnSearch = null;

     let professionals = req.params.professionals;
     let moi = req.params.moi;
     let speciality = req.params.speciality;
     let gender = req.params.gender;
     let age_of_content = req.params.age_of_content;
     let search = req.params.search;  

      console.log(professionals);
      console.log(moi);
      console.log(gender);
      console.log(speciality);
      console.log("search:"+search);

      if (professionals !== "all")
      {
        console.log("in if");
        returnContent = await content.find({
          $and:
          [
              {$or:
              [
                  {contentProfessional: search.toLowerCase()},{contentTags: search.toLowerCase()},{contentName:{ $regex: new RegExp("^" + search.toLowerCase(), "i") } },
          { contentProfessional: professionals}
              ]
              },
              {contentApproval: "A"}
          ]
      });        
        } else if(moi !== "all")
        {
          console.log("in 1");
          returnContent = await content.find({
            $and:
        [
            { $or:
            [
                {contentProfessional: search.toLowerCase()},{contentTags: search.toLowerCase()},{contentName:{ $regex: new RegExp("^" + search.toLowerCase(), "i") } },
            { contentTags: moi}
            ]
            },
            {contentApproval: "A"}
        ]
        });         
        }
        else if(gender !== "all")
        {
          console.log("in 2");
          returnContent = await content.find({
            $and:
            [
                { $or:
                    [{contentProfessional: search.toLowerCase()},{contentTags: search.toLowerCase()},{contentName:{ $regex: new RegExp("^" + search.toLowerCase(), "i") } },
                        { contentTags: gender}]
                },
                {contentApproval: "A"}
            ]
        });         
        }else if(speciality !== "all")
        {
          console.log("in 3");
          returnContent = await content.find({
            $and: 
            [ 
                { $or:[{contentProfessional: search.toLowerCase()},{contentTags: search.toLowerCase()},{contentName:{ $regex: new RegExp("^" + search.toLowerCase(), "i") } },
                    { contentTags: speciality}]
                },
                {contentApproval: "A"}
            ]
        }  );         
        }else if(age_of_content != 0)
        {
          console.log("in 4");
          returnContent = await content.find({ 
            $and: 
            [ 
                {$or: 
                    [
                        {contentProfessional: search.toLowerCase()},
                        {contentTags: search.toLowerCase()},
                        {contentName:search.toLowerCase()},
                        { contentAge : { $gt : age_of_content}}
                    ]},
                    {contentApproval: "A"}
            ]
            });         
        }else if(search !== "all"){
           console.log("in 5");
          returnContent = await content.find({ $and: [ {$or: [
            {contentProfessional: search.toLowerCase()},
            {contentTags: search.toLowerCase()},
            {contentName:{ $regex: new RegExp("^" + search.toLowerCase(), "i") } }
            ]}, {contentApproval: "A"}]
        });          
        }else{
          console.log("in else");
          returnContent = await content.find({contentApproval: "A"});    
        }

    console.log("the search content is"+returnContent); 
    res.json(returnContent);
  });

router.get("/:professionals",async (req, res) => {
    var returnSearch = null;

    let professionals = req.params.professionals;
    
    returnSearch = await content.find({contentProfessional: professionals});
   res.json(returnSearch);
 });



  module.exports = router ;