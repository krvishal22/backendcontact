var express = require('express')
var router = express.Router()
const { check } = require('express-validator');
const { createContact, getUserById, updateContact, getUser, getAllUsers, removeContact} = require("../controllers/user");

// params
router.param("userId", getUserById )

// get user
router.get("/user/:userId", getUser);

// get all user
router.get("/users", getAllUsers);

// create contact
router.post("/create/contact", [
    check('name').isLength({min:3}).withMessage("atleast 3 character"),
    check('email').isEmail().withMessage("email is required"),
    check('phone').isLength({min:10, max: 10}).withMessage("Enter valid number")
], createContact);

// update contact
router.put("/update/contact/:userId", updateContact);

// delete contact
router.delete("/remove/contact/:userId", removeContact);

module.exports = router;