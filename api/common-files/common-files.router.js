const { createFile, updateFile, deleteFile, getAllFiles } = require("./common-files.controller");

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
          // Create a read stream from the file buffer
          const fileStream = require('stream').Readable.from(file.buffer);
          
        //   // Pipe the read stream directly to the FTP upload stream
        //   ftpUploader.uploadFile(fileStream, remoteFilePath, (err) => {
        //       if (err) {
        //           console.error('Error uploading file:', err);
        //           next();
        //       }
        //   });
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


router.post("/create-file" ,checkToken, uploadIfImageUrl, createFile);
router.patch("/update-file" , checkToken, uploadIfImageUrl, updateFile);
router.delete("/delete-file" , checkToken, deleteFile);
router.post("/get-all-files", checkToken, getAllFiles);

module.exports = router;