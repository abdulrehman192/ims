const { createEmployeeAccount, updateProfilePhoto, updateCurrentSalary, getEmployeePayrollHistory, getEmployeeJobHistory, updateCurrentJob, getJobTitles, updateEmployeeAccount, getCurrencies, getEmployeeSalaryHistory, getVisaTypes, deleteEmployeeAccount, getEmployeeById, getAllEmployees, getUserRoles, getEmployeeJobInfo } = require("./employees.controller");
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

          if (req.query[file.fieldname]) {
              remoteFilePath = req.query[file.fieldname];
          }
          
          console.log(remoteFilePath);
          req[file.fieldname] = remoteFilePath;
        
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

router.post("/create-employee",checkToken, uploadIfImageUrl, createEmployeeAccount);
router.patch("/update-employee", checkToken, uploadIfImageUrl, updateEmployeeAccount);
router.patch("/update-employee-profile-photo", checkToken, uploadIfImageUrl, updateProfilePhoto);
router.delete("/delete-employee", checkToken, deleteEmployeeAccount);
router.post("/get-employee-by-id", checkToken, getEmployeeById);
router.post("/get-all-employees", checkToken, getAllEmployees);
router.post("/get-user-roles", checkToken, getUserRoles);
router.post("/get-salary-history", checkToken, getEmployeeSalaryHistory);
router.post("/get-job-history", checkToken, getEmployeeJobHistory);
router.post("/get-payroll-history", checkToken, getEmployeePayrollHistory);
router.post("/get-visa-types", checkToken, getVisaTypes);
router.post("/get-currencies", checkToken, getCurrencies);
router.post("/get-job-titles", checkToken, getJobTitles);
router.post("/update-current-salary", checkToken, updateCurrentSalary);
router.post("/update-current-job", checkToken, updateCurrentJob);
router.post("/get-employee-job-info", checkToken, getEmployeeJobInfo);

module.exports = router;
