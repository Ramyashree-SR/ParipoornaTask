const formdata = require("../../models/FormDatSchema");

let getAllFormData = async (req, res, next) => {
  // console.log("request----->", req);
  try {
    let formprocess = await formdata.find().lean();
    res.json({
      error: false,
      message: "All Form Information",
      data: formprocess,
    });
  } catch (err) {
    next(err);
  }
};

let addFormData = async (req, res, next) => {
  console.log(req.body, "vv");
  let { fName, lName, dob, age, emailId, phNo, address } = req.body;
  try {
    await formdata.insertMany([
      { fName, lName, dob, age, emailId, phNo, address },
    ]);
    res.json({
      error: false,
      message: "Form Information Added Sucessfully",
      data: { fName, lName, dob, age, emailId, phNo, address },
    });
  } catch (err) {
    next(err);
  }
};

let editFormData = async (req, res, next) => {
  console.log("exe");
  let { fName, lName, dob, age, emailId, phNo, address } = req.body;

  try {
    let data = await formdata.findOne({ _id: req.params._id });
    if (data) {
      await formdata.updateOne(
        { _id: req.params._id },
        {
          $set: { fName, lName, dob, age, emailId, phNo, address },
        }
      );
      res.json({
        err: false,
        message: "FormData Edited Sucessfully",
        data: { fName, lName, dob, age, emailId, phNo, address },
      });
    } else {
      res.json({
        error: true,
        message: "invalid Id",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteFormData = async (req, res, next) => {
  try {
    let data = await formdata.findOne({ _id: req.params._id });
    if (data) {
      await formdata.deleteOne({ _id: req.params._id });
      res.json({
        error: false,
        message: "FormData deleted successfully",
        data: null,
      });
    } else {
      res.json({
        error: true,
        message: "invalid Id",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFormData,
  addFormData,
  editFormData,
  deleteFormData,
};
