const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/tasks", require("./routes/tasks"));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});