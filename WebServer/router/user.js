const express = require("express");
const { isSignedIn, isAuthenticated } = require("./middleware");
const {
  getUserFromParam,
  getUserById,
  updateUser,
  userPurchaseList,
} = require("../controller/user");

const router = express.Router();

// resolves URL params
router.param("userId", getUserFromParam);

// user routes
router.get("/:userId", isSignedIn, isAuthenticated, getUserById);
router.put("/update/:userId", isSignedIn, isAuthenticated, updateUser);
router.put(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
