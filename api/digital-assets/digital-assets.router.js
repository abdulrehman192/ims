const { createAsset, updateAsset, deleteAsset, getAssets } = require("./digital-assets.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");
const fs = require('fs');


router.post("/create-digital-asset" , checkToken, createAsset);
router.patch("/update-digital-asset" , checkToken, updateAsset);
router.delete("/delete-digital-asset", checkToken, deleteAsset);
router.post("/get-all-digital-assets", checkToken, getAssets);

module.exports = router;