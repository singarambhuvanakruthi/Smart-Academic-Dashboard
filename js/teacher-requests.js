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
const notifCount = document.getElementById("notifCount");
const complaintsList = document.getElementById("complaintsList");
const requestsList = document.getElementById("requestsList");
const detailView = document.getElementById("detailView");
const searchInput = document.getElementById("searchInput");
const logoutBtn = document.getElementById("logoutBtn");

function fillTeacherData() {
    sidebarUserName.textContent = currentTeacher.name;
    sidebarUserRole.textContent = currentTeacher.role;
    sidebarUserDept.textContent = `${currentTeacher.department} | ${currentTeacher.subject} Faculty`;
    topUserName.textContent = currentTeacher.shortName;
}

function renderComplaintsAndRequests() {
    const complaints = JSON.parse(localStorage.getItem("studentComplaints")) || [];
    const requests = JSON.parse(localStorage.getItem("studentLeaveRequests")) || [];

    notifCount.textContent = complaints.length + requests.length;

    if (!complaints.length) {
        complaintsList.innerHTML = `<p style="color:#7e8799;">No complaints received yet.</p>`;
    } else {
        complaintsList.innerHTML = complaints.slice().reverse().map((item, index) => `
            <div class="request-item" data-type="complaint" data-index="${index}">
                <h3>${item.title || "Student Complaint"}</h3>
                <p><strong>Student:</strong> ${item.studentName || "S. Bhuvana Kruthi"}</p>
                <p><strong>Class:</strong> ${item.branch || "CSE"} - ${item.section || "A"}</p>
            </div>
        `).join("");
    }

    if (!requests.length) {
        requestsList.innerHTML = `<p style="color:#7e8799;">No requests received yet.</p>`;
    } else {
        requestsList.innerHTML = requests.slice().reverse().map((item, index) => `
            <div class="request-item" data-type="request" data-index="${index}">
                <h3>${item.reason || "Leave Request"}</h3>
                <p><strong>Student:</strong> ${item.studentName || "S. Bhuvana Kruthi"}</p>
                <p><strong>Class:</strong> ${item.branch || "CSE"} - ${item.section || "A"}</p>
                <p><strong>Date:</strong> ${item.date || "-"}</p>
            </div>
        `).join("");
    }

    document.querySelectorAll(".request-item").forEach(item => {
        item.addEventListener("click", () => {
            const type = item.dataset.type;
            const index = Number(item.dataset.index);

            if (type === "complaint") {
                const complaintData = complaints.slice().reverse()[index];
                detailView.innerHTML = `
                    <p><strong>Type:</strong> Complaint</p>
                    <p><strong>Student:</strong> ${complaintData.studentName || "S. Bhuvana Kruthi"}</p>
                    <p><strong>Class:</strong> ${complaintData.branch || "CSE"} - ${complaintData.section || "A"}</p>
                    <p><strong>Title:</strong> ${complaintData.title}</p>
                    <p><strong>Description:</strong> ${complaintData.description}</p>
                    <p><strong>Submitted At:</strong> ${complaintData.submittedAt}</p>
                `;
            } else {
                const requestData = requests.slice().reverse()[index];
                detailView.innerHTML = `
                    <p><strong>Type:</strong> Leave Request</p>
                    <p><strong>Student:</strong> ${requestData.studentName || "S. Bhuvana Kruthi"}</p>
                    <p><strong>Class:</strong> ${requestData.branch || "CSE"} - ${requestData.section || "A"}</p>
                    <p><strong>Reason:</strong> ${requestData.reason}</p>
                    <p><strong>Date:</strong> ${requestData.date}</p>
                    <p><strong>Submitted At:</strong> ${requestData.submittedAt}</p>
                `;
            }
        });
    });
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
renderComplaintsAndRequests();