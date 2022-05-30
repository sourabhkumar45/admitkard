const express = require("express");
const userModel = require("../model/userModel");
const searchRouter = express.Router();

searchRouter.route("/").get(search);

async function search(req, res) {
  const r = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  if (r.test(req.query.email) == false) {
    res.status(500).json({
      success: false,
      message: "required field missing from body",
    });
  } else {
    try {
      let user = await userModel.find({ email: req.query.email }).exec();
      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
module.exports = searchRouter;
