const pool = require("../../config/database");

var departmentSql = `
SELECT 
departmentId, 
d.name, 
d.description, 
d.officeId, 
d.createAt, 
d.modifiedAt,
o.officeId, 
o.name as officeName, 
o.email, 
o.contact, 
o.country, 
o.state,
city, 
postalCode, 
address, 
timezone, 
startDate, 
endDate, 
o.companyId, 
o.createAt as officeCreateAt, 
o.modifiedAt as officeModifiedAt
from departments d left join 
offices o on d.officeId = o.officeId
`;

function parseDepartmentResponse(x){
    
    var department = {
        departmentId : x.departmentId,
        name : x.name,
        description : x.description,
        officeId : x.officeId,
        createAt : x.createAt,
        modifiedAt : x.modifiedAt,
        office: {
            officeId : x.officeId,
            name : x.officeName,
            email : x.email,
            contact : x.contact,
            country : x.country,
            state : x.state,
            city : x.city,
            postalCode : x.postalCode,
            address : x.address,
            timezone : x.timezone,
            startDate : x.startDate,
            endDate : x.endDate,
            companyId : x.companyId,
            createAt : x.officeCreateAt,
            modifiedAt : x.officeModifiedAt,
        }
    };
    return department;
}

module.exports = {
    create :(req, callback) => {
            var data = req.body;
            
            var sql = `${departmentSql} where d.name = ? and d.officeId = ?`;
            var fields = [data.name, data.officeId];
            pool.query(sql, fields, (error, results, fields)=>{
                if(error)
                {
                    console.log(error);
                    return callback(error);
                }
                else{
                    var length = results.length;
                    if(length > 0){
                        return callback("department already exists with same name in selected office");
                    }
                    else{
                        pool.query(`insert into departments (name, description, officeId, companyId) values (?,?,?,?)`,
                        [data.name, data.description, data.officeId, data.companyId], 
                        (error, results, fields)=> {
                           if(error)
                            {
                                console.log(error);
                                return callback(error);
                            }
                            else{
                                fields = [data.name, data.officeId];
                                pool.query(sql, fields, (error, results, fields)=>{
                                    if(error)
                                    {
                                        console.log(error);
                                        return callback(error);
                                    }
                                    else{
                                        length = results.length;
                                        if(length > 0){
                                            return callback(null, parseDepartmentResponse(results[0]));
                                        }
                                        else{
                                            return callback(null, "failed to get department details");
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            });
           
    },
    
    update : (req, callback) => {
        var data = req.body;
        const now = new Date();
        data.modifiedAt = now;
    
        let sql = 'UPDATE departments SET ';
        const setClauses = [];
        
        for (const key in data) {
            if (data[key] !== null) {
            setClauses.push(`${key} = ?`);
            }
        }
        sql += setClauses.join(', '); 
        sql += ' WHERE departmentId = ?'; 
        const values = [...Object.values(data).filter(val => val !== null), data.departmentId];

        pool.query(sql, values, 
            (error, results, fields)=> {
                if(error)
                {
                    return callback(error);
                }
                else{
                    pool.query(`${departmentSql} where d.officeId = ? `, [data.officeId], (error, results, fields)=>{
                        if(error)
                        {
                            console.log(error);
                            return callback(error);
                        }
                        else{
                            length = results.length;
                            if(length > 0){
                                return callback(null, parseDepartmentResponse(results[0]));
                            }
                            else{
                                return callback(null, "failed to get department details");
                            }
                        }
                    });
                }
        });
    },

    deleteDepartment : (data, callback) => {
        pool.query(`delete from departments where departmentId = ?`,
         [data.departmentId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getOfficeDepartments : (data, callback) => {
        var text = "";
        if(data.search_text){
            text = data.search_text;
        }
        pool.query(`${departmentSql} where (d.name like ? or d.description like ? or o.name like ? or o.email like ?) and d.officeId = ?`,
         [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, data.officeId], 
         (error, results, fields)=> {
            if(error)
            {
                return callback(error);
            }
            else{
                var departments = [];
                for(var d in results){
                    departments.push(parseDepartmentResponse(results[d]));
                }
                return callback(null, departments);
            }
                
         });
    },

    getAllDepartments : (data, callback) => {
        var text = "";
        if(data.search_text){
            text = data.search_text;
        }
        pool.query(`${departmentSql} where (d.name like ? or d.description like ? or o.name like ? or o.email like ?) and o.companyId = ?`,
         [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, data.companyId], 
         (error, results, fields)=> {
            if(error)
            {
                return callback(error);
            }
            else{
                var departments = [];
                for(var d in results){
                    departments.push(parseDepartmentResponse(results[d]));
                }
                return callback(null, departments);
            }
                
         });
    },

    getDepartmentById : (data, callback) => {
        pool.query(`
        ${departmentSql} 
        where departmentId = ?
        `, [data.departmentId], (error, results, fields)=>{
            if(error)
            {
                console.log(error);
                return callback(error);
            }
            else{
                length = results.length;
                if(length > 0){
                    var x = results[0];
                    var office = parseDepartmentResponse(x);
                    return callback(null, office);
                }
                else{
                    return callback("no department found against this department id");
                }
            }
        });
    }
}
