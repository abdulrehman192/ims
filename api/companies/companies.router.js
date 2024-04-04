const { createCompany, updateCompany, deleteCompany, getAllCompanies, getCompanyById } = require("./companies.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

const FTPUploaderSSH = require('../file-uploader-ssh');

const sftpUploader = new FTPUploaderSSH();

// Middleware to conditionally use multer based on imageUrl presence

const uploadIfLogoUrl = (req, res, next) => {
  if (req.files && req.files.length > 0) {
      const uploadedFiles = req.files;
      uploadedFiles.forEach(async(file) => {
          const originalName = file.originalname;
          let remoteFilePath = originalName;

          if (req.query.fileName) {
              remoteFilePath = req.query.fileName;
          }
        
          req.imageUrl = remoteFilePath;
          // Pipe the read stream directly to the SFTP upload stream
          await sftpUploader.uploadFile(file.buffer, remoteFilePath, (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                next();
            }
        });

      });
  }

  next();
};


router.post("/create-company" ,uploadIfLogoUrl, createCompany);
router.patch("/update-company" , checkToken, uploadIfLogoUrl, updateCompany);
router.delete("/delete-company" , checkToken, deleteCompany);
router.post("/get-company-by-id" , checkToken, getCompanyById);
router.post("/get-all-companies" , checkToken, getAllCompanies);

module.exports = router;