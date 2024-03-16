const { createCompany, updateCompany, deleteCompany, getAllCompanies, getCompanyById } = require("./companies.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");
const FTPUploader = require('../file-uploader');

// Instantiate FTPUploader
const ftpUploader = new FTPUploader();

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfLogoUrl = (req, res, next) => {
    if (req.files && req.files.length > 0) {
      const uploadedFiles = req.files; // This is an array of uploaded files
      uploadedFiles.forEach((file) => {
          // Access file information
          const fieldName = file.fieldname; // Fieldname of the input field
          console.log(req.query.fileName);
          const originalName = file.originalname; // Original name of the file
          const buffer = file.buffer; // Buffer containing the file data
          var remoteFilePath = `${originalName}`;
          if(req.query.fileName){
            remoteFilePath = `${req.query.fileName}`;
          }
          ftpUploader.uploadFile(buffer, remoteFilePath, (err) => {
            if (err) {
                console.error('Error uploading company logo file:', err);
                next();
            } else {
                next();
            }
        });  
        });
        next();
        
    } else {
      // No imageUrl provided, proceed to the next middleware or route handler
      next();
    }
  };
router.post("/create-company" , createCompany);
router.patch("/update-company" , checkToken, uploadIfLogoUrl, updateCompany);
router.delete("/delete-company" , checkToken, deleteCompany);
router.post("/get-company-by-id" , checkToken, getCompanyById);
router.post("/get-all-companies" , checkToken, getAllCompanies);

module.exports = router;