const  {getAllCountriesNames, getAllCountryCitiesNames, getAllCountryTimezones} = require("./countries.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    getAllCountriesNames : (request, response) =>{
        const body = request.body;
    
        getAllCountriesNames(request, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get countries name",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "successfully read the countries data",
                    data: results
                });
            }
       });
    },

    getAllCountryCitiesNames : (request, response) =>{
        const body = request.body;
        if(!body.country)
        {
            return response.status(400).json({
                success : false,
                message: "country is required to get cities"
            });
        }
        getAllCountryCitiesNames(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get cities name",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "successfully read the cities data",
                    data: results
                });
            }
       });
    },

    getAllCountryTimezones : (request, response) =>{
        const body = request.body;
        if(!body.country)
        {
            return response.status(400).json({
                success : false,
                message: "country is required to get timezones"
            });
        }
        getAllCountryTimezones(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : false,
                    message : "failed to get timezones",
                    error: error
                });
            }
            else{
                return response.status(200).json({
                    success : true,
                    message: "successfully read the timezones",
                    data: results
                });
            }
       });
    },
}
