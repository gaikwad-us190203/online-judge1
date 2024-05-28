const bcrypt = require("bcrypt");
const User = require("../models/User"); // User is an instance(Which is a model) of schema
const jwt = require("jsonwebtoken");
// const { passwordUpdated } = require("../mail/templates/passwordUpdate");

require("dotenv").config();

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
		// const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		// console.log(response);
		// if (response.length === 0) {
		// 	// OTP not found for the email
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The OTP is not valid",
		// 	});
		// } else if (otp !== response[0].otp) {
		// 	// Invalid OTP
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The OTP is not valid",
		// 	});
		// }

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		// let approved = "";
		// approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		// const profileDetails = await Profile.create({
		// 	gender: null,
		// 	dateOfBirth: null,
		// 	about: null,
		// 	contactNumber: null,
		// });

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			accountType
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email })

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);
			console.log("backend se token:-->",token);

			// Save token to user document in database
           // user = user.toObject();
            user.token = token;
            user.password = undefined;
			//Set cookie for token and return success response
			const options = {
				//expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				 secure: false,  
				// sameSite: "Lax", 
				httpOnly: true,
				maxAge: 3600000,
			};
			
			
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});

			//const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
			// res.cookie("token", token, { httpOnly: true, secure: false, maxAge: 3600000 });
			// res.status(200).json({ success: true, message: 'Login successful' });
			//res.json({ token, role: user.role }); // Return the user's role along with the token
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, email } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ email:email });
		if (!userDetails) {
			return res.json({
				success: false,
				message: " invalid user",
			});
		}
		
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ email:email},
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};


exports.getAllUsers = async (req, res) => {
	try {
	  const users = await User.find();
	  //const users = await User.find({ accountType: 'Student' });
	  return res.status(200).json({
		success: true,
		users,
		message: " ALL users are shown successfully",
	  });
	} catch (error) {
	  res.status(500).send({ error: "Internal Server Error" });
	}
  };