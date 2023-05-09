const mongoose = require("mongoose");

const userPreferencesSchema = new mongoose.Schema({
    email: {type: String, required: true},
    contentType :  {type: String, required: true},
	workoutGoal : { type: String, required: true },
    workoutIntensity: { type: String, required: true }
});

const preferences = mongoose.model('preferences', userPreferencesSchema);

module.exports = preferences; 