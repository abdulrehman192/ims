const { createEmployeeAccount, updateProfilePhoto, getEmployeeAttendance, getAllAttendance, markAttendance, createLeaveRequest, updateLeaveRequest, deleteLeaveRequest, getPaymentMethods, getLeaveRequests, updateOffBoardRecord, getEmployeeOffBoardInfo, getEmployeeProbationInfo, updateProbationRecord, createCurrency, createBenifit, updateJobTitle, updateBenifit, deleteBenifit, getEmployeeBenifits, createDocument, updateDocument, deleteDocument, getEmployeeDocuments, createDependent, updateDependent, deleteDependent, getEmployeeDependents, getEmployeeEmergencyContacts, createEmergencyContact, updateEmergencyContact, deleteEmergencyContact, getEmployeeBankInfo, updateBankInfo, createPayroll, updatePayroll, deletePayroll, updateCurrentSalary, getEmployeePayrollHistory, getEmployeeJobHistory, updateCurrentJob, getJobTitles, updateEmployeeAccount, getCurrencies, getEmployeeSalaryHistory, getVisaTypes, deleteEmployeeAccount, getEmployeeById, getAllEmployees, getUserRoles, getEmployeeJobInfo } = require("./employees.controller");
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
router.post("/create-payroll",checkToken, uploadIfImageUrl, createPayroll);
router.post("/create-leave-request",checkToken, uploadIfImageUrl, createLeaveRequest);
router.post("/update-probation",checkToken, uploadIfImageUrl, updateProbationRecord);
router.post("/update-off-board",checkToken, updateOffBoardRecord);
router.post("/create-document",checkToken, uploadIfImageUrl, createDocument);
router.post("/create-emergency-contact",checkToken, createEmergencyContact);
router.post("/create-dependent",checkToken, createDependent);
router.post("/mark-attendance",checkToken, markAttendance);
router.post("/create-benefit",checkToken, createBenifit);
router.post("/create-currency",checkToken, createCurrency);
router.patch("/update-employee", checkToken, uploadIfImageUrl, updateEmployeeAccount);
router.patch("/update-document",checkToken, uploadIfImageUrl, updateDocument);
router.patch("/update-payroll", checkToken, uploadIfImageUrl, updatePayroll);
router.patch("/update-leave-request", checkToken, uploadIfImageUrl, updateLeaveRequest);
router.patch("/update-emergency-contact", checkToken, updateEmergencyContact);
router.patch("/update-dependent", checkToken, updateDependent);
router.patch("/update-benefit", checkToken, updateBenifit);
router.patch("/update-employee-profile-photo", checkToken, uploadIfImageUrl, updateProfilePhoto);
router.delete("/delete-employee", checkToken, deleteEmployeeAccount);
router.delete("/delete-payroll", checkToken, deletePayroll);
router.delete("/delete-leave-request", checkToken, deleteLeaveRequest);
router.delete("/delete-document", checkToken, deleteDocument);
router.delete("/delete-emergency-contact", checkToken, deleteEmergencyContact);
router.delete("/delete-dependent", checkToken, deleteDependent);
router.delete("/delete-benefit", checkToken, deleteBenifit);
router.post("/get-employee-by-id", checkToken, getEmployeeById);
router.post("/get-all-employees", checkToken, getAllEmployees);
router.post("/get-all-attendance", checkToken, getAllAttendance);
router.post("/get-employee-attendance", checkToken, getEmployeeAttendance);
router.post("/get-user-roles", checkToken, getUserRoles);
router.post("/get-salary-history", checkToken, getEmployeeSalaryHistory);
router.post("/get-leave-requests", checkToken, getLeaveRequests);
router.post("/get-emergency-contacts", checkToken, getEmployeeEmergencyContacts);
router.post("/get-dependents", checkToken, getEmployeeDependents);
router.post("/get-benefits", checkToken, getEmployeeBenifits);
router.post("/get-bank-info", checkToken, getEmployeeBankInfo);
router.post("/get-probation-info", checkToken, getEmployeeProbationInfo);
router.post("/get-off-board-info", checkToken, getEmployeeOffBoardInfo);
router.post("/get-job-history", checkToken, getEmployeeJobHistory);
router.post("/get-payroll-history", checkToken, getEmployeePayrollHistory);
router.post("/get-documents", checkToken, getEmployeeDocuments);
router.post("/get-visa-types", checkToken, getVisaTypes);
router.post("/get-currencies", checkToken, getCurrencies);
router.post("/get-payment-methods", checkToken, getPaymentMethods);
router.post("/get-job-titles", checkToken, getJobTitles);
router.post("/update-current-salary", checkToken, updateCurrentSalary);
router.post("/update-bank-info", checkToken, updateBankInfo);
router.post("/update-job-title", checkToken, updateJobTitle);
router.post("/update-current-job", checkToken, updateCurrentJob);
router.post("/get-employee-job-info", checkToken, getEmployeeJobInfo);

module.exports = router;
