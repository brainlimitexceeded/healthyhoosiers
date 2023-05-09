const router = require("express").Router();
const preferences= require("../models/userPreferenes");
const contents = require("../models/content");

router.get("/:userName", async (req, res) =>{
    let userName = req.params.userName;
    console.log(userName);  

    try{
        const userPreferences = await preferences.findOne({email:userName});
        var searchResult = null

        console.log(userPreferences);

        if(userPreferences["workoutIntensity"] === "high"){

             console.log("in high");
             searchResult = await contents.find({

                $and: [{contentTags:userPreferences["contentType"] }, {contentTags: userPreferences["workoutGoal"] }, {contentCalories: {$gt : 4000}}]

            });
        }else if(userPreferences["workoutIntensity"]  === "medium"){
 
             searchResult = await contents.find({

                $and: [{contentTags:userPreferences["contentType"] }, {contentTags: userPreferences["workoutGoal"] }, {contentCalories: {$gt : 3000}}]

            });           
        }else{
 
             searchResult = await contents.find({

                $and: [{contentTags:userPreferences["contentType"] }, {contentTags: userPreferences["workoutGoal"] }, {contentCalories: {$gt : 2000}}]

            });           
        }
        console.log(searchResult);
        res.json(searchResult);
    }catch(error){
        console.log(error);
    }
});

module.exports = router ;