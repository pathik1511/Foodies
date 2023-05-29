const express = require('express')
const classifyRecipeController = require("../controller/ClassifyRecipeController")

const router = express.Router();
router.post("/classify", classifyRecipeController.classify)

module.exports = router;
