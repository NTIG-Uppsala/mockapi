const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

//app.use(express.json());
app.use(cors());

// --------------------
// Mock Data
// --------------------
let students = [
  { id: 1, name: "Alice", email: "alice@example.com", birthdate: "2010-01-01" },
  { id: 2, name: "Bob", email: "bob@example.com", birthdate: "2001-03-12" },
  { id: 3, name: "Steve", email: "steve@example.com", birthdate: "2010-11-25" },
  { id: 4, name: "Erik", email: "erik@example.com", birthdate: "2002-08-12" },
  { id: 5, name: "Dan", email: "daniil@example.com", birthdate: "2002-10-15" },
];

let courses = [
  { id: 1, name: "Webbserverprogrammering" },
  { id: 2, name: "Webbuteckling 2" },
  { id: 3, name: "Svenska" },
];

let enrollments = [
  { studentId: 1, courseId: 2 },
  { studentId: 2, courseId: 1 },
  { studentId: 2, courseId: 2 },
  { studentId: 2, courseId: 3 },
  { studentId: 3, courseId: 2 },
  { studentId: 3, courseId: 3 },
  { studentId: 4, courseId: 1 },
  { studentId: 4, courseId: 3 },
];

// --------------------
// Utility: Delay wrapper
// --------------------
const withDelay = (ms, handler) => {
  return (req, res) => {
    setTimeout(() => handler(req, res), ms);
  };
};

// --------------------
// Helper: Generate routes for delay variants
// --------------------
function createRoutes(basePath, handler) {
  app.get(`${basePath}/500`, withDelay(500, handler));
  app.get(`${basePath}/1000`, withDelay(1000, handler));
  app.get(`${basePath}/2000`, withDelay(2000, handler));
}

// --------------------
// Endpoints
// --------------------
createRoutes("/students", students);
createRoutes("/courses", courses);
createRoutes("/enrollments", enrollments);

// --------------------
// Server
// --------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
