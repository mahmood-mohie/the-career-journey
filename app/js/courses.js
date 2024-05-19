document.addEventListener('DOMContentLoaded', () => {
    const allCoursesButton = document.getElementById('all-courses');
    const webDevButton = document.getElementById('web-development');
    const aiCoursesButton = document.getElementById('ai-courses');
    const courseList = document.getElementById('course-list');
    const devops = document.getElementById('devops');
    const dataScience = document.getElementById('data-science');
    const cyberSecurity = document.getElementById('cyber-security');
    const mobileDevelopment = document.getElementById('mobile-development');
    const cloudComputing = document.getElementById('cloud-computing');
    const gameDevelopment = document.getElementById('game-development');
    const blockchain = document.getElementById('blockchain');
    const internetOfThings = document.getElementById('internet-of-things');
  
    function fetchCourses(category) {
      fetch('http://localhost:3000/courses')
        .then(response => response.json())
        .then(data => {
          let filteredCourses = data;
          if (category) {
            filteredCourses = data.filter(course => course.category === category);
          }
          displayCourses(filteredCourses);
        })
        .catch(error => console.error('Error fetching courses:', error));
    }
  
    function displayCourses(courses) {
      courseList.innerHTML = '';
      courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
  
        const courseImage = document.createElement('img');
        courseImage.src = course.image;
        courseCard.appendChild(courseImage);
  
        const courseContent = document.createElement('div');
        courseContent.classList.add('course-content');
        
        const courseTitle = document.createElement('div');
        courseTitle.classList.add('course-title');
        courseTitle.textContent = course.title;
        courseContent.appendChild(courseTitle);
  
        const courseDetails = document.createElement('div');
        courseDetails.classList.add('course-details');
        courseDetails.innerHTML = `
          <p>${course.description}</p>
          <p>Hours: ${course.hours}</p>
          <p>Lessons: ${course.lessons}</p>
        `;
        courseContent.appendChild(courseDetails);
  
        const instructor = document.createElement('div');
        instructor.classList.add('instructor');
  
        const instructorImage = document.createElement('img');
        instructorImage.src = course.instructor_image;
        instructor.appendChild(instructorImage);
  
        const instructorName = document.createElement('span');
        instructorName.textContent = course.instructor;
        instructor.appendChild(instructorName);
  
        courseContent.appendChild(instructor);
        courseCard.appendChild(courseContent);
        courseList.appendChild(courseCard);
      });
    }
  
    allCoursesButton.addEventListener('click', () => fetchCourses());
    webDevButton.addEventListener('click', () => fetchCourses('Web Development'));
    aiCoursesButton.addEventListener('click', () => fetchCourses('AI'));
    devops.addEventListener('click', () => fetchCourses('DevOps'));
    dataScience.addEventListener('click', () => fetchCourses('Data Science'));
    cyberSecurity.addEventListener('click', () => fetchCourses('Cyber Security'));
    mobileDevelopment.addEventListener('click', () => fetchCourses('Mobile Development'));
    cloudComputing.addEventListener('click', () => fetchCourses('Cloud Computing'));
    gameDevelopment.addEventListener('click', () => fetchCourses('Game Development'));
    blockchain.addEventListener('click', () => fetchCourses('Blockchain'));
    internetOfThings.addEventListener('click', () => fetchCourses('Internet of Things (IoT)'));
  
    fetchCourses();
  });
  