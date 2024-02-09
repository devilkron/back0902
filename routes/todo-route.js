const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const todoController = require("../controllers/todo-controller");

router.get("/", authenticate, todoController.getByUser);
router.post("/", authenticate, todoController.createByUser);
router.put("/:id", authenticate, todoController.updateByUser);
router.delete("/:id", authenticate, todoController.deleteByUser);


module.exports = router;
