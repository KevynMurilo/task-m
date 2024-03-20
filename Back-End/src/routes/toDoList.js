const { Router } = require('express');
const ToDoListController = require('../controllers/ToDoListController.js');

const toDoListController = new ToDoListController();

const router = Router();

router.get("/tasks", (req, res) => toDoListController.getAll(req, res));
router.get("/tasks/:id", (req, res) => toDoListController.getById(req, res));
router.post("/tasks", (req, res) => toDoListController.createTask(req, res));
router.put("/tasks/:id", (req, res) => toDoListController.updateTask(req, res));
router.delete("/tasks/:id", (req, res) => toDoListController.destroy(req, res));

module.exports = router;