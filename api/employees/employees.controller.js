
const { request, response } = require("express");
const  {create, updateProfilePhoto,updateEmployee, updateBankInfo, getEmployeeBankInfo, getPaymentMethods,createPayroll, updatePayroll, deletePayroll, deleteEmployee, getEmployeePayrollHistory, getEmployeeJobHistory, updateCurrentJob, getJobTitles, updateCurrentSalary, getCurrencies, getEmployeeById, getEmployeeSalaryHistory, getAllEmployees, getUserRoles, getEmployeeJobInfo, getVisaTypes} = require("./employees.service");
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
        deletePayroll(request, (error, results) => {
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
};