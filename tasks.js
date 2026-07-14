const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET - Get all tasks
router.get("/", (req, res) => {
    db.query("SELECT * FROM tasks", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

// POST - Add new task
router.post("/", (req, res) => {

    console.log(req.body); // Debug

    const { task } = req.body;

    if (!task) {
        return res.status(400).json({
            message: "Task is required"
        });
    }

    db.query(
        "INSERT INTO tasks(task) VALUES(?)",
        [task],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Task Added Successfully"
            });

        }
    );

});

// PUT - Update task
router.put("/:id", (req, res) => {

    const { task, status } = req.body;

    db.query(
        "UPDATE tasks SET task=?, status=? WHERE id=?",
        [task, status, req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Task Updated Successfully"
            });

        }
    );

});

// DELETE - Delete task
router.delete("/:id", (req, res) => {

    db.query(
        "DELETE FROM tasks WHERE id=?",
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Task Deleted Successfully"
            });

        }
    );

});

module.exports = router;