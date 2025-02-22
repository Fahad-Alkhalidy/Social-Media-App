const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const userRoutes = require("./routes/userRoutes");
const blockRoutes = require("./routes/blockRoutes");
const commentRoutes = require("./routes/commentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const friendReqRoutes = require("./routes/friendRequestRoutes");
const groupMemberRoutes = require("./routes/groupMemberRoutes");
const groupRoutes = require("./routes/groupRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const pageFollowerRoutes = require("./routes/pageFollowersRoutes");
const pageRoutes = require("./routes/pageRoutes");
const postRoutes = require("./routes/postRoutes");
const replyRoutes = require("./routes/replyRoutes");
const reportRoutes = require("./routes/reportRoutes");
const savedPostRoutes = require("./routes/savedPostRoutes");
const storyRoutes = require("./routes/storyRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//const connectBusboy = require("connect-busboy");
const app = express();
app.use(cookieParser());
//app.use(bodyParser.json());
//app.use(cors("*"));
//app.use(connectBusboy());
//Middlewares:
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blocks", blockRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/friendReqs", friendReqRoutes);
app.use("/api/v1/groupMembers", groupMemberRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/notifcations", notificationRoutes);
app.use("/api/v1/pageFollowers", pageFollowerRoutes);
app.use("/api/v1/pages", pageRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/replies", replyRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/savedPosts", savedPostRoutes);
app.use("/api/v1/stories", storyRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});
module.exports = app;
