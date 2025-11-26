const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());

// --------------------
// Mock Data
// --------------------
const students = JSON.parse(fs.readFileSync(path.join(__dirname, "data/students.json")));
const courses = JSON.parse(fs.readFileSync(path.join(__dirname, "data/courses.json")));
const enrollments = JSON.parse(fs.readFileSync(path.join(__dirname, "data/enrollments.json")));

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
function createRoutes(basePath, data) {
  app.get(`${basePath}`, withDelay(1, (req, res) => res.json(data)));
  app.get(`${basePath}/500`, withDelay(500, (req, res) => res.json(data)));
  app.get(`${basePath}/1000`, withDelay(1000, (req, res) => res.json(data)));
  app.get(`${basePath}/1500`, withDelay(1500, (req, res) => res.json(data)));
  app.get(`${basePath}/2000`, withDelay(2000, (req, res) => res.json(data)));
  app.get(`${basePath}/2500`, withDelay(2500, (req, res) => res.json(data)));
  app.get(`${basePath}/3000`, withDelay(3000, (req, res) => res.json(data)));
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