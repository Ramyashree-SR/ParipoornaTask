const express=require('express')

const route=express.Router()

let FormController=require("../../controllers/FormDetails")

route.get("/getAllFormData",FormController.getAllFormData)
route.post("/addFormData",FormController.addFormData)
route.put("/editFormData/:_id",FormController.editFormData)
route.delete("/deleteFormData/:_id",FormController.deleteFormData)

module.exports=route