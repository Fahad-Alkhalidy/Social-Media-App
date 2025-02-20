const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);

//Protect all routes after this middleware (only authorized people will have access)
router.use(authController.protect);

router
  .route("/:id")
  .patch(
    userController.uploadUserPersonalPhoto,
    userController.resizeUserPersonalPhoto,
    userController.updateMe
  );
//Restericted to admins:
//router.use(authController.restrictTo("admin"))

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
