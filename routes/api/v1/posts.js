const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsApi = require("../../../controllers/api/v1/post_api");

router.get('/', postsApi.index);
// auhenticating the delete session and avoiding the create-session n setting it to false
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);

module.exports=router; 