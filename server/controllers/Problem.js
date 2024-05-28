const Problem = require("../models/Problem");
const mongoose = require("mongoose");
// ****Create a new problem **
//****
exports.createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      inputformat,
      outputformat,
      sampleinput1,
      sampleoutput1
    } = req.body;
    // Validation
    if (
      !title ||
      !description ||
      !difficulty ||
      !inputformat ||
      !outputformat ||
      !sampleinput1 ||
      !sampleoutput1
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }
    // Create a new problem instance
    const problem = new Problem({
      title,
      description,
      difficulty,
      inputformat,
      outputformat,
      sampleinput1,
      sampleoutput1,
    });
    // Save the problem to the database
    await problem.save();
    // Send response
    // res.status(200).send(problem);
    return res.status(200).json({
      success: true,
      problem,
      message: "Problem created successfully",
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error " });
  }
};
//* * Delete a problem by ID*
exports.deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).send({ success:false,error: "Problem not found" });
    }
    res.status(200).send({success:true, message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).send({ success:false,error: "Internal Server Error" });
  }
};
// **Update a problem by ID***
exports.updateProblem = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "title",
      "description",
      "difficulty",
      "inputformat",
      "outputformat",
      "sampleinput1",
      "sampleoutput1",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates ra!" });
    }
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).send({ error: "Problem not found" });
    }
    updates.forEach((update) => (problem[update] = req.body[update]));
    await problem.save();
    // res.send(problem);
    return res.status(200).json({
      success: true,
      problem,
      message: "Problem updated successfully",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
// ***Get all problems*
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    return res.status(200).json({
      success: true,
      problems,
      message: " ALL Problema are shown successfully",
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
//****Get a problem by ID***
exports.getProblemById = async (req, res) => {
  const { id } = req.params;
  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid Problem ID format" });
  }
  try {
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).send({ error: "Problem not found" });
    }
    // console.log(problem)
    return res.status(200).json({
      success: true,
      problem,
      message: "Problem got successfully",
    });
  } catch (error) {
    console.error("Error fetching problem by ID:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

