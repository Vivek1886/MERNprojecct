const skillsDB = require("./skillDB");

const extractSkills = (text) => {
  const lower = text.toLowerCase();

  return skillsDB.filter(skill =>
    lower.includes(skill)
  );
};

module.exports = extractSkills;