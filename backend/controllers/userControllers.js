import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/createToken.js";

const getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().sort({ _id: -1 });
    // if (!users) throw new Error('Users not found!')
    res.json(users)
})

const createUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username, !email, !password) throw new Error('Please fill all the fields?')

    const existingUser = await User.findOne({ email })
    if (existingUser) throw new Error('Email already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    if (!hashedPassword) throw new Error('bcrypt failed')

    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save()
        console.log('before token generate')
        generateToken(res, newUser._id)
        console.log('after token generate')
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        })

    } catch (error) {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const userLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Please fill all the fields?')

    const user = await User.findOne({ email })
    if (!user) throw new Error("User doesn't exist")

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) throw new Error('Invalid credentials')

    generateToken(res, user._id)
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    })
    return;
})

const logoutCurrentUser = asyncHandler(async (req, res, next) => {
    res.cookie('jwt', '', {
        htmlOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'Logged out successfully!' })
})

//  '/profile'
const getCurrentUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user) throw new Error('User not found')
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
    })
})

const updateCurrentUserProfile = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body

    const user = await User.findById(req.user._id)
    if (!user) throw new Error('User not found')

    user.username = username || user.username
    user.email = email || user.email

    if (password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword
    }

    const updatedUser = await user.save()
    res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    })
})

// all admin authorization work by id


// getUserbyid
const getUserById = asyncHandler(async (req, res, next) => {
    const users = await User.findById(req.params.id)
    if (!users) return res.status(404).json({ message: 'No users found!' })
    res.status(200).json(users)
})


// updateUserbyid
const updateUserById = asyncHandler(async (req, res, next) => {
    const { username, email, isAdmin } = req.body

    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'No users found!' })
    console.log('res update', req.body)

    user.username = username || user.username
    user.email = email || user.email
    user.isAdmin = isAdmin

    const updatedUser = await user.save()
    res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    })

})


// deleteUserbyid
const deleteUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'No users found!' })
    if (user.isAdmin) return res.status(404).json({ message: 'cannot delete an Admin' })
    await user.deleteOne({ _id: user._id })
    res.status(200).json({ message: 'User deleted successfully!' })
})



export {
    getUsers,
    createUser,
    userLogin,
    logoutCurrentUser,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    getUserById,
    updateUserById,
    deleteUserById,
}