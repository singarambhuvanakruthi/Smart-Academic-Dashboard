// const currentTeacher = {
//     name: "Mohammed Arshad Hussain",
//     shortName: "Arshad Sir",
//     role: "Assistant Professor",
//     department: "Department of Computer Science Engineering",
//     subject: "Operating Systems",
//     section: "CSE-A"
// };

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user || user.role !== "teacher") {
    alert("Unauthorized access");
    window.location.href = "index.html";
}

// Dynamic teacher object
const currentTeacher = {
    name: user.full_name,
    subject: user.subject,
    section: user.section,
    department: user.department,
    shortName: user.full_name.split(" ")[0]
};

const teacherSchedule = [
    {
        subject: "Operating Systems",
        section: "CSE-A",
        time: "1:30 - 2:30 PM",
        day: "Saturday",
        room: "Classroom"
    },
    {
        subject: "Operating Systems",
        section: "CSE-A",
        time: "9:30 - 10:30 AM",
        day: "Friday",
        room: "Classroom"
    },
    {
        subject: "Operating Systems",
        section: "CSE-A",
        time: "2:30 - 3:30 PM",
        day: "Monday",
        room: "Classroom"
    }
];

const sidebarUserName = document.getElementById("sidebarUserName");
const sidebarUserRole = document.getElementById("sidebarUserRole");
const sidebarUserDept = document.getElementById("sidebarUserDept");
const topUserName = document.getElementById("topUserName");
const mainWelcomeName = document.getElementById("mainWelcomeName");
const todayLabel = document.getElementById("todayLabel");
const todayDayText = document.getElementById("todayDayText");
const scheduleList = document.getElementById("scheduleList");
const classesCount = document.getElementById("classesCount");
const assignmentCount = document.getElementById("assignmentCount");
const requestCount = document.getElementById("requestCount");
const notifCount = document.getElementById("notifCount");
const searchInput = document.getElementById("searchInput");
const logoutBtn = document.getElementById("logoutBtn");

function getTodayName() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
}

function fillTeacherData() {
    sidebarUserName.textContent = currentTeacher.name;
    sidebarUserRole.textContent = currentTeacher.role;
    sidebarUserDept.textContent = `${currentTeacher.department} | ${currentTeacher.subject} Faculty`;
    topUserName.textContent = currentTeacher.shortName;
    mainWelcomeName.textContent = `Welcome, ${currentTeacher.name}`;
}

function renderTodaySchedule() {
    const today = getTodayName();
    const todayClasses = teacherSchedule.filter(
        item => item.day === today && item.subject === currentTeacher.subject
    );

    todayLabel.textContent = today;
    todayDayText.textContent = `${today}'s ${currentTeacher.subject} classes`;
    classesCount.textContent = todayClasses.length;

    if (!todayClasses.length) {
        scheduleList.innerHTML = `
            <p style="color:#7e8799;">
                No ${currentTeacher.subject} classes scheduled for today.
            </p>
        `;
        return;
    }

    scheduleList.innerHTML = todayClasses.map(item => `
        <div class="schedule-item">
            <div class="schedule-icon blue">
                <i class="ri-computer-line"></i>
            </div>
            <div class="schedule-details">
                <h4>${item.subject}</h4>
                <p>${item.section} • ${item.room}</p>
            </div>
            <div class="schedule-time">${item.time}</div>
        </div>
    `).join("");
}

function loadCounts() {
    const assignments = JSON.parse(localStorage.getItem("teacherAssignments")) || [];
    const complaints = JSON.parse(localStorage.getItem("studentComplaints")) || [];
    const requests = JSON.parse(localStorage.getItem("studentLeaveRequests")) || [];

    const subjectAssignments = assignments.filter(
        item => item.subject === currentTeacher.subject
    );

    assignmentCount.textContent = subjectAssignments.length;
    requestCount.textContent = complaints.length + requests.length;
    notifCount.textContent = complaints.length + requests.length;
}

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim().toLowerCase();

        if (query.includes("dashboard")) window.location.href = "teacher-dashboard.html";
        else if (query.includes("feedback")) window.location.href = "teacher-feedback.html";
        else if (query.includes("assignment")) window.location.href = "teacher-assignment.html";
        else if (query.includes("complaint") || query.includes("request")) window.location.href = "teacher-requests.html";
        else alert("No matching section found.");
    }
});

logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        window.location.href = "index.html";
    }
});

fillTeacherData();
renderTodaySchedule();
loadCounts();