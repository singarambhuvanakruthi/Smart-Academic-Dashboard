// const currentUser = {
//     name: "S. Bhuvana Kruthi",
//     shortName: "Bhuvana",
//     year: 2,
//     semester: 2,
//     branch: "CSE",
//     section: "A"
// };

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user || user.role !== "student") {
    alert("Unauthorized access");
    window.location.href = "index.html";
}

const currentUser = {
    name: user.full_name,
    shortName: user.full_name.split(" ")[0],
    branch: user.section ? user.section.split("-")[0] : "CSE",
    section: user.section ? user.section.split("-")[1] : "A",
    year: 2,
    semester: 2
};

const timetable = {
    Monday: [
        { subject: "DBMS", time: "9:30 - 10:30 AM" },
        { subject: "Software Engineering", time: "10:30 - 11:30 AM" },
        { subject: "Discrete Mathematics", time: "11:30 - 12:30 PM" },
        { subject: "BEFA", time: "1:30 - 2:30 PM" },
        { subject: "Operating Systems", time: "2:30 - 3:30 PM" },
        { subject: "COI", time: "3:30 - 4:30 PM" }
    ],
    Tuesday: [
        { subject: "OS Lab", time: "9:30 - 12:30 PM" },
        { subject: "Library", time: "1:30 - 2:30 PM" },
        { subject: "Software Engineering", time: "2:30 - 3:30 PM" },
        { subject: "BEFA", time: "3:30 - 4:30 PM" }
    ],
    Wednesday: [
        { subject: "Discrete Mathematics", time: "9:30 - 10:30 AM" },
        { subject: "COI", time: "10:30 - 11:30 AM" },
        { subject: "Software Engineering", time: "11:30 - 12:30 PM" },
        { subject: "RTRP", time: "1:30 - 3:30 PM" }
    ],
    Thursday: [
        { subject: "Node JS / React JS / Django Lab", time: "9:30 - 12:30 PM" },
        { subject: "DBMS", time: "1:30 - 2:30 PM" },
        { subject: "Discrete Mathematics", time: "2:30 - 3:30 PM" },
        { subject: "CRT", time: "3:30 - 4:30 PM" }
    ],
    Friday: [
        { subject: "Operating Systems", time: "9:30 - 10:30 AM" },
        { subject: "Discrete Mathematics", time: "10:30 - 11:30 AM" },
        { subject: "BEFA", time: "11:30 - 12:30 PM" },
        { subject: "DBMS Lab", time: "1:30 - 3:30 PM" },
        { subject: "RTRP", time: "3:30 - 4:30 PM" }
    ],
    Saturday: [
        { subject: "ECA / Student Clubs", time: "9:30 - 12:30 PM" },
        { subject: "Operating Systems", time: "1:30 - 2:30 PM" },
        { subject: "DBMS", time: "2:30 - 3:30 PM" },
        { subject: "COI", time: "3:30 - 4:30 PM" }
    ],
    Sunday: []
};

const todaySubjects = document.getElementById("todaySubjects");
const classTime = document.getElementById("classTime");
const doubtText = document.getElementById("doubtText");
const submitFeedbackBtn = document.getElementById("submitFeedbackBtn");
const feedbackMessage = document.getElementById("feedbackMessage");
const logoutBtn = document.getElementById("logoutBtn");
const searchInput = document.getElementById("searchInput");
const topUserName = document.getElementById("topUserName");
const sidebarUserName = document.getElementById("sidebarUserName");
const sidebarUserCourse = document.getElementById("sidebarUserCourse");
const sidebarUserBranch = document.getElementById("sidebarUserBranch");

let selectedFeedback = "";
let selectedSubject = null;

function getOrdinal(n) {
    if (n === 1) return "1st";
    if (n === 2) return "2nd";
    if (n === 3) return "3rd";
    return `${n}th`;
}

function getTodayName() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
}

function loadUserData() {
    sidebarUserName.textContent = currentUser.name;
    sidebarUserCourse.textContent = `B.Tech ${getOrdinal(currentUser.year)} Year - ${getOrdinal(currentUser.semester)} Semester`;
    sidebarUserBranch.textContent = `${currentUser.branch} - ${currentUser.section}`;
    topUserName.textContent = currentUser.shortName;
}

function renderTodaySubjects() {
    const today = getTodayName();
    const classes = timetable[today] || [];

    if (classes.length === 0) {
        todaySubjects.innerHTML = `<p style="color:#7b8498;">No classes available for today.</p>`;
        return;
    }

    todaySubjects.innerHTML = classes.map((item, index) => `
        <button class="subject-chip" data-index="${index}">
            ${item.subject}
        </button>
    `).join("");

    const chips = document.querySelectorAll(".subject-chip");

    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");

            const index = Number(chip.dataset.index);
            selectedSubject = classes[index];
            classTime.textContent = selectedSubject.time;
        });
    });
}

function setupFeedbackButtons() {
    document.querySelectorAll(".feedback-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".feedback-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            selectedFeedback = button.dataset.value;
        });
    });
}

function resetForm() {
    selectedSubject = null;
    selectedFeedback = "";
    doubtText.value = "";
    classTime.textContent = "Select one of today’s subjects";

    document.querySelectorAll(".subject-chip").forEach(chip => chip.classList.remove("active"));
    document.querySelectorAll(".feedback-btn").forEach(btn => btn.classList.remove("active"));
}

submitFeedbackBtn.addEventListener("click", () => {
    if (!selectedSubject) {
        feedbackMessage.textContent = "Please select one of today’s subjects.";
        return;
    }

    if (!selectedFeedback) {
        feedbackMessage.textContent = "Please select a feedback option.";
        return;
    }

    const feedbackData = {
        subject: selectedSubject.subject,
        time: selectedSubject.time,
        feedback: selectedFeedback,
        doubt: doubtText.value.trim(),
        day: getTodayName(),
        submittedAt: new Date().toLocaleString()
    };

    const existingFeedback = JSON.parse(localStorage.getItem("studentFeedback")) || [];
    existingFeedback.push(feedbackData);
    localStorage.setItem("studentFeedback", JSON.stringify(existingFeedback));

    feedbackMessage.textContent = "Your response is submitted.";
    resetForm();
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim().toLowerCase();

        if (query.includes("dashboard")) window.location.href = "student-dashboard.html";
        else if (query.includes("assignment")) window.location.href = "assignment.html";
        else if (query.includes("complaint") || query.includes("request")) window.location.href = "complaint.html";
        else if (query.includes("feedback")) window.location.href = "feedback.html";
        else alert("No matching section found.");
    }
});

logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        window.location.href = "index.html";
    }
});

loadUserData();
renderTodaySubjects();
setupFeedbackButtons();