const  {create, update, deleteAnnouncement, getAllAnnouncements} = require("./announcements.service");

module.exports = {
    createAnnouncement : (request, response) =>{
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
                    message : "failed to create new announcement",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "announcement successfully created",
                    data: results
                });
            }
       });
    },

    updateAnnouncement : (request, response) =>{
        const body = request.body;
        if(!body.announcementId)
        {
            return response.status(400).json({
                success : false,
                message: "announcementId is required to update data"
            });
        }
       update(request, (error, results) =>{
        if(error)
        {
            return response.status(500).json({
                success : false,
                message : "failed to update the announcement",
                error: error
            });
        }
        else{
            return response.status(200).json({
                success : true,
                message: "Announcement successfully updated",
                data: results
            });
        }
       });
    },

    deleteAnnouncement : (request, response) =>{
        const body = request.body;
        if(!body.announcementId)
        {
            return response.status(400).json({
                success : false,
                message: "announcementId is required to delete data"
            });
        }
       deleteAnnouncement(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : false,
                    message : "error while deleting the Announcement",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "Announcement successfully deleted",
                    data: results
                });
            }
       });
    },
    
    getAllAnnouncements: (request, response) =>{
        const body = request.body;
        if(!body.companyId)
        {
            return response.status(400).json({
                success : false,
                message: "companyId is required to fetch Announcements"
            });
        }
        getAllAnnouncements(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get all Announcements data",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message : "successfully get Announcements data",
                    data : results
                });
            }
       });
    },
}
