const express = require("express");
const userModel = require("../model/userModel");
const addRouter = express.Router();

addRouter.route("/").post(addData);

async function addData(req, res) {
  let data = req.body;
  for (let key in data) {
    if (key == "name" && data[key].length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "required field missing from body" });
    } else if (key == "email") {
      const r = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      if (r.test(data[key]) == false) {
        return res.status(400).json({
          success: false,
          message: "required field missing from body",
        });
      }
    } else if (key == "phoneNo") {
      const r = new RegExp(/^[0-9]*$/);
      if (r.test(data[key]) == false) {
        return res.status(400).json({
          success: false,
          message: "required field missing from body",
        });
      }
    } else if (key == "courseLevel" && data[key].length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "required field missing from body" });
    } else if (key == "country" && data[key].length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "required field missing from body" });
    }
  }
  try {
    let user = userModel.findOne({ email: req.body.email }).exec();
    if (user == null) {
      await userModel.create(req.body);
      return res.status(200).json({
        success: true,
        message: "user created sucessfully",
      });
    } else {
      let obj = { ...req.body };
      let email = obj.email;
      delete obj.email;
      let options = { upsert: true, new: true, setDefaultsOnInsert: true };
      userModel.findOneAndUpdate({ email }, { $set: obj }, options, (err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "user updated sucessfully",
          });
        }
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = addRouter;
