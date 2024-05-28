// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const { signup, login,resetPassword,getAllUsers } = require("../controllers/Auth");

const { auth, isStudent, isAdmin } = require("../middlewares/auth");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for TESTS",
  });
});

//Protected Route
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Admin",
  });
});

// Route for Changing the password
// router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

router.post("/resetpassword",resetPassword)
router.get("/getalluser",getAllUsers)

// Route for generating a reset password token
// router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
// router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router;
