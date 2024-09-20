import express from "express";
import { authorizeAdmin, authorizeUser } from "../middlewares/authMiddleware.js";
import { calculateTotalSales, calculateTotalSalesByDate, countTotalOrders, createOrder, findOrderById, getAllOrders, getUserOrders, markOrderAsDelivered, markOrderAsPaid } from '../controllers/orderController.js'
const router = express.Router()

router.route('/')
    .post(authorizeUser, createOrder)
    .get(authorizeUser, authorizeAdmin, getAllOrders)

router.route('/mine')
    .get(authorizeUser, getUserOrders)

router.route('/total-orders')
    .get(countTotalOrders)

router.route('/total-sales')
    .get(calculateTotalSales)

router.route('/total-sales-by-date')
    .get(calculateTotalSalesByDate)

router.route('/:id')
    .get(authorizeUser, findOrderById)

router.route('/:id/pay')
    .put(authorizeUser, markOrderAsPaid)

router.route('/:id/deliver')
    .put(authorizeUser, authorizeAdmin, markOrderAsDelivered)

export default router;