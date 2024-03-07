const  {create, update, deleteCompany, getAllCompanies, getCompanyById} = require("./companies.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createCompany : (request, response) =>{
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
       create(request, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to create new company",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "company successfully created",
                    data: results
                });
            }
       });
    },

    updateCompany : (request, response) =>{
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to update data"
            });
        }
       update(request, (error, results) =>{
        if(error)
        {
            return response.status(500).json({
                success : false,
                message : "failed to update the company",
                error: error
            });
        }
        else{
            return response.status(200).json({
                success : true,
                message: "Company successfully updated",
                data: results
            });
        }
       });
    },

    deleteCompany : (request, response) =>{
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to delete data"
            });
        }
       deleteCompany(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : false,
                    message : "error while deleting the company",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "Company successfully deleted",
                    data: results
                });
            }
       });
    },

    getCompanyById : (request, response) =>{
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to get data"
            });
        }
       getCompanyById(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "error while getting the company data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "Company successfully readed",
                    data: results
                });
            }
       });
    },

    getAllCompanies : (request, response) =>{
        const body = request.body;
        getAllCompanies(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get all companies data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get companies data",
                    data : results
                });
            }
       });
    },
}
