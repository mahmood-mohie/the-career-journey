const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use('/images', express.static(path.join(__dirname, '../images')));

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE courses (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      category TEXT,
      hours INTEGER,
      lessons INTEGER,
      image TEXT,
      instructor TEXT,
      instructor_image TEXT
    )
  `);

  const stmt = db.prepare(`
    INSERT INTO courses (
      title, description, category, hours, lessons, image, instructor, instructor_image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // إضافة كورسات متنوعة في مجالات البرمجة المختلفة
  const courses = [
    // Web Development
    ['HTML & CSS Basics', 'Learn the basics of HTML and CSS', 'Web Development', 10, 8, '/images/webDevelopment-path.webp', 'John Doe', '/images/instructor.png'],
    ['JavaScript Essentials', 'Essential JavaScript concepts', 'Web Development', 15, 12, '/images/webDevelopment-path.webp', 'Jane Smith', '/images/instructor2.png'],
    ['React for Beginners', 'Introduction to React.js', 'Web Development', 20, 15, '/images/webDevelopment-path.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['Advanced React', 'Deep dive into React.js', 'Web Development', 25, 20, '/images/webDevelopment-path.webp', 'Bob Brown', '/images/instructor4.png'],
    ['Node.js Fundamentals', 'Learn the basics of Node.js', 'Web Development', 18, 14, '/images/webDevelopment-path.webp', 'John Doe', '/images/instructor.png'],
    ['Express.js Deep Dive', 'Advanced concepts in Express.js', 'Web Development', 22, 18, '/images/webDevelopment-path.webp', 'Jane Smith', '/images/instructor2.png'],
    ['Frontend Frameworks', 'Overview of modern frontend frameworks', 'Web Development', 24, 19, '/images/webDevelopment-path.webp', 'Jane Smith', '/images/instructor2.png'],
    ['Backend Development', 'Creating robust backend systems', 'Web Development', 30, 24, '/images/webDevelopment-path.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['Web Security', 'Securing web applications', 'Web Development', 18, 14, '/images/webDevelopment-path.webp', 'Alice Johnson', '/images/instructor3.png'],

    // DevOps
    ['Introduction to DevOps', 'Basics of DevOps practices', 'DevOps', 12, 10, '/images/devops-path.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['CI/CD Pipelines', 'Implementing CI/CD pipelines', 'DevOps', 20, 16, '/images/devops-path.webp', 'Bob Brown', '/images/instructor4.png'],
    ['Docker for Developers', 'Containerization with Docker', 'DevOps', 18, 14, '/images/devops-path.webp', 'John Doe', '/images/instructor.png'],
    ['Kubernetes Essentials', 'Getting started with Kubernetes', 'DevOps', 25, 20, '/images/devops-path.webp', 'Jane Smith', '/images/instructor2.png'],
    ['AWS for DevOps', 'DevOps practices on AWS', 'DevOps', 30, 25, '/images/devops-path.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['Agile Methodologies', 'Implementing Agile practices', 'DevOps', 16, 12, '/images/devops-path.webp', 'Bob Brown', '/images/instructor4.png'],
    ['Microservices Architecture', 'Designing Microservices', 'DevOps', 24, 20, '/images/devops-path.webp', 'John Doe', '/images/instructor.png'],
    ['Infrastructure as Code', 'IaC using Terraform and Ansible', 'DevOps', 28, 22, '/images/devops-path.webp', 'Jane Smith', '/images/instructor2.png'],

    // AI
    ['Introduction to AI', 'Basics of Artificial Intelligence', 'AI', 15, 12, '/images/ai-path.webp', 'Bob Brown', '/images/instructor4.png'],
    ['Machine Learning Basics', 'Fundamentals of Machine Learning', 'AI', 20, 15, '/images/ai-path.webp', 'John Doe', '/images/instructor.png'],
    ['Deep Learning with Python', 'Deep Learning techniques using Python', 'AI', 25, 20, '/images/ai-path.webp', 'Jane Smith', '/images/instructor2.png'],
    ['AI for Data Science', 'AI techniques in Data Science', 'AI', 22, 18, '/images/ai-path.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['Natural Language Processing', 'NLP with Python', 'AI', 28, 22, '/images/ai-path.webp', 'Bob Brown', '/images/instructor4.png'],
    ['Computer Vision', 'Introduction to Computer Vision', 'AI', 18, 14, '/images/ai-path.webp', 'John Doe', '/images/instructor.png'],
    ['TensorFlow for AI', 'Using TensorFlow for AI projects', 'AI', 30, 25, '/images/ai-path.webp', 'Jane Smith', '/images/instructor2.png'],
    ['AI Ethics', 'Ethical considerations in AI', 'AI', 10, 8, '/images/ai-path.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['AI in Healthcare', 'Applications of AI in Healthcare', 'AI', 20, 16, '/images/ai-path.webp', 'Bob Brown', '/images/instructor4.png'],

    // Data Science
    ['Data Analysis with Python', 'Techniques for analyzing data using Python', 'Data Science', 22, 18, '/images/dataScience-path.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['Big Data Analytics', 'Introduction to Big Data', 'Data Science', 26, 21, '/images/dataScience-path.webp', 'Jane Smith', '/images/instructor2.png'],
    ['Data Visualization', 'Creating visualizations with Python', 'Data Science', 18, 14, '/images/dataScience-path.webp', 'Bob Brown', '/images/instructor4.png'],
    ['Statistics for Data Science', 'Statistical methods for data science', 'Data Science', 20, 15, '/images/dataScience-path.webp', 'John Doe', '/images/instructor.png'],

    // Cyber Security
    ['Cyber Security Basics', 'Introduction to Cyber Security', 'Cyber Security', 15, 12, '/images/cyberSecurity-path.webp', 'Jane Smith', '/images/instructor2.png'],
    ['Network Security', 'Securing network infrastructure', 'Cyber Security', 20, 16, '/images/cyberSecurity-path.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['Ethical Hacking', 'Introduction to ethical hacking', 'Cyber Security', 18, 14, '/images/cyberSecurity-path.webp', 'Bob Brown', '/images/instructor4.png'],

    // Mobile Development
    ['Android Development', 'Building apps for Android', 'Mobile Development', 25, 20, '/images/mobileDevelopment.webp', 'John Doe', '/images/instructor.png'],
    ['iOS Development', 'Building apps for iOS', 'Mobile Development', 24, 19, '/images/mobileDevelopment.webp', 'Jane Smith', '/images/instructor2.png'],

    // Cloud Computing
    ['Introduction to Cloud Computing', 'Basics of cloud services', 'Cloud Computing', 15, 12, '/images/cloud.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['AWS Fundamentals', 'Basics of AWS services', 'Cloud Computing', 20, 16, '/images/cloud.webp', 'Bob Brown', '/images/instructor4.png'],
    ['Azure Essentials', 'Introduction to Microsoft Azure', 'Cloud Computing', 18, 14, '/images/cloud.webp', 'John Doe', '/images/instructor.png'],
    ['Google Cloud Platform', 'Getting started with GCP', 'Cloud Computing', 22, 18, '/images/cloud.webp', 'Jane Smith', '/images/instructor2.png'],

    // Game Development
    ['Introduction to Game Development', 'Basics of game development', 'Game Development', 20, 16, '/images/gameDevelopment-path.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['Unity Game Development', 'Building games with Unity', 'Game Development', 25, 20, '/images/gameDevelopment-path.webp', 'Bob Brown', '/images/instructor4.png'],
    ['Unreal Engine Basics', 'Getting started with Unreal Engine', 'Game Development', 22, 18, '/images/gameDevelopment-path.webp', 'John Doe', '/images/instructor.png'],
    ['Mobile Game Development', 'Creating games for mobile platforms', 'Game Development', 24, 19, '/images/gameDevelopment-path.webp', 'Jane Smith', '/images/instructor2.png'],

    // Blockchain
    ['Blockchain Fundamentals', 'Basics of blockchain technology', 'Blockchain', 18, 14, '/images/blockchain.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['Smart Contracts', 'Developing smart contracts', 'Blockchain', 20, 16, '/images/blockchain.webp', 'Bob Brown', '/images/instructor4.png'],
    ['Cryptocurrency Essentials', 'Introduction to cryptocurrencies', 'Blockchain', 15, 12, '/images/blockchain.webp', 'John Doe', '/images/instructor.png'],
    ['Blockchain Security', 'Securing blockchain networks', 'Blockchain', 22, 18, '/images/blockchain.webp', 'Jane Smith', '/images/instructor2.png'],

    // Internet of Things (IoT)
    ['IoT Fundamentals', 'Introduction to IoT concepts', 'Internet of Things (IoT)', 20, 16, '/images/IoT.webp', 'Alice Johnson', '/images/instructor3.png'],
    ['Embedded Systems', 'Developing applications for embedded systems', 'Internet of Things (IoT)', 24, 19, '/images/IoT.webp', 'Bob Brown', '/images/instructor4.png'],
    ['IoT Security', 'Securing IoT devices and networks', 'Internet of Things (IoT)', 18, 14, '/images/IoT.webp', 'John Doe', '/images/instructor.png'],
    ['Cloud IoT Solutions', 'Implementing IoT solutions on cloud platforms', 'Internet of Things (IoT)', 22, 18, '/images/IoT.webp', 'Jane Smith', '/images/instructor2.png'],
  ];

  courses.forEach(course => {
    stmt.run(...course);
  });

  stmt.finalize();
});

app.get('/courses', (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) {
      res.status(500).send("Error retrieving courses");
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
