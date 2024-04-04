const  {create, update, deleteFile, getAllFiles} = require("./common-files.service");

module.exports = {
    createFile : (request, response) =>{
        const body = request.body;
        if(!body.title)
        {
            return response.status(400).json({
                success : false,
                message: "title is required"
            });
        }
        if(!body.description)
        {
            return response.status(400).json({
                success : false,
                message: "description is required"
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
                    message : "failed to create new file",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "file successfully created",
                    data: results
                });
            }
       });
    },

    updateFile : (request, response) =>{
        const body = request.body;
        if(!body.fileId)
        {
            return response.status(400).json({
                success : false,
                message: "fileId is required to update data"
            });
        }
       update(request, (error, results) =>{
        if(error)
        {
            return response.status(500).json({
                success : false,
                message : "failed to update the file",
                error: error
            });
        }
        else{
            return response.status(200).json({
                success : true,
                message: "file successfully updated",
                data: results
            });
        }
       });
    },

    deleteFile : (request, response) =>{
        const body = request.body;
        if(!body.fileId)
        {
            return response.status(400).json({
                success : false,
                message: "fileId is required to delete data"
            });
        }
       deleteFile(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : false,
                    message : "error while deleting the file",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "file successfully deleted",
                    data: results
                });
            }
       });
    },
    
    getAllFiles: (request, response) =>{
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to fetch files"
            });
        }
        getAllFiles(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get all files data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get files data",
                    data : results
                });
            }
       });
    },
}
