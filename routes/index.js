const router = require("express").Router();
const csvRoute = require("./csv");
const usersRoute = require("./users");

router.use("/csv", csvRoute);
router.use("/users", usersRoute);

module.exports = router;
