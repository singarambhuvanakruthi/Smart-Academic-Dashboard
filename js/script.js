let role = "student";

const studentBtn = document.getElementById("studentBtn");
const teacherBtn = document.getElementById("teacherBtn");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const inputs = document.querySelectorAll("input");
// Clear inputs
function clearInputs() {
    inputs.forEach(input => input.value = "");
}

// Apply UI based on role
function applyRoleUI() {
    if (role === "student") {
        studentBtn.classList.add("active", "student-active");
        teacherBtn.classList.remove("active", "teacher-active");

        loginBtn.textContent = "Login as Student →";
        loginBtn.classList.remove("teacher-btn");
        loginBtn.classList.add("student-btn");
    } else {
        teacherBtn.classList.add("active", "teacher-active");
        studentBtn.classList.remove("active", "student-active");

        loginBtn.textContent = "Login as Teacher →";
        loginBtn.classList.remove("student-btn");
        loginBtn.classList.add("teacher-btn");
    }
}

// Student click
studentBtn.onclick = () => {
    role = "student";
    applyRoleUI();
    clearInputs();
};

// Teacher click
teacherBtn.onclick = () => {
    role = "teacher";
    applyRoleUI();
    clearInputs();
};

// Login click
loginBtn.onclick = async () => {
    const username = usernameInput.value.trim().toLowerCase(); // important
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
        alert("Please enter username and password.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                role: role
            })
        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message);
            return;
        }

        // ✅ Save logged-in user
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));

        // ✅ Redirect based on role
        if (data.user.role === "student") {
            window.location.href = "student-dashboard.html";
        } else {
            window.location.href = "teacher-dashboard.html";
        }

    } catch (error) {
        console.error("Login error:", error);
        alert("Server not reachable. Make sure backend is running.");
    }
};

// Default UI on load
window.onload = () => {
    applyRoleUI();
};