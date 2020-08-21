const router = require("express").Router();
const multer = require("multer");
const { downloadCSV, uploadCSV } = require("../controllers/csv");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", downloadCSV);
router.post("/", upload.single("users"), uploadCSV);

module.exports = router;
