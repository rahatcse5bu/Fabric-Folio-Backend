import express from "express";
const router = express.Router();
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
} from "../controllers/user.js";
import { protect, admin } from "../middleware/auth.js";

router.route("/").post(registerUser);
router.route("/users/all").get(getAllUsers);
router.route("/:id").put(updateUser).get(getUserById).delete(deleteUser);

router.post("/login", authUser);

// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile)
// router
//   .route('/:id')
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser)

export default router;
