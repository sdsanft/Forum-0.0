const express = require('express')
const router = express.Router();

router.use("/", require("./userRoutes"))
router.use("/", require("./boardRoutes"))

module.exports = router;