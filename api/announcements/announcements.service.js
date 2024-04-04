const pool = require("../../config/database");

var announcementSql = `
Select 
announcementId,
 title, 
 a.description,
 type, 
 status, 
 fileUrl, 
 issuedBy, 
 dateTime, 
 a.departmentId, 
 a.officeId, 
 a.companyId, 
 a.createAt, 
 a.modifiedAt,
 d.name as departmentName,
 o.name as officeName
 from announcements a
 left join offices o on o.officeId = a.officeId
 left join departments d  on d.departmentId = a.departmentId
 left join companies c on c.companyId = a.companyId  
`;

function parseAnnouncementResponse(x){
    let office = null;
    let department = null;
    if(x.officeName){
        office = {
            officeId : x.officeId,
            name : x.officeName,
            
        };
    }

    if(x.departmentName){
        department = {
            departmentId : x.departmentId,
            name : x.departmentName,
            
        };
    }
    var announcement = {
        announcementId : x.announcementId,
        title : x.title,
        description : x.description,
        type : x.type,
        status : x.status,
        fileUrl : x.fileUrl,
        issuedBy : x.issuedBy,
        dateTime : x.dateTime,
        departmentId : x.departmentId,
        officeId : x.officeId,
        companyId : x.companyId,
        createAt : x.createAt,
        modifiedAt : x.modifiedAt,
        department: department,
        office: office
    };
    return announcement;
}

module.exports = {
    create :(req, callback) => {
            var data = req.body;   
            if(req.files.length > 0)
                {
                data.fileUrl = req.imageUrl;
                }         
            pool.query(`insert into announcements(title, description, type, status, fileUrl, issuedBy, dateTime, departmentId, officeId, companyId) values (?,?,?,?,?, ?,?,?,?,?)`,
                    [data.title, data.description, data.type, data.status, data.fileUrl, data.issuedBy, data.dateTime, data.departmentId, data.officeId, data.companyId], 
                    (error, results, fields)=> {
                       if(error)
                        {
                            console.log(error);
                            return callback(error);
                        }
                        else{
                            return callback(null, "Announcement created");
                        }
                    });
           
    },
    
    update : (req, callback) => {
        var data = req.body;
        const now = new Date();
        data.modifiedAt = now;
        if(req.files.length > 0)
        {
        data.fileUrl = req.imageUrl;
        }  
        let sql = 'UPDATE announcements SET ';
        const setClauses = [];
        
        for (const key in data) {
            if (data[key] !== null) {
            setClauses.push(`${key} = ?`);
            }
        }
        sql += setClauses.join(', '); 
        sql += ' WHERE announcementId = ?'; 
        const values = [...Object.values(data).filter(val => val !== null), data.announcementId];

        pool.query(sql, values, 
            (error, results, fields)=> {
                if(error)
                {
                    return callback(error);
                }
                else{
                    return callback(null, "Announcement updated");
                }
        });
    },

    deleteAnnouncement : (data, callback) => {
        pool.query(`delete from announcements where announcementId = ?`,
         [data.announcementId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getAllAnnouncements : (data, callback) => {
        var text = "";
        if(data.search_text){
            text = data.search_text;
        }
        pool.query(`${announcementSql} where (a.title like ? or issuedBy like ? or a.type like ? or a.description like ?) and a.companyId = ?`,
         [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`,  data.companyId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
                else{
                    var announcements = [];
                    for(var d in results){
                        announcements.push(parseAnnouncementResponse(results[d]));
                    }
                    return callback(null, announcements);
                }
           
         });
    },
}
