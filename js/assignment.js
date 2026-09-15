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

const defaultAssignments = [
    {
        title: "Database Assignment",
        subject: "DBMS",
        dueDate: "2026-04-25",
        faculty: "DBMS Faculty"
    },
    {
        title: "Web Development",
        subject: "Web Development",
        dueDate: "2026-04-28",
        faculty: "Web Development Faculty"
    },
    {
        title: "Math Homework",
        subject: "Discrete Mathematics",
        dueDate: "2026-04-23",
        faculty: "Mathematics Faculty"
    }
];

const assignmentsGrid = document.getElementById("assignmentsGrid");
const logoutBtn = document.getElementById("logoutBtn");
const searchInput = document.getElementById("searchInput");
const topUserName = document.getElementById("topUserName");
const sidebarUserName = document.getElementById("sidebarUserName");
const sidebarUserCourse = document.getElementById("sidebarUserCourse");
const sidebarUserBranch = document.getElementById("sidebarUserBranch");

function getOrdinal(n) {
    if (n === 1) return "1st";
    if (n === 2) return "2nd";
    if (n === 3) return "3rd";
    return `${n}th`;
}

function loadUserData() {
    sidebarUserName.textContent = currentUser.name;
    sidebarUserCourse.textContent = `B.Tech ${getOrdinal(currentUser.year)} Year - ${getOrdinal(currentUser.semester)} Semester`;
    sidebarUserBranch.textContent = `${currentUser.branch} - ${currentUser.section}`;
    topUserName.textContent = currentUser.shortName;
}

async function renderAssignments() {
    try {
        const response = await fetch("http://localhost:5000/assignments");

        if (!response.ok) {
            throw new Error("Failed to fetch assignments");
        }

        const backendAssignments = await response.json();

        const allAssignments = [
            ...defaultAssignments,
            ...backendAssignments
        ];

        if (!allAssignments.length) {
            assignmentsGrid.innerHTML = `<p style="color:#7e8799;">No assignments available yet.</p>`;
            return;
        }

        assignmentsGrid.innerHTML = allAssignments.map(item => `
            <div class="assignment-card">
                <div class="assignment-top">
                    <div class="assignment-icon icon-blue">
                        <i class="ri-book-open-line"></i>
                    </div>
                    <h3>${item.title}</h3>
                </div>

                <p class="assignment-date">Subject: ${item.subject}</p>
                <p class="assignment-date">Due Date: ${item.dueDate}</p>
                <p class="assignment-date">Faculty: ${item.faculty}</p>

                <button class="status-btn progress">Pending</button>
            </div>
        `).join("");
    } catch (error) {
        console.error("Assignment fetch error:", error);
        assignmentsGrid.innerHTML = `
            <p style="color:#ef4444;">
                Could not load assignments from backend.
            </p>
        `;
    }
}

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim().toLowerCase();

        if (query.includes("dashboard")) {
            window.location.href = "student-dashboard.html";
        } else if (query.includes("assignment")) {
            window.location.href = "assignment.html";
        } else if (query.includes("complaint") || query.includes("request")) {
            window.location.href = "complaint.html";
        } else if (query.includes("feedback")) {
            window.location.href = "feedback.html";
        } else {
            alert("No matching section found.");
        }
    }
});

logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        window.location.href = "index.html";
    }
});

loadUserData();
renderAssignments();