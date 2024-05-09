const { createFile, updateFile, deleteFile, getAllFiles } = require("./common-files.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};

router.post("/create-file" ,checkToken, uploadIfImageUrl, createFile);
router.patch("/update-file" , checkToken, uploadIfImageUrl, updateFile);
router.delete("/delete-file" , checkToken, deleteFile);
router.post("/get-all-files", checkToken, getAllFiles);

module.exports = router;