const User=require('../modules/user');
const router = require('express').Router();
const jwt=require('jsonwebtoken');
const {getUser,getUserById,updateUser,userPurchaseList}=require("../controllers/user");
const {isAuthenticated,isSignedIn,isAdmin}=require("../controllers/auth");

router.param("userId", getUserById);

router.get('/user/:userId',isSignedIn,isAuthenticated,getUser);
router.put('/user/:userId',isSignedIn,isAuthenticated,updateUser);
router.get('/order/user/:userId',isSignedIn,isAuthenticated,userPurchaseList);

module.exports=router

