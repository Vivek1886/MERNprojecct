const detectSections = (text) => {
  const lower = text.toLowerCase();

  return {
    education: lower.includes("education"),
    experience: lower.includes("experience"),
    projects: lower.includes("project"),
    skills: lower.includes("skills"),
  };
};

module.exports = detectSections;