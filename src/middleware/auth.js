const userAuth = (req, res, next) => {
  const token = "user";

  const isAuthorized = token === "user";

  if (!isAuthorized) {
    return res.send("User not authorized");
  } else {
    console.log("Hello");
    next();
  }
};

module.exports = { userAuth };
