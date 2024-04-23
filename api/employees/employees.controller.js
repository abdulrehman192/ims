
const { request, response } = require("express");
const  {create, updateProfilePhoto,updateEmployee, deleteEmployee, getEmployeeById, getAllEmployees, getUserRoles, getEmployeeJobInfo, getVisaTypes} = require("./employees.service");
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