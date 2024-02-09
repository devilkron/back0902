const db = require("../models/db");

exports.getByUser = async (req, res, next) => {
  console.log(req.user.user_id);
  try {
    const todos = await db.todo.findMany({
      where: {
        user_id: req.user.user_id,
      },
    });
    res.json({ todos });
  } catch (err) {
    next(err);
  }
};
exports.createByUser = async (req, res, next) => {
  //validate req.body

  const data = req.body;

  try {
    const rs = await db.todo.create({
      data: { ...data, user_id: req.user.user_id },
    });
    res.json({ message: "Create OK", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.updateByUser = async (req, res, next) => {
  //validate req.params
  const { id } = req.params;
  const data = req.body;
  try {
    const rs = await db.todo.update({
      data: { ...data },
      where: { todo_id: +id, user_id: req.user.user_id },
    });
    res.json({ message: "UPDATE", result: rs });
  } catch (err) {
    next(err);
  }
};
exports.deleteByUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rs = await db.todo.delete({
        where : {todo_id : +id, user_id: req.user.user_id},
    });
    res.json( {message: "DELETE OK", result : rs})
  } catch (err) {
    next(err);
  }
};
