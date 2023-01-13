import React from "react";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";

function EditFormData({ open, setOpen, selectedUser, getFormData }) {
  // console.log("selected user", selectedUser);
  const addressData = [
    { label: "570026 Bogadi Mysore" },
    { label: "560018 Chamarajapet Banglore" },
    { label: "560100 Electronic City Banglore" },
    { label: "560078 J P Nagar Banglore" },
    { label: "570004 Chamundi Extn Mysore" },
    { label: "560041 Jayanagar Banglore" },
    { label: "560041 Jayanagar Manglore" },
    { label: "572101 Tumkur" },
    { label: "563135 Kolar" },
    { label: "577428 Belgavi" }
  ];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setformData] = useState({
    fName: "",
    lName: "",
    dob: null,
    age: "",
    emailId: "",
    phNo: "",
    address: "",
  });
  console.log(formData, "formData");
  const [errorData, setErrorData] = useState({
    fName: "",
    lName: "",
    dob: "",
    age: "",
    emailId: "",
    phNo: "",
    address: "",
  });

  useEffect(() => {
    setformData({ ...selectedUser });
  }, [selectedUser]);

  const updateChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [value, setValue] = useState(null);

  const getDobDate = (newValue, value) => {
    let date = new Date(newValue);
    setValue(newValue);
    setformData({
      ...formData,
      dob: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
    });
  };

  const commonStyles = {
    bgcolor: "background.paper",
    m: 1,
    bordercolor: "red",
    height: "0.48rem",
  };

  useEffect(() => {
    let calculate_age = () => {
      let today = new Date();
      let birthDate = new Date(formData.dob);
      let age_now = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
      }
      if (formData.dob !== null) {
        setformData({
          ...formData,
          age: age_now,
        });
      }
      return age_now;
    };
    calculate_age();
  }, [formData.dob]);

  let editFormData = async () => {
    try {
      let response = await axios.put(
        `http://localhost:8000/form/editFormData/${selectedUser._id}`,
        formData
      );
      getFormData();
      setOpen(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogActions
          sx={{
            justifyContent: "center",
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "sans-serif",
            marginTop: "20px",
          }}
        >
          Edit Form
        </DialogActions>
        <DialogContent>
          <Grid
            container
            direction="column"
            className="mb-4 justify-content-center align-items-center "
            columns={{ sm: 12, md: 6, lg: 6 }}
          >
            <Grid item sm={12} md={6} className="pt-2 ">
              <TextField
                id="name-input"
                name="fName"
                label="First Name"
                type="text"
                sx={{
                  width: { sm: 300, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 40,
                    justifyContent: "center",
                  },
                }}
                className="d-flex justify-content-center p-2"
                value={formData.fName}
                onChange={(e) => updateChange(e)}
              />
              {errorData.fName && (
                <p
                  error
                  style={{ color: "red", fontSize: 12, marginRight: 50 }}
                >
                  {errorData.fName}
                </p>
              )}
            </Grid>

            <Grid item sm={12} md={6} className="pt-2">
              <TextField
                id="name-input"
                name="lName"
                label="Last Name"
                type="text"
                sx={{
                  width: { sm: 300, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 40,
                    justifyContent: "center",
                  },
                }}
                className="d-flex justify-content-center p-2"
                value={formData.lName}
                onChange={(e) => updateChange(e)}
              />
              {errorData.fName && (
                <p
                  error
                  style={{ color: "red", fontSize: 12, marginRight: 50 }}
                >
                  {errorData.fName}
                </p>
              )}
            </Grid>

            <Grid item sm={12} md={6} className="pt-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={value}
                  onChange={(newValue) => {
                    getDobDate(newValue);
                  }}
                  renderInput={(params) => (
                    <>
                      <TextField
                        size="small"
                        sx={{
                          width: { sm: 300, md: 300 },
                          "& .MuiInputBase-input": {
                            ...commonStyles,
                            padding: "8px 2px",
                          },
                        }}
                        fullWidth
                        {...params}
                      />
                    </>
                  )}
                />
              </LocalizationProvider>
              {errorData.dob && (
                <p
                  error
                  style={{ color: "red", fontSize: 12, marginRight: 50 }}
                >
                  {errorData.dob}
                </p>
              )}
            </Grid>

            <Grid item sm={12} md={6} className="pt-2">
              <TextField
                id="name-input"
                name="age"
                label="Age"
                type="text"
                sx={{
                  width: { sm: 300, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
                className="d-flex justify-content-center p-2"
                value={formData.age}
                onChange={(e) => updateChange(e)}
              />
              {errorData.age && (
                <p
                  error
                  style={{ color: "red", fontSize: 12, marginRight: 50 }}
                >
                  {errorData.age}
                </p>
              )}
            </Grid>

            <Grid item sm={12} md={6} className="pt-2">
              <TextField
                id="name-input"
                name="emailId"
                label="Email ID"
                type="text"
                sx={{
                  width: { sm: 300, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
                className="d-flex justify-content-center p-2"
                value={formData.emailId}
                onChange={(e) => updateChange(e)}
              />
              {errorData.emailId && (
                <p
                  error
                  style={{ color: "red", fontSize: 12, marginRight: 50 }}
                >
                  {errorData.emailId}
                </p>
              )}
            </Grid>

            <Grid item sm={12} md={6} className=" pt-2">
              <TextField
                id="name-input"
                name="phNo"
                label="Phone No"
                type="text"
                sx={{
                  width: { sm: 300, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
                className=" d-flex justify-content-center p-2"
                value={formData.phNo}
                onChange={(e) => updateChange(e)}
              />
              {errorData.phNo && (
                <p
                  error
                  style={{ color: "red", fontSize: 12, marginRight: 50 }}
                >
                  {errorData.phNo}
                </p>
              )}
            </Grid>

            <Grid item sm={12} md={6} className="pt-2">
              {/* <TextField
                id="name-input"
                name="address"
                label="Address"
                type="text"
                fullWidth
                sx={{
                  width: { sm: 300, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
                className="d-flex justify-content-center p-2"
                value={formData.address}
                onChange={(e) => updateChange(e)}
              /> */}

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={addressData}
                value={formData.address}
                onChange={(e, value) => {
                  setformData({ ...formData, address: value.label });
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Address" />
                )}
              />
              {errorData.address && (
                <p
                  error
                  style={{ color: "red", fontSize: 12, marginRight: 50 }}
                >
                  {errorData.address}
                </p>
              )}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            marginBottom: "10px",
            height: "100%",
          }}
        >
          <Grid item sm={12} md={6}>
            <Button
              variant="contained"
              className="m-1 w-100 d-flex justify-content-center align-item-center "
              onClick={editFormData}
            >
              Save Changes
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditFormData;
