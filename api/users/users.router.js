const { createUserAccount, updatePassword, updateUserAccount, userLogin, getUserById, requestResetPassword, getUsers, updateUserRole } = require("./users.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");


const { uploadFile } = require("../file-uploader");

// Middleware to conditionally use multer based on imageUrl presence
const uploadIfImageUrl = (req, res, next) => {
  uploadFile(req, res, next); 
};

router.post("/create-user-account", uploadIfImageUrl, createUserAccount);
router.patch("/update-user-account", checkToken, uploadIfImageUrl, updateUserAccount);
router.patch("/update-role", checkToken, updateUserRole);
router.post("/userLogin", userLogin);
router.post("/update-password", updatePassword);
router.post("/get-user-by-id", checkToken, getUserById);
router.post("/get-users", checkToken, getUsers);
router.post("/send-reset-password-email", requestResetPassword);

module.exports = router;
