const loginButton = document.querySelector("#login-button");
const loginLink = document.querySelector("#login-link");

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
    loginLink.innerText = "Logged in";
    loginButton.disabled = true;
    loginButton.style.opacity = 0.7;
    loginButton.style.cursor = "not-allowed";

    loginLink.removeAttribute("href");
    loginLink.style.pointerEvents = "none";
}

loginButton.addEventListener("click", () => window.location.href = "login.html");

const coursesContainer = document.querySelector("#courses-container");

async function loadAvailableCourses() {
    let courses = [];
    const response = await fetch("data/courses.json");
    courses = await response.json();
    // Showing only the courses that are pending (the registration is open):
    const availableCourses = courses.filter(course => course.status === "Pending");
    const coursesCards = availableCourses.map(course => convertCourseToHTML(course)).join(" ");
    coursesContainer.innerHTML = coursesCards;
}

function convertCourseToHTML(course) {
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
                </div>
                <button class="button register-button" id="register-button" type="button" 
                onclick="handleRegisterClick('${course.id}', '${course.prerequisites}',
                '${course["enrollment limit"]}', '${course["actual enrollment"]}',
                '${course.status}')">Register</button>
                <button class="button" id="info-button" type="button"
                onclick="handleViewMoreClick('${course.id}', '${course.semester}',
                '${course["credit hours"]}', '${course.prerequisites.join(", ")}',
                '${course["enrollment limit"]}', '${course["actual enrollment"]}',
                '${course.status}', '${course.validation}')">View more</button>
            </div>
            `
}

// Initially, all courses that are pending (the registration is open) will be displayed:
loadAvailableCourses();

const extraCourseInfo = document.querySelector("#extra-course-info");
const modal = document.querySelector("#modal");

function handleViewMoreClick(id, semester, creditHours, prerequisites, enrollmentLimit, actualEnrollment, status, validation) {
    modal.style.display = "flex";
    // If the course has no prerequisites, "No prerequisites" will be displayed:
    if (!prerequisites) {
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

const searchOption = document.querySelector("#search-option");
const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", handleSearchInputChange);

async function handleSearchInputChange() {
    const option = searchOption.value;
    const searchTerms = searchInput.value.toLowerCase().trim().split(" ");

    let courses = [];
    const response = await fetch("data/courses.json");
    courses = await response.json();
    const availableCourses = courses.filter(course => course.status === "Pending");

    const matchedCourses = [];

    availableCourses.forEach(c => {
        // A score variable to rank courses according to how much they match the search input:
        let score = 0;
        searchTerms.forEach(t => {
            if (c[option].toLowerCase().includes(t)) {
                score += 1;
            }
        })
        if (score > 0) {
            matchedCourses.push({c, score});
        }
    });

    if (matchedCourses.length > 0) {
        matchedCourses.sort((a, b) => b.score - a.score);
        const coursesCards = matchedCourses.map(e => e.c).map(course => convertCourseToHTML(course)).join(" ");
        coursesContainer.innerHTML = coursesCards;
    }
    else {
        coursesContainer.innerHTML = `<p>No matches</p>`;
    }
}

const learningPathButton = document.querySelector("#learning-path-button");
const errorMessage = document.querySelector("#error-message");

learningPathButton.addEventListener("click", handleLearningPathClick);

function handleLearningPathClick() {
    if (!loggedInUser) {
        errorMessage.innerText = "You must be logged in to view the learning path.";
        return;
    }
    if (loggedInUser.type !== "student") {
        errorMessage.innerText = "Only students can access the learning path.";
        return;
    }
    window.location.href = "learning-path.html";
}

function handleRegisterClick(id, prerequisites, limit, actual, status) {
    const updatedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!updatedUser) {
        modal.style.display = "flex";
        extraCourseInfo.innerHTML = `
            <span id="close-button" class="close-button" onclick="handleCloseButtonClick()">&times;</span>
            <p class="error-message">You must login to be able to register.</p>`;
        return;
    }
    if (updatedUser.type !== "student") {
        modal.style.display = "flex";
        extraCourseInfo.innerHTML = `
            <span id="close-button" class="close-button" onclick="handleCloseButtonClick()">&times;</span>
            <p class="error-message">Only students can register for courses.</p>`;
        return;
    }
    if (status !== "Pending") {
        modal.style.display = "flex";
        extraCourseInfo.innerHTML = `
            <span id="close-button" class="close-button" onclick="handleCloseButtonClick()">&times;</span>
            <p class="error-message">This course is not open for registration.</p>`;
        return;
    }

    const studentCourses = updatedUser["courses and grades"];
    const prerequisitesList = prerequisites ? prerequisites.split(",") : [];

    const hasAllPrereqs = prerequisitesList.every(prereq => {
        if (studentCourses[prereq] !== undefined) {
            if (studentCourses[prereq] >= 60) {
                return true;
            }
        }
        return false;
    });

    if (!hasAllPrereqs) {
        modal.style.display = "flex";
        extraCourseInfo.innerHTML = `
            <span id="close-button" class="close-button" onclick="handleCloseButtonClick()">&times;</span>
            <p class="error-message">You must pass all prerequisites before registering for this course.</p>`;
        return;
    }

    if (Number(actual) >= Number(limit)) {
        modal.style.display = "flex";
        extraCourseInfo.innerHTML = `
            <span id="close-button" class="close-button" onclick="handleCloseButtonClick()">&times;</span>
            <p class="error-message">This course is full.</p>`;
        return;
    }

    if (studentCourses.hasOwnProperty(id)) {
        modal.style.display = "flex";
        extraCourseInfo.innerHTML = `
            <span id="close-button" class="close-button" onclick="handleCloseButtonClick()">&times;</span>
            <p class="error-message">You already registered for this course.</p>`;
        return;
    }

    // (null) is used here because the grade is not available:
    updatedUser["courses and grades"][id] = null;

    // Updating (loggedInUser) to include the new course:
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    modal.style.display = "flex";
    extraCourseInfo.innerHTML = `
        <span id="close-button" class="close-button" onclick="handleCloseButtonClick()">&times;</span>
        <p class="success-message">You have successfully registered for this course.</p>`;
}