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

const issueTitle = document.getElementById("issueTitle");
const issueDescription = document.getElementById("issueDescription");
const submitComplaintBtn = document.getElementById("submitComplaintBtn");
const complaintMessage = document.getElementById("complaintMessage");

const leaveReason = document.getElementById("leaveReason");
const leaveDate = document.getElementById("leaveDate");
const submitLeaveBtn = document.getElementById("submitLeaveBtn");
const leaveMessage = document.getElementById("leaveMessage");

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

submitComplaintBtn.addEventListener("click", () => {
    const title = issueTitle.value.trim();
    const description = issueDescription.value.trim();

    if (!title || !description) {
        complaintMessage.textContent = "Please fill in all complaint fields.";
        return;
    }

    const complaintData = {
        studentName: currentUser.name,
        branch: currentUser.branch,
        section: currentUser.section,
        year: currentUser.year,
        semester: currentUser.semester,
        title,
        description,
        submittedAt: new Date().toLocaleString(),
        status: "Pending"
    };

    const existingComplaints = JSON.parse(localStorage.getItem("studentComplaints")) || [];
    existingComplaints.push(complaintData);
    localStorage.setItem("studentComplaints", JSON.stringify(existingComplaints));

    complaintMessage.textContent = "Complaint submitted successfully!";
    issueTitle.value = "";
    issueDescription.value = "";
});

submitLeaveBtn.addEventListener("click", () => {
    const reason = leaveReason.value.trim();
    const date = leaveDate.value;

    if (!reason || !date) {
        leaveMessage.textContent = "Please fill in all leave request fields.";
        return;
    }

    const leaveData = {
        studentName: currentUser.name,
        branch: currentUser.branch,
        section: currentUser.section,
        year: currentUser.year,
        semester: currentUser.semester,
        reason,
        date,
        submittedAt: new Date().toLocaleString(),
        status: "Pending"
    };

    const existingRequests = JSON.parse(localStorage.getItem("studentLeaveRequests")) || [];
    existingRequests.push(leaveData);
    localStorage.setItem("studentLeaveRequests", JSON.stringify(existingRequests));

    leaveMessage.textContent = "Leave request submitted successfully!";
    leaveReason.value = "";
    leaveDate.value = "";
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