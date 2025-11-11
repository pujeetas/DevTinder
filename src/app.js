const express = require("express");

const app = express();

app.get("/test/:userId", (req, res) => {
  const userId = req.params.userId;
  if (userId === "1000") {
    res.send(`Hello user ${userId}`);
  } else res.send("User not found");
});

app.post("/test", (req, res) => {
  res.send("This is a post call");
});

app.listen(3000, () => {
  console.log("Hello 3000");
});
