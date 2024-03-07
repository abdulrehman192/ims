const { getAllCountriesNames, getAllCountryCitiesNames, getAllCountryTimezones } = require("./countries.controller");

const router = require("express").Router();

router.post("/get-countries-names" , getAllCountriesNames);
router.post("/get-cities-names" , getAllCountryCitiesNames);
router.post("/get-country-timezones" , getAllCountryTimezones);

module.exports = router;