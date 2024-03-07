const { createOffice, updateOffice, deleteOffice, getAllOffices, getOfficeById } = require("./offices.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");
const fs = require('fs');


router.post("/create-company-office" ,checkToken, createOffice);
router.patch("/update-company-office" , checkToken, updateOffice);
router.delete("/delete-company-office" , checkToken, deleteOffice);
router.post("/get-office-by-id", checkToken, getOfficeById);
router.post("/get-all-company-offices", checkToken, getAllOffices);

module.exports = router;