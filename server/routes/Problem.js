const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} = require("../controllers/Problem");
// Create a new problem set
router.post("/create",createProblem);
// Get all problem sets
router.get("/", getAllProblems);
// Get a problem set by ID
router.get("/single/:id", getProblemById);
// Update a problem set
router.put("/update/:id",   updateProblem);
// Delete a problem set
router.delete("/delete/:id",  deleteProblem);
module.exports = router;
