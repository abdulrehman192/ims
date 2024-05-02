const { createUserAccount, updatePassword, updateUserAccount, userLogin, getUserById, requestResetPassword, getUsers } = require("./users.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");


const FTPUploaderSSH = require('../file-uploader-ssh');

const sftpUploader = new FTPUploaderSSH();

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
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

router.post("/create-user-account", uploadIfImageUrl, createUserAccount);
router.patch("/update-user-account", checkToken, uploadIfImageUrl, updateUserAccount);
router.post("/userLogin", userLogin);
router.post("/update-password", updatePassword);
router.post("/get-user-by-id", checkToken, getUserById);
router.post("/get-users", checkToken, getUsers);
router.post("/send-reset-password-email", requestResetPassword);

module.exports = router;
