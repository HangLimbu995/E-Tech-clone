import express from 'express'
import {
    createUser,
    getUsers,
    userLogin,
    logoutCurrentUser,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    getUserById,
    updateUserById,
    deleteUserById,
} from '../controllers/userControllers.js'
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(createUser)
    .get(authorizeUser, authorizeAdmin, getUsers)

router.post('/auth', userLogin)
router.post('/logout', logoutCurrentUser)

router.route('/profile')
    .get(authorizeUser, getCurrentUserProfile)
    .put(authorizeUser, updateCurrentUserProfile)

router.route('/:id')
    .get(authorizeUser, authorizeAdmin, getUserById)
    .put(authorizeUser, authorizeAdmin, updateUserById)
    .delete(authorizeUser, authorizeAdmin, deleteUserById)

export default router