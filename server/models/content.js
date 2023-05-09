const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    contentId: {type: Number, required: true},
	contentName : { type: String, required: true },
	contentCalories: { type: String, required: true },
	contentProfessional: {type: String, required: true},
	contentTags: {type: [String], required: true},
	contentAge: {type: Number, required: true},
	contentImage: {type: String, required:false},
	contentApproval: {type: String, default:"D", required: true}
});

const content = mongoose.model('content', contentSchema);

module.exports = content; 