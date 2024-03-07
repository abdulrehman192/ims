const { createUserAccount, updatePassword, updateUserAccount, userLogin, getUserById, requestResetPassword } = require("./users.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");

// Middleware to conditionally use multer based on imageUrl presence
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
        const fs = require('fs');
        const filePath = 'public/files/' + originalName;
        fs.writeFileSync(filePath, buffer);
      });
      next();
      
  } else {
    // No imageUrl provided, proceed to the next middleware or route handler
    next();
  }
};


router.post("/create-user-account", uploadIfImageUrl, createUserAccount);
router.patch("/update-user-account", checkToken, uploadIfImageUrl, updateUserAccount);
router.post("/userLogin", userLogin);
router.post("/update-password", updatePassword);
router.post("/get-user-by-id", checkToken, getUserById);
router.post("/send-reset-password-email", requestResetPassword);

module.exports = router;
