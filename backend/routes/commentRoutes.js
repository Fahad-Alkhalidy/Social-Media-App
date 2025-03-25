const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");
const router = express.Router();
module.exports = router;
router.use(authController.protect);
router.route("/createNewComment").post(commentController.createComment);
router.route("/:id").get(commentController.getComments);
