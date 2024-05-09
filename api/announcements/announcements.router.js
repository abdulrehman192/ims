const { createAnnouncement, updateAnnouncement, deleteAnnouncement, getAllAnnouncements } = require("./announcements.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};


router.post("/create-announcement" ,checkToken, uploadIfImageUrl, createAnnouncement);
router.patch("/update-announcement" , checkToken, uploadIfImageUrl, updateAnnouncement);
router.delete("/delete-announcement" , checkToken, deleteAnnouncement);
router.post("/get-all-announcements", checkToken, getAllAnnouncements);

module.exports = router;