const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const { analyzeResume } = require("../controllers/analysisController");
const { getUserAnalyses, deleteAnalysis } = require("../controllers/analysisController");

router.get("/", authMiddleware, getUserAnalyses);
router.post("/analyze", authMiddleware, analyzeResume);
router.delete("/:id", authMiddleware, deleteAnalysis);

module.exports = router;