const pool = require("../../config/database");

module.exports = {
    getAllCountriesNames: (req, callback)=> {
        pool.query(`SELECT * FROM timezones group by country`, [], (error, results) => {
            if(error)
            {
                return callback(error);
            }
            else
            {
                return callback(null, results)
            }
        });
    },
    getAllCountryCitiesNames: (data, callback)=> {

        pool.query(`SELECT * FROM cities where country = ?`, [data.country], (error, results) => {
            if(error)
            {
                return callback(error);
            }
            else
            {
                return callback(null, results)
            }
        });
    },

    getAllCountryTimezones: (data, callback)=> {

        pool.query(`SELECT * FROM timezones where country = ?`, [data.country], (error, results) => {
            if(error)
            {
                return callback(error);
            }
            else
            {
                return callback(null, results)
            }
        });
    },
}
