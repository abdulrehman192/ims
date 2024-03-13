const  {create, update, deleteDepartment, getOfficeDepartments, getDepartmentById, getAllDepartments} = require("./departments.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createDepartment : (request, response) =>{
        const body = request.body;
        if(!body.name)
        {
            return response.status(400).json({
                success : false,
                message: "name is required"
            });
        }
    
        if(!body.officeId)
        {
            return response.status(400).json({
                success : false,
                message: "officeId is required"
            });
        }

        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required"
            });
        }
       create(request, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to create new department",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "department successfully created",
                    data: results
                });
            }
       });
    },

    updateDepartment : (request, response) =>{
        const body = request.body;
        if(!body.departmentId)
        {
            return response.status(400).json({
                success : false,
                message: "departmentId is required to update data"
            });
        }
       update(request, (error, results) =>{
        if(error)
        {
            return response.status(500).json({
                success : false,
                message : "failed to update the department",
                error: error
            });
        }
        else{
            return response.status(200).json({
                success : true,
                message: "department successfully updated",
                data: results
            });
        }
       });
    },

    deleteDepartment : (request, response) =>{
        const body = request.body;
        if(!body.departmentId)
        {
            return response.status(400).json({
                success : false,
                message: "departmentId is required to delete data"
            });
        }
       deleteDepartment(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : false,
                    message : "error while deleting the department",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "department successfully deleted",
                    data: results
                });
            }
       });
    },
    
    getDepartmentById : (request, response) =>{
        const body = request.body;
        if(!body.departmentId)
        {
            return response.status(400).json({
                success : false,
                message: "departmentId is required to get data"
            });
        }
       getDepartmentById(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : false,
                    message : "error while getting the department",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "department data successfully readed",
                    data: results
                });
            }
       });
    },
    
    getOfficeDepartments: (request, response) =>{
        const body = request.body;
        if(!body.officeId)
        {
            return response.status(400).json({
                success : false,
                message: "officeId is required to fetch department"
            });
        }
        getOfficeDepartments(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get all departments data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get departments data",
                    data : results
                });
            }
       });
    },

    getAllDepartments: (request, response) =>{
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to fetch department"
            });
        }
        getAllDepartments(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get all departments data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get departments data",
                    data : results
                });
            }
       });
    },
}
