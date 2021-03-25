const express = require('express')
const router = express.Router();

const {isAdmin,isAuthenticated,isSignedIn} = require('../controllers/auth')
const {getUserById, pushOrderInPurchaseList} = require('../controllers/user')
const {getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus} = require('../controllers/order')
const {updateStock} = require('../controllers/product')

//params or parameter extractor
router.param('userId', getUserById)
router.param('orderId', getOrderById)

//Actual routes
router.post('/order/create/:userId',isSignedIn,isAuthenticated,pushOrderInPurchaseList, updateStock, createOrder)

router.get('/order/all/:userId', isSignedIn, isAuthenticated, isAdmin, getAllOrders)

router.get('/order/status/:userId', isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put('/order/:orderId/status/:userId',isSignedIn, isAuthenticated, isAdmin, updateStatus)

module.exports = router
