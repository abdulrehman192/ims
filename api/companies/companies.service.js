const pool = require("../../config/database");



module.exports = {
    create :(req, callback) => {
            var data = req.body;
            const fileUrls = req.files.map(file => `/files/${file.originalname}`);
            if(fileUrls.length > 0)
            {
                data.logoUrl = fileUrls[0];
            }
            var sql = `select * from companies where name = ? or email = ?`;
            var fields = [data.name, data.email];
            pool.query(sql, fields, (error, results, fields)=>{
                if(error)
                {
                    console.log(error);
                    return callback(error);
                }
                else{
                    var length = results.length;
                    if(length > 0){
                        return callback("company already exists with same name or email");
                    }
                    else{
                        pool.query(`insert into companies (name, tagLine, description, missionStatement, visionStatement, licenseNo, licenseExpiry, ficsalYear, email, contact, website, headquaterAddress, country, logoUrl, founder, foundedDate, employeeCount) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [data.name, data.tagLine, data.description, data.missionStatement, data.visionStatement, data.licenseNo, data.licenseExpiry, data.ficsalYear, data.email, data.contact, data.website, data.headquaterAddress, data.country, data.logoUrl, data.founder, data.foundedDate, data.employeeCount], 
                        (error, results, fields)=> {
                           if(error)
                            {
                                console.log(error);
                                return callback(error);
                            }
                            else{
                                fields = [data.name, data.email];
                                pool.query(sql, fields, (error, results, fields)=>{
                                    if(error)
                                    {
                                        console.log(error);
                                        return callback(error);
                                    }
                                    else{
                                        length = results.length;
                                        if(length > 0){
                                            return callback(null, results[0]);
                                        }
                                        else{
                                            return callback(null, "failed to get company details");
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
        
        const fileUrls = req.files.map(file => `/files/${file.originalname}`);
        if(fileUrls.length > 0)
        {
            data.logoUrl = fileUrls[0];
        }
        let sql = 'UPDATE companies SET ';
        const setClauses = [];
        
        for (const key in data) {
            if (data[key] !== null) {
            setClauses.push(`${key} = ?`);
            }
        }
        sql += setClauses.join(', '); 
        sql += ' WHERE companyId = ?'; 
        const values = [...Object.values(data).filter(val => val !== null), data.companyId];

        pool.query(sql, values, 
            (error, results, fields)=> {
                if(error)
                {
                    return callback(errorMessage);
                }
                else{
                    pool.query(`select * from companies where companyId = ? `, [data.companyId], (error, results, fields)=>{
                        if(error)
                        {
                            console.log(error);
                            return callback(error);
                        }
                        else{
                            length = results.length;
                            if(length > 0){
                                return callback(null, results[0]);
                            }
                            else{
                                return callback(null, "failed to get company details");
                            }
                        }
                    });
                }
        });
    },
    deleteCompany : (data, callback) => {
        pool.query(`delete from companies where companyId = ?`,
         [data.companyId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getAllCompanies : (data, callback) => {
        var text = "";
        if(data.search_text){
            text = data.search_text;
        }
        pool.query(`select * from companies where name like ? or email like ? or contact like ? or country like ? or licenseNo like ?`,
         [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getCompanyById : (data, callback) => {
        pool.query(`select * from companies where companyId = ?`, [data.companyId], (error, results, fields)=>{
            if(error)
            {
                console.log(error);
                return callback(error);
            }
            else{
                length = results.length;
                if(length > 0){
                    return callback(null, results[0]);
                }
                else{
                    return callback(null, "no company found again this company id");
                }
            }
        });
    }
}
