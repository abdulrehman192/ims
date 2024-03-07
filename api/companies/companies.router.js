const { createCompany, updateCompany, deleteCompany, getAllCompanies, getCompanyById } = require("./companies.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");
const fs = require('fs');

const uploadIfImageUrl = (req, res, next) => {
    if (req.files && req.files.length > 0) {
      const uploadedFiles = req.files; // This is an array of uploaded files
      uploadedFiles.forEach((file) => {
          // Access file information
          const fieldName = file.fieldname; // Fieldname of the input field
          const originalName = file.originalname; // Original name of the file
          const buffer = file.buffer; // Buffer containing the file data
        
          // Save the file to a directory
          // Example using the fs module:
          
          const filePath = 'public/files/' + originalName;
          fs.writeFileSync(filePath, buffer);
        });
        next();
        
    } else {
      // No imageUrl provided, proceed to the next middleware or route handler
      next();
    }
  };
  


router.post("/create-company" , uploadIfImageUrl, createCompany);
router.patch("/update-company" , checkToken, uploadIfImageUrl, updateCompany);
router.delete("/delete-company" , checkToken, deleteCompany);
router.post("/get-company-by-id" , checkToken, getCompanyById);
router.post("/get-all-companies" , checkToken, getAllCompanies);

module.exports = router;