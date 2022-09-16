const express = require('express');
const router = express.Router();
const controller = require("../controllers/postsController");
const verifyToken = require('..//middlewares/verifyToken');

router.get('/posts', verifyToken, controller.findAllPosts);
router.post('/posts', verifyToken, controller.createPosts);
router.delete('/posts/:id', verifyToken, controller.deletePosts);

module.exports = router;