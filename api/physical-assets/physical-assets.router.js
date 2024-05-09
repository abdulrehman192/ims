const { createAsset, updateAsset, deleteAsset, getAssets } = require("./physical-assets.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/validation-token");



router.post("/create-physical-asset" , checkToken, createAsset);
router.patch("/update-physical-asset" , checkToken, updateAsset);
router.delete("/delete-physical-asset", checkToken, deleteAsset);
router.post("/get-all-physical-assets", checkToken, getAssets);

module.exports = router;