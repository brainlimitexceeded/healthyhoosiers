const mongoose = require("mongoose");

const subContentSchema = new mongoose.Schema({
	contentName: { type: String, required: true },
    subContentName: {type: String, required: true},
    day: {type:String, required: true},
    subContentExercises: {type: String , required:true},
	subContentCalories: {type: Number, required:true },
	subContentImage: {type: String, required:false},
});

const subcontent = mongoose.model('subcontent', subContentSchema);

module.exports = subcontent; 