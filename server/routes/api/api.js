const express=require("express")
const controller = require("../../controller/controller")
const SaAlgorithm = require("../../controller/saAlgorithm")
const GwoAlgorithm = require("../../controller/gwoAlgorithm")
const HarmonySearchAlogirthm = require("../../controller/harmonySearchAlgorithm")
const GaAlgorithm = require("../../controller/GaAlgorithm")

const router =express.Router()

router.post("/pickAlgorithm",controller.pickAlgorithm)
router.post("/SA",SaAlgorithm.SaAlgorithm)
router.post("/GWO",GwoAlgorithm.GwoAlgorithm)
router.post("/HS",HarmonySearchAlogirthm.HarmonySearchAlogirthm)
router.post("GA",GaAlgorithm.GaAlgorithm)

module.exports= router

