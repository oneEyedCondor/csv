const User = require("../models/user");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-_id");
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};
