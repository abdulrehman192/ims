
const { request, response } = require("express");
const  {create, updateProfilePhoto,updateEmployee, updateBankInfo, getEmployeeProbationInfo, createCurrency, updateJobTitle, updateProbationRecord, createBenifit, updateBenifit, deleteBenifit, getEmployeeBenifits, createDocument, updateDocument, deleteDocument, getEmployeeDocuments, createDependent, updateDependent, deleteDependent, getEmployeeDependents, createEmergencyContact, updateEmergencyContact, deleteEmergencyContact, getEmployeeEmergencyContacts, getEmployeeBankInfo, getPaymentMethods,createPayroll, updatePayroll, deletePayroll, deleteEmployee, getEmployeePayrollHistory, getEmployeeJobHistory, updateCurrentJob, getJobTitles, updateCurrentSalary, getCurrencies, getEmployeeById, getEmployeeSalaryHistory, getAllEmployees, getUserRoles, getEmployeeJobInfo, getVisaTypes} = require("./employees.service");
const { sign } = require("jsonwebtoken");

function checkRequiredFields(body, fields) {
    for (const field of fields) {
        if (!body[field]) {
            return {
                success: false,
                message: `${field} is required to create employee account`
            };
        }
    }
    return null; // Indicates all required fields are present
}

module.exports = {
    createEmployeeAccount : (request, response) => 
    {
        const body = request.body;
        const requiredFields = [
            "firstName",
            "lastName",
            "dateOfBirth",
            "gender",
            "nationality",
            "maritalStatus",
            "email",
            "password",
            "mobile",
            "country",
            "city",
            "address",
            "status",
            "roleId",
            "officeId",
            "departmentId",
            "companyId"
        ];
        
        const missingField = checkRequiredFields(body, requiredFields);
        if (missingField) {
            return response.status(400).json(missingField);
        }
        
        create(request, (error, result)=> {
            if(error)
            {
                if(error.toString().includes("exists"))
                {
                    return response.status(409).json({
                        success : false,
                        message : error
                    });
                }
                else{
                    return response.status(500).json({
                        success : false,
                        message : error
                    });
                }
            }

            return response.status(200).json({
                success : true,
                message : "Employee Account Successfully Created",
                data : result
            });
        });
    },

    updateEmployeeAccount : (request, response) => {
        
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        updateEmployee(request, (error, results) => {
            if(error)
            {
                console.log(error);
                if(error.toString().includes("exists"))
                {
                    return response.status(404).json({
                        success : false,
                        message : error
                    });
                }
                else{
                    return response.status(500).json({
                        success : false,
                        message : error
                    });
                }
            }

            

            return response.status(200).json({
                success : true,
                message : "employee account successfully updated",
                data : results
            });
        });
    },

    updateProfilePhoto : (request, response) => {
        
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        if(request.files.length <= 0)
        {
            return response.status(400).json({
                success : false,
                message: "profile photo is required to update data"
            });
        }

        updateProfilePhoto(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            

            return response.status(200).json({
                success : true,
                message : "employee photo successfully updated",
                data : results
            });
        });
    },

    updateProbationRecord : (request, response) => {
        
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        updateProbationRecord(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            

            return response.status(200).json({
                success : true,
                message : "employee probation successfully updated",
                data : results
            });
        });
    },

    updateCurrentSalary : (request, response) => {
        
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        updateCurrentSalary(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee salary successfully updated",
                data : results
            });
        });
    },

    updateBankInfo : (request, response) => {
        
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        updateBankInfo(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee bank info successfully updated",
                data : results
            });
        });
    },

    updateJobTitle : (request, response) => {
        
        if(!request.body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to update data"
            });
        }

        updateJobTitle(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "job title successfully updated",
                data : results
            });
        });
    },

    updateCurrentJob : (request, response) => {
        
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        updateCurrentJob(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee job data successfully updated",
                data : results
            });
        });
    },

    createPayroll : (request, response) => {
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to save data"
            });
        }
        createPayroll(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee payroll data is created",
                data : results
            });
        });
    },


    updatePayroll : (request, response) => {
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        if(!request.body.payrollId)
        {
            return response.status(400).json({
                success : false,
                message: "payrollId is required to update data"
            });
        }
        updatePayroll(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee payroll data is updated",
                data : results
            });
        });
    },

    deletePayroll : (request, response) => {
    
        if(!request.body.payrollId)
        {
            return response.status(400).json({
                success : false,
                message: "payrollId is required to delete data"
            });
        }
        deletePayroll(request.body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee payroll data is deleted",
                data : results
            });
        });
    },

    createDocument : (request, response) => {
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to save data"
            });
        }
        createDocument(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee document data is created",
                data : results
            });
        });
    },


    updateDocument : (request, response) => {
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        if(!request.body.documentId)
        {
            return response.status(400).json({
                success : false,
                message: "documentId is required to update data"
            });
        }
        updateDocument(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee document data is updated",
                data : results
            });
        });
    },

    deleteDocument : (request, response) => {
    
        if(!request.body.documentId)
        {
            return response.status(400).json({
                success : false,
                message: "documentId is required to delete data"
            });
        }
        deleteDocument(request.body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee document data is deleted",
                data : results
            });
        });
    },

    getEmployeeDocuments: (request, response) => {
        const body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to fetch documents"
            });
        }
        getEmployeeDocuments(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get documents",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get documents",
                    data : results
                });
            }
       });
    },


    deleteEmployeeAccount : (request, response) => {

        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        deleteEmployee(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee account successfully deleted"
            });
        });
    },

    createEmergencyContact : (request, response) => {
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to save data"
            });
        }
        createEmergencyContact(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee emergency contact data is created",
                data : results
            });
        });
    },

    updateEmergencyContact : (request, response) => {
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        if(!request.body.contactId)
        {
            return response.status(400).json({
                success : false,
                message: "contactId is required to update data"
            });
        }
        updateEmergencyContact(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee emergency contact data is updated",
                data : results
            });
        });
    },

    deleteEmergencyContact : (request, response) => {
    
        if(!request.body.contactId)
        {
            return response.status(400).json({
                success : false,
                message: "contactId is required to delete data"
            });
        }
        deleteEmergencyContact(request.body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee emergency contact data is deleted",
                data : results
            });
        });
    },

    getEmployeeEmergencyContacts : (request, response) => {
        const body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to fetch emergency contacts"
            });
        }
        getEmployeeEmergencyContacts(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get emergency contacts",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get emergency contacts",
                    data : results
                });
            }
       });
    },

    createDependent : (request, response) => {
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to save data"
            });
        }
        createDependent(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee dependent data is created",
                data : results
            });
        });
    },

    updateDependent : (request, response) => {
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        if(!request.body.dependantId)
        {
            return response.status(400).json({
                success : false,
                message: "dependantId is required to update data"
            });
        }
        updateDependent(request, (error, results) => {
            if(error)
            {
                console.log(error);
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee dependent data is updated",
                data : results
            });
        });
    },

    deleteDependent : (request, response) => {
    
        if(!request.body.dependantId)
        {
            return response.status(400).json({
                success : false,
                message: "dependantId is required to delete data"
            });
        }
        deleteDependent(request.body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee dependent data is deleted",
                data : results
            });
        });
    },

    getEmployeeDependents: (request, response) => {
        const body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to fetch dependents"
            });
        }
        getEmployeeDependents(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get dependents",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get dependents",
                    data : results
                });
            }
       });
    },

    createBenifit : (request, response) => {
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to save data"
            });
        }
        createBenifit(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee benefit data is created",
                data : results
            });
        });
    },

    updateBenifit : (request, response) => {
        if(!request.body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to update data"
            });
        }

        if(!request.body.benefitId)
        {
            return response.status(400).json({
                success : false,
                message: "benefitId is required to update data"
            });
        }
        updateBenifit(request, (error, results) => {
            if(error)
            {
                console.log(error);
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee benefit data is updated",
                data : results
            });
        });
    },

    deleteBenifit : (request, response) => {
    
        if(!request.body.benefitId)
        {
            return response.status(400).json({
                success : false,
                message: "benefitId is required to delete data"
            });
        }
        deleteBenifit(request.body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "employee benifit data is deleted",
                data : results
            });
        });
    },

    getEmployeeBenifits: (request, response) => {
        const body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to fetch benifits"
            });
        }
        getEmployeeBenifits(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get benifits",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get benifits",
                    data : results
                });
            }
       });
    },

    getEmployeeById : (request, response) => {
        var body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to get employee details"
            });
        }

        getEmployeeById(body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "error while getting employee details",
                    error : error
                });
            }

            if(!results)
            {
                return response.status(404).json(
                    {
                        success : false,
                        message : "employee account not exists. Please create account"
                    }
                );
            }
            else
            {
                return response.status(200).json({
                    success : true,
                    message : "successfully read the employee data",
                    data : results
                });
            }
        });
    },

    getAllEmployees : (request, response) => {
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to fetch employees"
            });
        }
        getAllEmployees(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get all employees data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get employees data",
                    data : results
                });
            }
       });
    },

    getUserRoles : (request, response) => {
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to fetch user roles"
            });
        }
        getUserRoles(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get user roles data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get user roles data",
                    data : results
                });
            }
       });
    },

    getJobTitles : (request, response) => {
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to get job titles"
            });
        }
    
        getJobTitles(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get job titles data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get job titles data",
                    data : results
                });
            }
       });
    },

    getEmployeeSalaryHistory : (request, response) => {
        const body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to fetch salary histoy"
            });
        }
        getEmployeeSalaryHistory(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get salary history",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get salary history",
                    data : results
                });
            }
       });
    },

    getEmployeeBankInfo : (request, response) => {
        const body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to fetch bank info"
            });
        }
        getEmployeeBankInfo(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get bank info",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get bank info",
                    data : results
                });
            }
       });
    },

    getEmployeeProbationInfo : (request, response) => {
        const body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to fetch probation info"
            });
        }
        getEmployeeProbationInfo(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get probation info",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get probation info",
                    data : results
                });
            }
       });
    },

    getEmployeeJobHistory : (request, response) => {
        const body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to fetch job histoy"
            });
        }
        getEmployeeJobHistory(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get job history",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get job history",
                    data : results
                });
            }
       });
    },

    getEmployeePayrollHistory : (request, response) => {
        const body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to fetch payroll histoy"
            });
        }
        getEmployeePayrollHistory(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get payroll history",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get payroll history",
                    data : results
                });
            }
       });
    },

    getVisaTypes : (request, response) => {
        const body = request.body;
    
        getVisaTypes(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get visa types data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get visa types data",
                    data : results
                });
            }
       });
    },

    getCurrencies : (request, response) => {
        const body = request.body;
    
        getCurrencies(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get currencies data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get currencies data",
                    data : results
                });
            }
       });
    },

    getPaymentMethods : (request, response) => {
        const body = request.body;
    
        getPaymentMethods(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get payment methods data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get payment methods data",
                    data : results
                });
            }
       });
    },

    getEmployeeJobInfo : (request, response) => {
        const body = request.body;
        if(!body.employeeId)
        {
            return response.status(400).json({
                success : false,
                message: "employeeId is required to fetch job info"
            });
        }
        getEmployeeJobInfo(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get user job info",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get user job info",
                    data : results
                });
            }
       });
    },

    createCurrency : (request, response) => {
        if(!request.body.name)
        {
            return response.status(400).json({
                success : false,
                message: "name is required to save data"
            });
        }
        if(!request.body.shortName)
        {
            return response.status(400).json({
                success : false,
                message: "shortName is required to save data"
            });
        }
        if(!request.body.symbol)
        {
            return response.status(400).json({
                success : false,
                message: "symbol is required to save data"
            });
        }
        createCurrency(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : error
                });
            }

            return response.status(200).json({
                success : true,
                message : "currency data is created",
                data : results
            });
        });
    },
};