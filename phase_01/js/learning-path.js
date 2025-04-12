const mainPageButton = document.querySelector("#main-page-button");
mainPageButton.addEventListener("click", handleMainPageClick);

function handleMainPageClick() {
    window.location.href = "index.html";
}

const completedCoursesContainer = document.querySelector("#completed-courses");
const inProgressCoursesContainer = document.querySelector("#in-progress-courses");
const pendingCoursesContainer = document.querySelector("#pending-courses");

async function loadLearningPathCourses() {
    const response = await fetch("data/courses.json");
    const allCourses = await response.json();

    const courseIDsAndGrades = JSON.parse(localStorage.getItem("loggedInUser"))["courses and grades"];

    const completedCourses = [];
    const inProgressCourses = [];
    const pendingCourses = [];

    const courseIDs = Object.keys(courseIDsAndGrades);
    courseIDs.forEach(id => {
        allCourses.forEach(course => {
            if (course.id === id && course.status === "Ended") {
                if (courseIDsAndGrades[id] >= 60) {
                    completedCourses.push(course);
                }
            }
            else if (course.id === id && course.status === "In progress") {
                inProgressCourses.push(course);
            }
            else if (course.id === id && course.status === "Pending") {
                pendingCourses.push(course);
            }
        });
    });

    if (completedCourses.length === 0) {
        completedCoursesContainer.innerHTML = `<p>No matches</p>`;
    }
    else {
        const completedCoursesCards = completedCourses.map(course => convertCourseToHTML(course, courseIDsAndGrades[course.id])).join(" ");
        completedCoursesContainer.innerHTML = completedCoursesCards;
    }

    if (inProgressCourses.length === 0) {
        inProgressCoursesContainer.innerHTML = `<p>No matches</p>`;
    }
    else {
        const inProgressCoursesCards = inProgressCourses.map(course => convertCourseToHTML(course, courseIDsAndGrades[course.id])).join(" ");
        inProgressCoursesContainer.innerHTML = inProgressCoursesCards;
    }

    if (pendingCourses.length === 0) {
        pendingCoursesContainer.innerHTML = `<p>No matches</p>`;
    }
    else {
        const pendingCoursesCards = pendingCourses.map(course => convertCourseToHTML(course, courseIDsAndGrades[course.id])).join(" ");
        pendingCoursesContainer.innerHTML = pendingCoursesCards;
    }
}

function convertToLetterGrade(grade) {
    if (!grade) {
        return "Not available";
    }
    else if (grade < 60) {
        return "F";
    } 
    else if (grade < 65) {
        return "D";
    } 
    else if (grade < 70) {
        return "D+";
    } 
    else if (grade < 75) {
        return "C";
    } 
    else if (grade < 80) {
        return "C+";
    } 
    else if (grade < 85) {
        return "B";
    } 
    else if (grade < 90) {
        return "B+";
    } 
    else if (grade <= 100) {
        return "A";
    }
}

function convertCourseToHTML(course, grade) {
    return `
            <div class="course-card">
                <img src="${course.icon}" alt="${course.name} icon" class="course-logo">
                <div class="course-info">
                    <div id="name">
                        <h3>Name</h3>
                        <p>${course.name}</p>
                    </div>
                    <div id="code">
                        <h3>Code</h3>
                        <p>${course.code}</p>
                    </div>
                    <div id="category">
                        <h3>Category</h3>
                        <p>${course.category}</p>
                    </div>
                    <div id="instructor">
                        <h3>Instructor</h3>
                        <p>${course.instructor}</p>
                    </div>
                    <div id="section">
                        <h3>Section</h3>
                        <p>${course.section}</p>
                    </div>
                    <div id="grade">
                        <h3>Grade</h3>
                        <p>${convertToLetterGrade(grade)} (${grade})</p>
                    </div>
                </div>                
                <button class="button" id="info-button" type="button"
                onclick="handleViewMoreClick('${course.id}', '${course.semester}',
                '${course["credit hours"]}', '${course.prerequisites.join(", ")}',
                '${course["enrollment limit"]}', '${course["actual enrollment"]}',
                '${course.status}', '${course.validation}')">View more</button>
            </div>
            `
}

loadLearningPathCourses();

const extraCourseInfo = document.querySelector("#extra-course-info");
const modal = document.querySelector("#modal");

function handleViewMoreClick(id, semester, creditHours, prerequisites, enrollmentLimit, actualEnrollment, status, validation) {
    modal.style.display = "flex";
    if (!prerequisites) {
        // If the course has no prerequisites, "No prerequisites" will be displayed:
        prerequisites = "No prerequisites";
    }
    extraCourseInfo.innerHTML = `
        <span id="close-button" class="close-button" onclick="handleCloseButtonClick()">&times;</span>
            <div>
                <h3>ID</h3>
                <p>${id}</p>
            </div>
            <div>
                <h3>Semester</h3>
                <p>${semester}</p>
            </div>
            <div>
                <h3>Credit hours</h3>
                <p>${creditHours}</p>
            </div>
            <div>
                <h3>Prerequisites</h3>
                <p>${prerequisites}</p>
            </div>
            <div>
                <h3>Enrollment limit</h3>
                <p>${enrollmentLimit}</p>
            </div>
            <div>
                <h3>Actual enrollment</h3>
                <p>${actualEnrollment}</p>
            </div>
            <div>
                <h3>Status</h3>
                <p>${status}</p>
            </div>
            <div>
                <h3>Validated?</h3>
                <p>${validation}</p>
            </div>`
}

function handleCloseButtonClick() {
    modal.style.display = "none";
}