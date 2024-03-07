const  {create, update, deleteOffice, getAllOffices, getOfficeById} = require("./offices.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createOffice : (request, response) =>{
        const body = request.body;
        if(!body.name)
        {
            return response.status(400).json({
                success : false,
                message: "name is required"
            });
        }
        if(!body.email)
        {
            return response.status(400).json({
                success : false,
                message: "email is required"
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
                    message : "failed to create new office",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "office successfully created",
                    data: results
                });
            }
       });
    },

    updateOffice : (request, response) =>{
        const body = request.body;
        if(!body.officeId)
        {
            return response.status(400).json({
                success : false,
                message: "officeId is required to update data"
            });
        }
       update(request, (error, results) =>{
        if(error)
        {
            return response.status(500).json({
                success : false,
                message : "failed to update the office",
                error: error
            });
        }
        else{
            return response.status(200).json({
                success : true,
                message: "office successfully updated",
                data: results
            });
        }
       });
    },

    deleteOffice : (request, response) =>{
        const body = request.body;
        if(!body.officeId)
        {
            return response.status(400).json({
                success : false,
                message: "officeId is required to delete data"
            });
        }
       deleteOffice(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : false,
                    message : "error while deleting the office",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "office successfully deleted",
                    data: results
                });
            }
       });
    },
    
    getOfficeById : (request, response) =>{
        const body = request.body;
        if(!body.officeId)
        {
            return response.status(400).json({
                success : false,
                message: "officeId is required to get data"
            });
        }
       getOfficeById(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : false,
                    message : "error while getting the office",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "office data successfully readed",
                    data: results
                });
            }
       });
    },
    getAllOffices: (request, response) =>{
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to fetch offices"
            });
        }
        getAllOffices(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get all offices data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get offices data",
                    data : results
                });
            }
       });
    },
}
