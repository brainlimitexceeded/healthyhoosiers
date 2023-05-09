const mongoose = require("mongoose");

const userEnrollmentSchema = new mongoose.Schema({
	email : { type: String, required: true },
    contentName: {type: String, required: true},
});

const userEnrollment = mongoose.model('userEnrollment', userEnrollmentSchema);

module.exports = userEnrollment; 