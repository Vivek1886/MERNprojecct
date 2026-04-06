const Resume = require("../models/Resume");
const extractSkills = require("../utils/skillExtractor");
const detectSections = require("../utils/sectionDetector");
const calculateScore = require("../utils/scorer");
const analyzeWithAI = require("../utils/aiService");
const Analysis = require("../models/Analysis");
exports.analyzeResume = async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const text = resume.extractedText;

    // STEP 1: DB skills
    const dbSkills = extractSkills(text);

    // STEP 2: sections
    const sections = detectSections(text);

    // STEP 3: word count
    const wordCount = text.split(/\s+/).length;

    // STEP 4: score
    const score = calculateScore(dbSkills, sections, wordCount);

    // STEP 5: AI analysis
    const aiResult = await analyzeWithAI(text, dbSkills);

    // STEP 6: merge skills
    const finalSkills = [
      ...new Set([...dbSkills, ...(aiResult.extra_skills || [])])
    ];
    const analysis = await Analysis.create({
  userId: req.user.userId,
  resumeId,
  score,
  skillsFound: finalSkills,
  dbSkills,
  aiExtraSkills: aiResult.extra_skills || [],
  bestRole: aiResult.best_role,
  suggestions: aiResult.suggestions,
  sections,
});

    res.json({
  message: "Analysis complete",
  analysisId: analysis._id,
  score,
  skillsFound: finalSkills,
  bestRole: aiResult.best_role,
  suggestions: aiResult.suggestions,
});

  } catch (error) {
    console.log("ANALYSIS ERROR:", error);
    res.status(500).json({
      error: "Analysis failed"
    });
  }
};
exports.getUserAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analyses" });
  }
};

exports.deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const analysis = await Analysis.findOneAndDelete({
      _id: id,
      userId: req.user.userId
    });

    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found or unauthorized" });
    }

    res.json({ message: "Analysis deleted successfully", id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete analysis" });
  }
};