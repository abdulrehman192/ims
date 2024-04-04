const  {create, update, deleteAsset, getAssets, } = require("./physical-assets.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createAsset : (request, response) =>{
        const body = request.body;
        if(!body.title)
        {
            return response.status(400).json({
                success : false,
                message: "title is required"
            });
        }
    
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required"
            });
        }

        if(!body.serialNo)
        {
            return response.status(400).json({
                success : false,
                message: "serialNo is required"
            });
        }
       create(request, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to create new asset",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "asset successfully created",
                    data: results
                });
            }
       });
    },

    updateAsset : (request, response) =>{
        const body = request.body;
        if(!body.assetId)
        {
            return response.status(400).json({
                success : false,
                message: "assetId is required to update data"
            });
        }
       update(request, (error, results) =>{
        if(error)
        {
            return response.status(500).json({
                success : false,
                message : "failed to update the asset",
                error: error
            });
        }
        else{
            return response.status(200).json({
                success : true,
                message: "asset successfully updated",
                data: results
            });
        }
       });
    },

    deleteAsset : (request, response) =>{
        const body = request.body;
        if(!body.assetId)
        {
            return response.status(400).json({
                success : false,
                message: "assetId is required to delete data"
            });
        }
       deleteAsset(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : false,
                    message : "error while deleting the asset",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "asset successfully deleted",
                    data: results
                });
            }
       });
    },
    
  
    
    getAssets: (request, response) =>{
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to fetch assets"
            });
        }
        getAssets(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get all assets data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get assets data",
                    data : results
                });
            }
       });
    },

}
