const pool = require("../../config/database");


var assetsSql = `
SELECT 
assetId, 
title, 
description, 
d.employeeId, 
e.firstName,
e.lastName,
serialNo, 
d.status, 
d.companyId, 
d.createAt, 
d.modifiedAt
from
physical_assets d 
left join employees e on e.employeeId = d.employeeId 
`;

function parseAssetResponse(x){
    var employee = null;
    if(x.employeeId){
        employee = {
            firstName : x.firstName,
            lastName : x.lastName
        };
    }
    var asset = {
        assetId : x.assetId,
        title : x.title,
        description : x.description,
        employeeId : x.employeeId,
        employee : employee,
        serialNo : x.serialNo,
        status : x.status,
        companyId : x.companyId,
        createAt : x.createAt,
        modifiedAt : x.modifiedAt,
    
    };
    return asset;
}

module.exports = {
    create :(req, callback) => {
            var data = req.body;
            pool.query(`insert into physical_assets (title, description, employeeId, serialNo, status, companyId) values (?,?,?,?,?,?)`,
            [data.title, data.description, data.employeeId, data.serialNo, data.status, data.companyId], 
            (error, results, fields)=> {
               if(error)
                {
                    console.log(error);
                    return callback(error);
                }
                else{
                    return callback(null, results);
                }
            });
    },
    
    update : (req, callback) => {
        var data = req.body;
        const now = new Date();
        data.modifiedAt = now;
    
        let sql = 'UPDATE physical_assets SET ';
        const setClauses = [];
        
        for (const key in data) {
            if (data[key] !== null) {
            setClauses.push(`${key} = ?`);
            }
        }
        sql += setClauses.join(', '); 
        sql += ' WHERE assetId = ?'; 
        const values = [...Object.values(data).filter(val => val !== null), data.assetId];

        pool.query(sql, values, 
            (error, results, fields)=> {
                if(error)
                {
                    return callback(error);
                }
                else{
                    return callback(null, results);
                }
        });
    },

    deleteAsset : (data, callback) => {
        pool.query(`delete from physical_assets where assetId = ?`,
         [data.assetId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getAssets : (data, callback) => {
        var text = "";
        if(data.search_text){
            text = data.search_text;
        }
        pool.query(`${assetsSql} where (d.title like ? or d.description like ? or d.serialNo like ? or d.status like ?) and d.companyId = ?`,
         [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, data.companyId], 
         (error, results, fields)=> {
            if(error)
            {
                return callback(error);
            }
            else{
                var assets = [];
                for(var d in results){
                    assets.push(parseAssetResponse(results[d]));
                }
                return callback(null, assets);
            }
                
         });
    },
}
