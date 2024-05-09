const pool = require("../../config/database");

var fileSql = `
SELECT 
fileId, 
title, 
f.description, 
employeePrivacy, 
fileUrl, 
f.officeId, 
f.companyId, 
f.createAt, 
f.modifiedAt,
o.name as officeName

from common_folder f 
left join offices o on o.officeId = f.officeId
left join companies c on c.companyId = f.companyId  
`;

function parseAnnouncementResponse(x){
    let office = null;
    if(x.officeName){
        office = {
            officeId : x.officeId,
            name : x.officeName,
            
        };
    }

    
    var file = {
        fileId : x.fileId,
        title : x.title,
        description : x.description,
        employeePrivacy : x.employeePrivacy,
        fileUrl : x.fileUrl,
        officeId : x.officeId,
        companyId : x.companyId,
        createAt : x.createAt,
        modifiedAt : x.modifiedAt,
        office: office
    };
    return file;
}

module.exports = {
    create :(req, callback) => {
            var data = req.body;   
            if(req.files.length > 0)
                {
                  req.files.forEach(file => {
                    data[file.fieldname] = req[file.fieldname];
                  });
                }        
            pool.query(`insert into common_folder( title, description, employeePrivacy, fileUrl, officeId, companyId) values (?,?,?,?,?,?)`,
                    [data.title, data.description, data.employeePrivacy, data.fileUrl,  data.officeId, data.companyId], 
                    (error, results, fields)=> {
                       if(error)
                        {
                            console.log(error);
                            return callback(error);
                        }
                        else{
                            return callback(null, "File created");
                        }
                    });
           
    },
    
    update : (req, callback) => {
        var data = req.body;
        const now = new Date();
        data.modifiedAt = now;
        if(req.files.length > 0)
            {
              req.files.forEach(file => {
                data[file.fieldname] = req[file.fieldname];
              });
            } 
        let sql = 'UPDATE common_folder SET ';
        const setClauses = [];
        
        for (const key in data) {
            if (data[key] !== null) {
            setClauses.push(`${key} = ?`);
            }
        }
        sql += setClauses.join(', '); 
        sql += ' WHERE fileId = ?'; 
        const values = [...Object.values(data).filter(val => val !== null), data.fileId];

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

    deleteFile: (data, callback) => {
        pool.query(`delete from common_folder where fileId = ?`,
         [data.fileId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getAllFiles : (data, callback) => {
        var text = "";
        if(data.search_text){
            text = data.search_text;
        }
        pool.query(`${fileSql} where (f.title like ?  or f.description like ?) and f.companyId = ?`,
         [`%${text}%`, `%${text}%`,  data.companyId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
                else{
                    var files = [];
                    for(var d in results){
                        files.push(parseAnnouncementResponse(results[d]));
                    }
                    return callback(null, files);
                }
           
         });
    },
}
