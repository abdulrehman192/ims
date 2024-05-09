const { createDepartment, updateDepartment, deleteDepartment, getOfficeDepartments, getDepartmentById, getAllDepartments } = require("./departments.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");



router.post("/create-office-department" , checkToken, createDepartment);
router.patch("/update-office-department" , checkToken, updateDepartment);
router.delete("/delete-office-department", checkToken, deleteDepartment);
router.post("/get-department-by-id", checkToken, getDepartmentById);
router.post("/get-office-departments", checkToken, getOfficeDepartments);
router.post("/get-all-departments", checkToken, getAllDepartments);

module.exports = router;