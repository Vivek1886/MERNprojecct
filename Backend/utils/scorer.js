const calculateScore = (foundSkills, sections, wordCount) => {
  let score = 0;

  // skills (40)
  score += Math.min(foundSkills.length * 5, 40);

  // sections (30)
  const sectionCount = Object.values(sections).filter(Boolean).length;
  score += (sectionCount / 4) * 30;

  // word count (30)
  if (wordCount >= 300 && wordCount <= 800) {
    score += 30;
  }

  return Math.round(score);
};

module.exports = calculateScore;