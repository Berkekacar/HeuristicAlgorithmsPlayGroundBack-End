const express = require("express")
const controller = require("../../controller/controller")

const router=express.Router()

router.post("/register",controller.register)
router.post("/verify",controller.verify)

module.exports=router