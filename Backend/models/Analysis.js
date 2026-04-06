const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
    score: Number,
    skillsFound: [String],
    dbSkills: [String],
    aiExtraSkills: [String],
    bestRole: String,
    suggestions: [String],
    sections: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);