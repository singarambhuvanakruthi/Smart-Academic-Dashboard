require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection (reads credentials from environment with sensible defaults)
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root123",
    database: process.env.DB_NAME || "smart_academic"
});

db.connect(err => {
    if (err) {
        console.log("❌ DB Connection Failed:", err);
    } else {
        console.log("✅ Connected to MySQL");
    }
});


// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});


// =======================
// LOGIN API ✅ NEW
// =======================
app.post("/login", (req, res) => {
    const { username, password, role } = req.body;

    const sql = `
        SELECT * FROM users
        WHERE LOWER(username) = ? AND password = ? AND role = ?
    `;

    db.query(sql, [username.toLowerCase(), password, role], (err, result) => {
        if (err) {
            console.log("❌ Login error:", err);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid username, password, or role"
            });
        }

        const user = result[0];

        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                full_name: user.full_name,
                subject: user.subject,
                section: user.section,
                department: user.department
            }
        });
    });
});


// =======================
// GET ASSIGNMENTS
// =======================
app.get("/assignments", (req, res) => {
    const sql = "SELECT * FROM assignments ORDER BY id DESC";

    db.query(sql, (err, result) => {
        if (err) {
            console.log("❌ Error fetching assignments:", err);
            res.status(500).send("Failed to fetch assignments");
        } else {
            res.json(result);
        }
    });
});


// =======================
// ADD ASSIGNMENT
// =======================
app.post("/add-assignment", (req, res) => {
    const { title, subject, dueDate, faculty } = req.body;

    const sql = `
        INSERT INTO assignments (title, subject, dueDate, faculty)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [title, subject, dueDate, faculty], (err, result) => {
        if (err) {
            console.log("❌ Error inserting assignment:", err);
            res.status(500).send("Failed to add assignment");
        } else {
            res.send("Assignment added successfully");
        }
    });
});


// =======================
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});