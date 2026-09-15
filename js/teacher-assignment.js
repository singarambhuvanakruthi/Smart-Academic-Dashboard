// const currentTeacher = {
//     name: "Mohammed Arshad Hussain",
//     shortName: "Arshad Sir",
//     role: "Assistant Professor",
//     department: "Department of Computer Science Engineering",
//     subject: "Operating Systems",
//     section: "CSE-A"
// };

const user = JSON.parse(localStorage.getItem("loggedInUser"));

const currentTeacher = {
    name: user.full_name,
    subject: user.subject,
    section: user.section,
    department: user.department,
    shortName: user.full_name.split(" ")[0]
};

const sidebarUserName = document.getElementById("sidebarUserName");
const sidebarUserRole = document.getElementById("sidebarUserRole");
const sidebarUserDept = document.getElementById("sidebarUserDept");
const topUserName = document.getElementById("topUserName");

const subjectName = document.getElementById("subjectName");
const assignmentTitle = document.getElementById("assignmentTitle");
const dueDate = document.getElementById("dueDate");
const createAssignmentBtn = document.getElementById("createAssignmentBtn");
const assignmentMessage = document.getElementById("assignmentMessage");
const searchInput = document.getElementById("searchInput");
const logoutBtn = document.getElementById("logoutBtn");

function fillTeacherData() {
    sidebarUserName.textContent = currentTeacher.name;
    sidebarUserRole.textContent = currentTeacher.role;
    sidebarUserDept.textContent = `${currentTeacher.department} | ${currentTeacher.subject} Faculty`;
    topUserName.textContent = currentTeacher.shortName;

    subjectName.value = currentTeacher.subject;
    subjectName.readOnly = true;
}

createAssignmentBtn.addEventListener("click", async () => {
    const subject = currentTeacher.subject;
    const title = assignmentTitle.value.trim();
    const due = dueDate.value;

    if (!title || !due) {
        assignmentMessage.textContent = "Please fill in assignment title and due date.";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/add-assignment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                subject: subject,
                dueDate: due,
                faculty: currentTeacher.name
            })
        });

        const message = await response.text();
        assignmentMessage.textContent = message;

        assignmentTitle.value = "";
        dueDate.value = "";
    } catch (error) {
        console.error(error);
        assignmentMessage.textContent = "Failed to create assignment.";
    }
});

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