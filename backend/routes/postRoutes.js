const express = require("express");
const postController = require("../controllers/postController");
const { protect } = require("../controllers/authController");
const { getAll } = require("../controllers/handlerFactory");
const router = express.Router();
module.exports = router;
router.use(protect);
router
  .route("/createNewPost")
  .post(
    postController.uploadPostMedia,
    postController.resizePostMedia,
    postController.checkIfUserUploadedMedia,
    postController.createPost
  );
router.route("/FriendsPosts").get(postController.getFriendUsersPosts);
//for retreiving the post by its id
//router.route("/:id").get(postController.getPost);

//for retrieving all user posts by his id not the post id
router.route("/:id").get(postController.getAllUserPosts);

router.route("/").get(postController.getAllPosts);
