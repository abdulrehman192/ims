const pool = require("../../config/database");
const CryptoJS = require('crypto-js');

// Replace these values with your own secret key
const secretKey = 'ims';

// Function to encrypt a string
function encrypt(text) {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encrypted;
}

// Function to decrypt an encrypted string
function decrypt(encryptedText) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
  return decrypted;
}


var assetsSql = `
SELECT 
assetId, 
title, 
d.description, 
url,
 username, 
 password, 
 expireOn, 
 d.companyId, 
 d.createAt, 
 d.modifiedAt
 from digital_assets d
 left join companies c on c.companyId = d.companyId 
`;

function parseAssetResponse(x){
    
    var asset = {
        assetId : x.assetId,
        title : x.title,
        description : x.description,
        url : x.url,
        username : x.username,
        password : decrypt(x.password),
        expireOn : x.expireOn,
        companyId : x.companyId,
        createAt : x.createAt,
        modifiedAt : x.modifiedAt,
    
    };
    return asset;
}

module.exports = {
    create :(req, callback) => {
            var data = req.body;
            pool.query(`insert into digital_assets ( title, description, url, username, password, expireOn, companyId) values (?,?,?,?,?,?,?)`,
            [data.title, data.description, data.url, data.username, encrypt(data.password),data.expireOn, data.companyId], 
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
    
        let sql = 'UPDATE digital_assets SET ';
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
        pool.query(`delete from digital_assets where assetId = ?`,
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
        pool.query(`${assetsSql} where (d.title like ? or d.description like ? or d.url like ? or d.username like ?) and d.companyId = ?`,
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
