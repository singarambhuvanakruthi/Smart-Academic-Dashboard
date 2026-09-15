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
const understoodPercent = document.getElementById("understoodPercent");
const confusedPercent = document.getElementById("confusedPercent");
const tooFastPercent = document.getElementById("tooFastPercent");
const understoodBar = document.getElementById("understoodBar");
const confusedBar = document.getElementById("confusedBar");
const tooFastBar = document.getElementById("tooFastBar");
const doubtsList = document.getElementById("doubtsList");
const searchInput = document.getElementById("searchInput");
const logoutBtn = document.getElementById("logoutBtn");
const subjectTag = document.getElementById("subjectTag");

function fillTeacherData() {
    sidebarUserName.textContent = currentTeacher.name;
    sidebarUserRole.textContent = currentTeacher.role;
    sidebarUserDept.textContent = `${currentTeacher.department} | ${currentTeacher.subject} Faculty`;
    topUserName.textContent = currentTeacher.shortName;
    subjectTag.textContent = `${currentTeacher.subject.toUpperCase()} FEEDBACK`;
}

function renderFeedbackSummary() {
    const allFeedback = JSON.parse(localStorage.getItem("studentFeedback")) || [];

    const feedbackData = allFeedback.filter(
        item => item.subject === currentTeacher.subject
    );

    notifCount.textContent = feedbackData.length;

    if (!feedbackData.length) {
        understoodPercent.textContent = "0%";
        confusedPercent.textContent = "0%";
        tooFastPercent.textContent = "0%";
        understoodBar.style.width = "0%";
        confusedBar.style.width = "0%";
        tooFastBar.style.width = "0%";
        doubtsList.innerHTML = `<p style="color:#7e8799;">No feedback submitted for ${currentTeacher.subject} yet.</p>`;
        return;
    }

    const understood = feedbackData.filter(item => item.feedback === "Understood").length;
    const confused = feedbackData.filter(item => item.feedback === "Confused").length;
    const tooFast = feedbackData.filter(item => item.feedback === "Too Fast").length;
    const total = feedbackData.length;

    const understoodP = Math.round((understood / total) * 100);
    const confusedP = Math.round((confused / total) * 100);
    const tooFastP = Math.round((tooFast / total) * 100);

    understoodPercent.textContent = `${understoodP}%`;
    confusedPercent.textContent = `${confusedP}%`;
    tooFastPercent.textContent = `${tooFastP}%`;

    understoodBar.style.width = `${understoodP}%`;
    confusedBar.style.width = `${confusedP}%`;
    tooFastBar.style.width = `${tooFastP}%`;

    const doubts = feedbackData.filter(item => item.doubt && item.doubt.trim() !== "");

    if (!doubts.length) {
        doubtsList.innerHTML = `<p style="color:#7e8799;">No doubts submitted for ${currentTeacher.subject}.</p>`;
        return;
    }

    doubtsList.innerHTML = doubts.slice().reverse().map(item => `
        <div class="doubt-card">
            <p>"${item.doubt}"</p>
            <div class="doubt-footer">
                <span>${item.subject}</span>
                <span>${item.submittedAt}</span>
            </div>
        </div>
    `).join("");
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
renderFeedbackSummary();