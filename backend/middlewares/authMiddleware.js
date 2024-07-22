import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js';

const authorizeUser = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt

    if (!token) return res.status(401).json({ success: false, message: 'Not authorized, Token not found!' })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findById(decoded.userId).select('-password')
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token!' })
    }
})

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next()
    }
    res.status(500).json({ message: "Authorization denied, you are not Admin" })
}

export { authorizeUser, authorizeAdmin }