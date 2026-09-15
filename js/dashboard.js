// Dummy logged-in user data
// Later you can fetch this from backend / database
// const currentUser = {
//     name: "S. Bhuvana Kruthi",
//     shortName: "Bhuvana",
//     role: "student",
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

// Weekly timetable from your screenshot
const timetable = {
    Monday: [
        {
            subject: "DBMS",
            location: "Classroom",
            time: "9:30 - 10:30 AM",
            icon: "ri-database-2-line",
            color: "blue"
        },
        {
            subject: "Software Engineering",
            location: "Classroom",
            time: "10:30 - 11:30 AM",
            icon: "ri-book-open-line",
            color: "orange"
        },
        {
            subject: "Discrete Mathematics",
            location: "Classroom",
            time: "11:30 - 12:30 PM",
            icon: "ri-function-line",
            color: "purple"
        },
        {
            subject: "BEFA",
            location: "Classroom",
            time: "1:30 - 2:30 PM",
            icon: "ri-line-chart-line",
            color: "blue"
        },
        {
            subject: "Operating Systems",
            location: "Classroom",
            time: "2:30 - 3:30 PM",
            icon: "ri-computer-line",
            color: "orange"
        },
        {
            subject: "COI",
            location: "Classroom",
            time: "3:30 - 4:30 PM",
            icon: "ri-government-line",
            color: "purple"
        }
    ],
    Tuesday: [
        {
            subject: "OS Lab",
            location: "Lab",
            time: "9:30 - 12:30 PM",
            icon: "ri-code-box-line",
            color: "blue"
        },
        {
            subject: "Library",
            location: "Library",
            time: "1:30 - 2:30 PM",
            icon: "ri-book-shelf-line",
            color: "orange"
        },
        {
            subject: "Software Engineering",
            location: "Classroom",
            time: "2:30 - 3:30 PM",
            icon: "ri-book-open-line",
            color: "purple"
        },
        {
            subject: "BEFA",
            location: "Classroom",
            time: "3:30 - 4:30 PM",
            icon: "ri-line-chart-line",
            color: "blue"
        }
    ],
    Wednesday: [
        {
            subject: "Discrete Mathematics",
            location: "Classroom",
            time: "9:30 - 10:30 AM",
            icon: "ri-function-line",
            color: "blue"
        },
        {
            subject: "COI",
            location: "Classroom",
            time: "10:30 - 11:30 AM",
            icon: "ri-government-line",
            color: "orange"
        },
        {
            subject: "Software Engineering",
            location: "Classroom",
            time: "11:30 - 12:30 PM",
            icon: "ri-book-open-line",
            color: "purple"
        },
        {
            subject: "Real-Time Research Project",
            location: "Lab / Project Session",
            time: "1:30 - 3:30 PM",
            icon: "ri-lightbulb-flash-line",
            color: "blue"
        }
    ],
    Thursday: [
        {
            subject: "Node JS / React JS / Django Lab",
            location: "Lab",
            time: "9:30 - 12:30 PM",
            icon: "ri-code-s-slash-line",
            color: "purple"
        },
        {
            subject: "DBMS",
            location: "Classroom",
            time: "1:30 - 2:30 PM",
            icon: "ri-database-2-line",
            color: "blue"
        },
        {
            subject: "Discrete Mathematics",
            location: "Classroom",
            time: "2:30 - 3:30 PM",
            icon: "ri-function-line",
            color: "orange"
        },
        {
            subject: "CRT",
            location: "Classroom",
            time: "3:30 - 4:30 PM",
            icon: "ri-user-star-line",
            color: "purple"
        }
    ],
    Friday: [
        {
            subject: "Operating Systems",
            location: "Classroom",
            time: "9:30 - 10:30 AM",
            icon: "ri-computer-line",
            color: "blue"
        },
        {
            subject: "Discrete Mathematics",
            location: "Classroom",
            time: "10:30 - 11:30 AM",
            icon: "ri-function-line",
            color: "orange"
        },
        {
            subject: "BEFA",
            location: "Classroom",
            time: "11:30 - 12:30 PM",
            icon: "ri-line-chart-line",
            color: "purple"
        },
        {
            subject: "DBMS Lab",
            location: "Lab",
            time: "1:30 - 3:30 PM",
            icon: "ri-code-box-line",
            color: "blue"
        },
        {
            subject: "RTRP",
            location: "Project Session",
            time: "3:30 - 4:30 PM",
            icon: "ri-lightbulb-flash-line",
            color: "orange"
        }
    ],
    Saturday: [
        {
            subject: "ECA / Student Clubs",
            location: "Activity Hall",
            time: "9:30 - 12:30 PM",
            icon: "ri-team-line",
            color: "purple"
        },
        {
            subject: "Operating Systems",
            location: "Classroom",
            time: "1:30 - 2:30 PM",
            icon: "ri-computer-line",
            color: "blue"
        },
        {
            subject: "DBMS",
            location: "Classroom",
            time: "2:30 - 3:30 PM",
            icon: "ri-database-2-line",
            color: "orange"
        },
        {
            subject: "COI",
            location: "Classroom",
            time: "3:30 - 4:30 PM",
            icon: "ri-government-line",
            color: "purple"
        }
    ],
    Sunday: []
};

const sidebarUserName = document.getElementById("sidebarUserName");
const sidebarUserCourse = document.getElementById("sidebarUserCourse");
const sidebarUserBranch = document.getElementById("sidebarUserBranch");
const topUserName = document.getElementById("topUserName");
const mainWelcomeName = document.getElementById("mainWelcomeName");
const welcomeText = document.getElementById("welcomeText");
const mainWelcomeSubtext = document.getElementById("mainWelcomeSubtext");
const todayLabel = document.getElementById("todayLabel");
const todayDayText = document.getElementById("todayDayText");
const userRoleText = document.getElementById("userRoleText");
const scheduleList = document.getElementById("scheduleList");
const classesCount = document.getElementById("classesCount");
const searchInput = document.getElementById("searchInput");
const logoutBtn = document.getElementById("logoutBtn");

function formatStudentCourse(user) {
    return `B.Tech ${user.year}nd Year - ${user.semester}nd Semester`;
}

// Safer year/semester text helper
function getOrdinal(n) {
    if (n === 1) return "1st";
    if (n === 2) return "2nd";
    if (n === 3) return "3rd";
    return `${n}th`;
}

function fillUserData() {
    sidebarUserName.textContent = currentUser.name;
    sidebarUserCourse.textContent = `B.Tech ${getOrdinal(currentUser.year)} Year - ${getOrdinal(currentUser.semester)} Semester`;
    sidebarUserBranch.textContent = `${currentUser.branch} - ${currentUser.section}`;

    topUserName.textContent = currentUser.shortName;
    mainWelcomeName.textContent = `Welcome, ${currentUser.name}`;
    welcomeText.textContent = `Logged in as ${currentUser.role}`;
    mainWelcomeSubtext.textContent = `Here is your academic overview for today.`;

    userRoleText.textContent = `${currentUser.branch} - ${currentUser.section}`;
}

function getTodayName() {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return days[new Date().getDay()];
}

function renderTodaySchedule() {
    const today = getTodayName();
    const todayClasses = timetable[today] || [];

    todayLabel.textContent = today;
    todayDayText.textContent = `${today}'s classes`;
    classesCount.textContent = todayClasses.length;

    if (todayClasses.length === 0) {
        scheduleList.innerHTML = `
            <div class="no-classes">
                <i class="ri-calendar-close-line"></i>
                <h3>No classes scheduled today</h3>
                <p>Enjoy your day or use the dashboard to manage other academic activities.</p>
            </div>
        `;
        return;
    }

    scheduleList.innerHTML = todayClasses.map(item => `
        <div class="schedule-item">
            <div class="schedule-icon ${item.color}">
                <i class="${item.icon}"></i>
            </div>

            <div class="schedule-details">
                <h4>${item.subject}</h4>
                <p>${item.location}</p>
            </div>

            <div class="schedule-time">${item.time}</div>
        </div>
    `).join("");
}

function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) return;

    if (query.includes("feedback")) {
        window.location.href = "feedback.html";
        return;
    }

    if (query.includes("assignment")) {
        window.location.href = "assignment.html";
        return;
    }

    if (query.includes("complaint") || query.includes("request")) {
        window.location.href = "complaint.html";
        return;
    }

    if (query.includes("dashboard")) {
        window.location.href = "student-dashboard.html";
        return;
    }

    alert("No matching section found.");
}



function handleLogout() {
    logoutBtn.addEventListener("click", () => {
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            window.location.href = "index.html";
        }
    });
}

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

fillUserData();
renderTodaySchedule();
handleLogout();