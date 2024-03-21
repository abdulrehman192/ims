
const { request, response } = require("express");
const  {create, updateEmployee, deleteEmployee, getEmployeeById, getAllEmployees, getUserRoles} = require("./employees.service");
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

        if(!request.body.userId)
        {
            return response.status(400).json({
                success : false,
                message: "userId is required to update data"
            });
        }

        updateEmployee(request, (error, results) => {
            if(error)
            {
                if(error.includes("exists"))
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
                message : "User account successfully updated"
            });
        });
    },

    deleteEmployeeAccount : (request, response) => {

        if(!request.body.userId)
        {
            return response.status(400).json({
                success : false,
                message: "userId is required to update data"
            });
        }

        deleteEmployee(request, (error, results) => {
            if(error)
            {
                if(error.includes("exists"))
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
                message : "User account successfully updated"
            });
        });
    },

    getEmployeeById : (request, response) => {
        var body = request.body;
        if(!body.userId)
        {
            return response.status(400).json({
                success : false,
                message: "userId is required to get user details"
            });
        }

        getEmployeeById(body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "error while getting user details",
                    error : error
                });
            }

            if(!results)
            {
                return response.status(404).json(
                    {
                        success : false,
                        message : "user account not exists. Please create account"
                    }
                );
            }
            else
            {
                return response.status(200).json({
                    success : true,
                    message : "successfully read the user data",
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

};