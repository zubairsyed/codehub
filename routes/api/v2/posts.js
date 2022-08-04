const express = require('express');
const router = express.Router();

const postApiV2 = require("../../../controllers/api/v2/post_api");

router.get('/',postApiV2.index);

module.exports = router;