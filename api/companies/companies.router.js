const { createCompany, updateCompany, deleteCompany, getAllCompanies, getCompanyById } = require("./companies.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfLogoUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};


router.post("/create-company" ,uploadIfLogoUrl, createCompany);
router.patch("/update-company" , checkToken, uploadIfLogoUrl, updateCompany);
router.delete("/delete-company" , checkToken, deleteCompany);
router.post("/get-company-by-id" , checkToken, getCompanyById);
router.post("/get-all-companies" , checkToken, getAllCompanies);

module.exports = router;