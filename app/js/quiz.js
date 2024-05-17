let answers = {};

function nextQuestion(questionNumber) {
  const radios = document.getElementsByName(`q${questionNumber}`);
  let answered = false;
  for (const radio of radios) {
    if (radio.checked) {
      answers[`q${questionNumber}`] = radio.value;
      answered = true;
      break;
    }
  }
  if (!answered) {
    alert("Please select an option before proceeding.");
    return;
  }
  const nextQuestionNumber = questionNumber + 1;
  if (nextQuestionNumber <= 12) {
    document.getElementById(`question${nextQuestionNumber}`).style.display = "block";
    document.getElementById(`question${questionNumber}`).style.display = "none";
  } else {
    showResult();
  }
}

function prevQuestion(questionNumber) {
  const prevQuestionNumber = questionNumber - 1;
  document.getElementById(`question${prevQuestionNumber}`).style.display = "block";
  document.getElementById(`question${questionNumber}`).style.display = "none";
}

function showResult() {
  // Initialize scores for each career path
  let scores = {
    "Software Engineer": 0,
    "AI Developer": 0,
    "Fullstack Web Developer": 0,
    "AI & Machine Learning Engineer": 0,
    "DevOps Engineer": 0,
    "Frontend Developer": 0,
    "Backend Developer": 0,
    "Python Developer": 0,
    "Ethical Hacker/Cybersecurity Expert": 0,
    "UI/UX Designer": 0,
    "Data Scientist": 0,
    "Mobile Developer": 0,
    "React Developer": 0
  };

  // Weighting logic: map each question to the corresponding career paths and their weights
  const careerMapping = {
    "q1": {
      "1": { "Software Engineer": 2, "Backend Developer": 1 },
      "2": { "Software Engineer": 2, "Frontend Developer": 1 },
      "3": { "AI & Machine Learning Engineer": 3 },
      "4": { "Fullstack Web Developer": 2, "React Developer": 1 },
      "5": { "Software Engineer": 2, "Backend Developer": 1 },
      "6": { "AI & Machine Learning Engineer": 3 }
    },
    "q2": {
      "1": { "Frontend Developer": 3, "UI/UX Designer": 1 },
      "2": { "Python Developer": 3, "Data Scientist": 2 },
      "3": { "Backend Developer": 3, "DevOps Engineer": 1 },
      "4": { "Fullstack Web Developer": 2, "Software Engineer": 1 }
    },
    "q3": {
      "1": { "UI/UX Designer": 3 },
      "2": { "Data Scientist": 3 },
      "3": { "DevOps Engineer": 3 },
      "4": { "Ethical Hacker/Cybersecurity Expert": 3 }
    },
    "q4": {
      "1": { "Fullstack Web Developer": 2, "Web Developer": 1 },
      "2": { "Mobile Developer": 3 },
      "3": { "AI Developer": 3 },
      "4": { "UI/UX Designer": 3 },
      "5": { "Backend Developer": 3 },
      "6": { "Ethical Hacker/Cybersecurity Expert": 3 }
    },
    "q5": {
      "1": { "Startup Tech Specialist": 3, "Fullstack Web Developer": 1 },
      "2": { "Finance Tech Specialist": 3, "Python Developer": 1 },
      "3": { "Healthcare Tech Specialist": 3, "AI Developer": 1 },
      "4": { "EdTech Specialist": 3, "Frontend Developer": 1 },
      "5": { "Media Tech Specialist": 3, "UI/UX Designer": 1 },
      "6": { "Government Tech Specialist": 3, "Cybersecurity Expert": 1 }
    },
    "q6": {
      "1": { "Team Player": 1 },
      "2": { "Independent Worker": 1 },
      "3": { "Hybrid Worker": 1 },
      "4": { "Remote Worker": 1 },
      "5": { "On-site Worker": 1 },
      "6": { "Flexible Worker": 1 }
    },
    "q7": {
      "1": { "Online Learner": 1 },
      "2": { "Bootcamp Learner": 1 },
      "3": { "Academic Learner": 1 },
      "4": { "Self-learner": 1 },
      "5": { "Mentee": 1 },
      "6": { "Group Learner": 1 }
    },
    "q8": {
      "1": { "Analytical Problem Solver": 1 },
      "2": { "Structured Problem Solver": 1 },
      "3": { "Creative Problem Solver": 1 },
      "4": { "Collaborative Problem Solver": 1 },
      "5": { "Research-oriented Problem Solver": 1 },
      "6": { "Trial and Error Problem Solver": 1 }
    },
    "q9": {
      "1": { "Motivated by High Salary": 1 },
      "2": { "Motivated by Personal Growth": 1 },
      "3": { "Motivated by Job Security": 1 },
      "4": { "Motivated by Passion": 1 },
      "5": { "Motivated by Helping Others": 1 },
      "6": { "Motivated by Recognition": 1 }
    },
    "q10": {
      "1": { "Eager Learner": 1 },
      "2": { "Adaptable Learner": 1 },
      "3": { "Cautious Learner": 1 },
      "4": { "Reluctant Learner": 1 },
      "5": { "Traditional Learner": 1 },
      "6": { "Situational Learner": 1 }
    },
    "q11": {
      "1": { "Work-Life Balancer": 1 },
      "2": { "Flexible Schedule Seeker": 1 },
      "3": { "Balanced Integrator": 1 },
      "4": { "Goal-Oriented Worker": 1 },
      "5": { "Traditional Worker": 1 },
      "6": { "Project-Driven Worker": 1 }
    },
    "q12": {
      "1": { "Web Development Environment": 1 },
      "2": { "Mobile Development Environment": 1 },
      "3": { "Data Science Environment": 1 },
      "4": { "Design Environment": 1 },
      "5": { "Backend Development Environment": 1 },
      "6": { "Security Testing Environment": 1 }
    }
  };

  // Update scores based on the answers
  for (let i = 1; i <= 12; i++) {
    const answer = answers[`q${i}`];
    if (careerMapping[`q${i}`] && careerMapping[`q${i}`][answer]) {
      const careerWeights = careerMapping[`q${i}`][answer];
      for (const career in careerWeights) {
        if (scores[career] !== undefined) {
          scores[career] += careerWeights[career];
        }
      }
    }
  }

  // Determine the career path with the highest score
  let maxScore = 0;
  let result = "";

  for (const career in scores) {
    if (scores[career] > maxScore) {
      maxScore = scores[career];
      result = career;
    }
  }

  // Display the result
  const resultContainer = document.getElementById("careerResult");
  resultContainer.textContent = `Your suggested career path is: ${result}`;
  resultContainer.style.display = "block";
  document.getElementById(`question${12}`).style.display = "none";


}
