import express from "express";
import {
  addressController,
  deleteUsersController,
  forgotPasswordController,
  getAllOrdersController,
  getOrdersController,
  getUsersController,
  google,
  loginController,
  orderStatusController,
  registerController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

//registerRoute
router.post("/register", registerController);

router.post('/google', google);

//loginRoute
router.post("/login", loginController);

// getUsers
router.get("/get-users", getUsersController);

//delete Users
router.delete("/delete-user/:id", deleteUsersController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//Protected UserRoute
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//Protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// user orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

// order- address
router.post(
  "/order-address",
  requireSignIn,
  addressController
);

export default router;
