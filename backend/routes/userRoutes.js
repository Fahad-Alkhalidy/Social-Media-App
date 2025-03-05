const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);

//Protect all routes after this middleware (only authorized people will have access)
router.use(authController.protect);

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .patch(
    userController.uploadUserPersonalPhoto,
    userController.resizeUserPersonalPhoto,
    userController.updateMe
  );

router
  .route("/addAsFriend/:id")
  .patch(userController.addAsFriend, userController.addAsFriendForReqSender);

//Restericted to admins:
//router.use(authController.restrictTo("admin"))

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/getAllFriends/:id").get(userController.getAllFriends);
module.exports = router;
