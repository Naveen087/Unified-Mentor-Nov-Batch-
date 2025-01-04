const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "gram-panchayat-secret",
    resave: false,
    saveUninitialized: false,
  })
);

const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database");
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT,
    name TEXT,
    email TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    requirements TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    service_id INTEGER,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(service_id) REFERENCES services(id)
  )`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (!user) return res.status(401).json({ error: "User not found" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(401).json({ error: "Invalid password" });

      req.session.user = { id: user.id, role: user.role };
      res.json({ role: user.role });
    }
  );
});

app.get("/api/services", (req, res) => {
  db.all("SELECT * FROM services", [], (err, services) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(services);
  });
});

app.post("/api/services", (req, res) => {
  if (req.session.user?.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { name, description, requirements } = req.body;
  db.run(
    "INSERT INTO services (name, description, requirements) VALUES (?, ?, ?)",
    [name, description, requirements],
    function (err) {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ id: this.lastID });
    }
  );
});

app.post("/api/applications", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { service_id } = req.body;
  db.run(
    "INSERT INTO applications (user_id, service_id) VALUES (?, ?)",
    [req.session.user.id, service_id],
    function (err) {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ id: this.lastID });
    }
  );
});

app.get("/api/applications/status/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  db.get(
    "SELECT * FROM applications WHERE id = ? AND user_id = ?",
    [req.params.id, req.session.user.id],
    (err, application) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (!application)
        return res.status(404).json({ error: "Application not found" });
      res.json(application);
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
