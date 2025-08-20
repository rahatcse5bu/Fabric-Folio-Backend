import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser
} from '../controllers/user.js'
import { protect, admin } from '../middleware/auth.js'

router.route('/').post(registerUser)//.get(protect, admin, getUsers)
router.post('/login', authUser)

// Product routes
router.route('/').post(registerUser)//.get(protect, admin, getUsers)
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile)
// router
//   .route('/:id')
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser)

export default router