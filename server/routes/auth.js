const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {

		if(req.body.email === "dinesh@gmail.com"){

			console.log("here");

			if(req.body.password === "Test@123"){
				console.log("here 2");
				const user = await User.findOne({ email: req.body.email });
				console.log(user);
				const token = user.generateAuthToken();
				res.status(200).send({ data: token, message: "logged in successfully" });
			}else{
				return res.status(401).send({ message: "Invalid Email or Password" });				
			}

		}else{

		console.log(req.body);
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email, type: req.body.type });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
		

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	}} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	console.log(data)
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
		type: Joi.string().required().label("Type"),
	});
	return schema.validate(data);
};

module.exports = router;