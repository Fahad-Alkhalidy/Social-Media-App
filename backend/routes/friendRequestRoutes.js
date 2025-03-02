const express = require("express");
const friendRequestController = require("../controllers/friendRequestController");
const authController = require("../controllers/authController");
const router = express.Router();
router.use(authController.protect);
router
  .route("/createAFriendRequest")
  .post(
    friendRequestController.checkIfAvailableReqExist,
    friendRequestController.createAFriendRequest
  );
//get Specific User Requests By receiver ID
router.route("/:id").get(friendRequestController.getAllRequests);
module.exports = router;
