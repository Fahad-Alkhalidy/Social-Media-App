const mongoose = require("mongoose");
const dotenv = require("dotenv");
const WebSocket = require("ws");
const { server } = require("./socket/socket");
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASS
);

mongoose.connect(DB, {}).then(() => console.log("Connected To Database"));

const port = process.env.PORT || 3000;

// Start the Express server using app.listen
const theServer = server.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  theServer.close(() => {
    process.exit(1);
  });
});
