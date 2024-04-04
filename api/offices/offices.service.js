const pool = require("../../config/database");

var officeSql = `
        select 
        officeId, 
        o.name, 
        o.email, 
        o.contact, 
        o.country, 
        city, 
        postalCode, 
        address, 
        timezone, 
        startDate, 
        endDate, 
        o.companyId, 
        o.createAt, 
        o.modifiedAt,
        c.companyId, 
        c.name as companyName, 
        tagLine, 
        description, 
        missionStatement, 
        visionStatement, 
        licenseNo,
        licenseExpiry, 
        fiscalYear,
        c.email as companyEmail, 
        c.contact as companyContact, 
        website, 
        headquarterAddress, 
        c.country as companyCountry, 
        logoUrl, 
        founder, 
        foundedDate, 
        employeeCount, 
        subscriptionType,
        subscriptionStart,
        subscriptionEnd,
        c.createAt as companyCreateAt, 
        c.modifiedAt as companyModifiedAt
        from offices o left join 
        companies c on o.companyId = c.companyId 
`;

function parseOfficeResponse(x){
    let company = null;
    if(x.companyName){
        company = {
            companyId : x.companyId,
            name : x.companyName,
            tagLine : x.tagLine,
            description : x.description,
            missionStatement : x.missionStatement,
            visionStatement : x.visionStatement,
            licenseNo : x.licenseNo,
            licenseExpiry : x.licenseExpiry,
            fiscalYear : x.fiscalYear,
            email : x.companyEmail,
            contact : x.companyContact,
            website : x.website,
            headquarterAddress : x.headquarterAddress,
            country : x.companyCountry,
            logoUrl : x.logoUrl,
            founder : x.founder,
            foundedDate : x.foundedDate,
            employeeCount : x.employeeCount,
            subscriptionType : x.subscriptionType,
            subscriptionStart : x.subscriptionStart,
            subscriptionEnd : x.subscriptionEnd,
            createAt : x.companyCreateAt,
            modifiedAt : x.companyModifiedAt,
        };
    }
    var office = {
        officeId : x.officeId,
        name : x.name,
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
        createAt : x.createAt,
        modifiedAt : x.modifiedAt,
        company: company
    };
    return office;
}

module.exports = {
    create :(req, callback) => {
            var data = req.body;            
            var sql = `${officeSql} where o.email = ? and o.companyId = ?`;
            var fields = [data.email, data.companyId];
            pool.query(sql, fields, (error, results, fields)=>{
                if(error)
                {
                    console.log(error);
                    return callback(error);
                }
                else{
                    var length = results.length;
                    pool.query(`insert into offices (name, email, contact, country, state, city, postalCode, address, timezone, startDate, endDate, companyId) values (?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [data.name, data.email, data.contact, data.country, data.state, data.city, data.postalCode, data.address, data.timezone, data.startDate, data.endDate, data.companyId], 
                    (error, results, fields)=> {
                       if(error)
                        {
                            console.log(error);
                            return callback(error);
                        }
                        else{
                            fields = [data.email, data.companyId];
                            pool.query(sql, fields, (error, results, fields)=>{
                                if(error)
                                {
                                    console.log(error);
                                    return callback(error);
                                }
                                else{
                                    length = results.length;
                                    if(length > 0){
                                        return callback(null, parseOfficeResponse(results[0]));
                                    }
                                    else{
                                        return callback(null, "failed to get office details");
                                    }
                                }
                            });
                        }
                    });
                    // if(length > 0){
                    //     return callback("office already exists with same email");
                    // }
                    // else{
                    //     pool.query(`insert into offices (name, email, contact, country, state, city, postalCode, address, timezone, startDate, endDate, companyId) values (?,?,?,?,?,?,?,?,?,?,?,?)`,
                    //     [data.name, data.email, data.contact, data.country, data.state, data.city, data.postalCode, data.address, data.timezone, data.startDate, data.endDate, data.companyId], 
                    //     (error, results, fields)=> {
                    //        if(error)
                    //         {
                    //             console.log(error);
                    //             return callback(error);
                    //         }
                    //         else{
                    //             fields = [data.email, data.companyId];
                    //             pool.query(sql, fields, (error, results, fields)=>{
                    //                 if(error)
                    //                 {
                    //                     console.log(error);
                    //                     return callback(error);
                    //                 }
                    //                 else{
                    //                     length = results.length;
                    //                     if(length > 0){
                    //                         return callback(null, parseOfficeResponse(results[0]));
                    //                     }
                    //                     else{
                    //                         return callback(null, "failed to get office details");
                    //                     }
                    //                 }
                    //             });
                    //         }
                    //     });
                    // }
                }
            });
           
    },
    
    update : (req, callback) => {
        var data = req.body;
        const now = new Date();
        data.modifiedAt = now;
    
        let sql = 'UPDATE offices SET ';
        const setClauses = [];
        
        for (const key in data) {
            if (data[key] !== null) {
            setClauses.push(`${key} = ?`);
            }
        }
        sql += setClauses.join(', '); 
        sql += ' WHERE officeId = ?'; 
        const values = [...Object.values(data).filter(val => val !== null), data.officeId];

        pool.query(sql, values, 
            (error, results, fields)=> {
                if(error)
                {
                    return callback(error);
                }
                else{
                    pool.query(`${officeSql} where officeId = ? `, [data.officeId], (error, results, fields)=>{
                        if(error)
                        {
                            console.log(error);
                            return callback(error);
                        }
                        else{
                            length = results.length;
                            if(length > 0){
                                return callback(null, parseOfficeResponse(results[0]));
                            }
                            else{
                                return callback(null, "failed to get office details");
                            }
                        }
                    });
                }
        });
    },

    deleteOffice : (data, callback) => {
        pool.query(`delete from offices where officeId = ?`,
         [data.officeId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getAllOffices : (data, callback) => {
        var text = "";
        if(data.search_text){
            text = data.search_text;
        }
        pool.query(`${officeSql} where (o.name like ? or o.email like ? or o.contact like ? or o.country like ?) and o.companyId = ?`,
         [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`,  data.companyId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getOfficeById : (data, callback) => {
        pool.query(`
        ${officeSql} 
        where officeId = ?
        `, [data.officeId], (error, results, fields)=>{
            if(error)
            {
                console.log(error);
                return callback(error);
            }
            else{
                length = results.length;
                if(length > 0){
                    var x = results[0];
                    var office = parseOfficeResponse(x);
                    return callback(null, office);
                }
                else{
                    return callback("no office found against this office id");
                }
            }
        });
    }
}
