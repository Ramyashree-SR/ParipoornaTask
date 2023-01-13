import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker } from "antd";
// import TextField from '@mui/material/TextField';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FormTable from "../FormTable";

function DataForm() {
  const addressData = [
    { label: "570026 Bogadi Mysore" },
    { label: "560018 Chamarajapet Banglore" },
    { label: "560100 Electronic City Banglore" },
    { label: "560078 JPNagar Banglore" },
    { label: "570004 Chamundi Extn Mysore" },
    { label: "560041 Jayanagar Banglore" },
    { label: "560041 Jayanagar Manglore" },
    { label: "572101 Tumkur" },
    { label: "563135 Kolar" },
    { label: "577428 Belgavi" }
  ];
  const [allFormData, setallFormData] = useState([]);
  const [formData, setformData] = useState({
    fName: "",
    lName: "",
    dob: null,
    age: "",
    emailId: "",
    phNo: "",
    address: "",
  });

  const [errorData, setErrorData] = useState({
    fName: "",
    lName: "",
    dob: null,
    age: "",
    emailId: "",
    phNo: "",
    address: "",
  });

  const getFormData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/form/getAllFormData"
      );
      setallFormData(response.data.data);
    } catch (err) {
      console.log("error while getting the api", err);
    }
  };

  useEffect(() => {
    getFormData();
  }, []);

  let errObj = {
    fName: "",
    lName: "",
    dob: null,
    age: "",
    emailId: "",
    phNo: "",
    address: "",
  };

  const validateFormData = () => {
    let errorInForm = false;

    if (!formData.fName) {
      errObj.fName = "*This field is required";
      errorInForm = true;
    }
    if (formData.fName) {
      let regex = /^[A-Za-z0-9 ]*$/;
      if (regex.test(formData.fName)) {
        errObj.fName = "";
        errorInForm = true;
      } else {
        errObj.fName = "*Invalid Field";
        errorInForm = false;
      }
    }

    if (!formData.lName) {
      errObj.lName = "*This field is required";
      errorInForm = true;
    }
    if (formData.lName) {
      let regex = /^[a-zA-Z ]{1,30}$/;
      if (regex.test(formData.lName)) {
        errObj.lName = "";
        errorInForm = true;
      } else {
        errObj.lName = "*Invalid Field";
        errorInForm = false;
      }
    }

    if (!formData.dob) {
      errObj.dob = "*This field is required";
      errorInForm = true;
    } else {
      errObj.dob = "";
      errorInForm = true;
    }

    if (!formData.age) {
      errObj.age = "*This field is required";
      errorInForm = true;
    }

    if (!formData.emailId) {
      errObj.emailId = "*This field is required";
      errorInForm = true;
    }
    if (formData.emailId) {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regex.test(formData.emailId)) {
        errObj.emailId = "";
        errorInForm = true;
      } else {
        errObj.emailId = "*Invalid field";
        errorInForm = true;
      }
    }

    if (!formData.phNo) {
      errObj.phNo = "*This field is required";
      errorInForm = true;
    }
    if (formData.phNo) {
      let regex = /^[0-9]*\d$/;
      if (regex.test(formData.phNo)) {
        errObj.phNo = "";
        errorInForm = true;
      } else {
        errObj.phNo = "*Invalid field";
        errorInForm = true;
      }
    }

    if (!formData.address) {
      errObj.address = "*This field is required";
      errorInForm = true;
    }
    if (formData.address) {
      let regex = /^[A-Za-z0-9 ]*$/;
      if (regex.test(formData.address)) {
        errObj.address = "";
        errorInForm = true;
      } else {
        errObj.address = "*Invalid Field";
        errorInForm = false;
      }
    }
    setErrorData({ ...errObj });
    return errorInForm;
  };

  const updateChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    let errObj = { ...errorData };
    console.log(e.target.name, "cvg");

    if (e.target.name === "fName") {
      if (e.target.value) {
        let regex = /^[A-Za-z0-9 ]*$/;
        if (regex.test(e.target.value)) {
          errObj.fName = "";
        } else {
          errObj.fName = "*Invalid Field";
        }
      } else {
        errObj.fName = "*This field is required";
      }
    }

    if (e.target.name === "lName") {
      if (e.target.value) {
        let regex = /^[a-zA-Z ]{1,30}$/;
        if (regex.test(e.target.value)) {
          errObj.lName = "";
        } else {
          errObj.lName = "*Invalid Field";
        }
      } else {
        errObj.lName = "*This field is required";
      }
    }

    if (e.target.value) {
      errObj.dob = "";
    } else {
      errObj.dob = "Invalid field";
    }

    if (e.target.name === "emailId") {
      if (e.target.value) {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regex.test(e.target.value)) {
          errObj.emailId = "";
        } else {
          errObj.emailId = "*Invalid Field";
        }
      } else {
        errObj.emailId = "This field is required";
      }
    }

    if (e.target.name === "phNo") {
      if (e.target.value) {
        let regex = /^[0-9]*\d$/;
        if (regex.test(e.target.value)) {
          errObj.phNo = "";
        } else {
          errObj.phNo = "*Invalid Field";
        }
      } else {
        errObj.phNo = "This field is required";
      }
    }

    if (e.target.name === "address") {
      if (e.target.value) {
        let regex = /^[A-Za-z0-9 ]*$/;
        if (regex.test(e.target.value)) {
          errObj.address = "";
        } else {
          errObj.address = "*Invalid Field";
        }
      } else {
        errObj.address = "This field is required";
      }
    }
    setErrorData({ ...errObj });
  };

  let postData = async () => {
    try {
      let res = await axios.post(
        "http://localhost:8000/form/addFormData",
        formData
      );
      getFormData();
    } catch (err) {
      console.log(err);
    }
  };

  const Submit = async () => {
    let formDataError = validateFormData();
    if (formDataError) {
      postData();
    }
  };

  const commonStyles = {
    bgcolor: "background.paper",
    m: 1,
    bordercolor: "red",
    height: "0.48rem",
  };

  const [value, setValue] = useState(null);

  const getDobDate = (newValue, value) => {
    console.log("val", value);
    let date = new Date(newValue);
    console.log("date", date);
    setValue(newValue);
    setformData({
      ...formData,
      dob: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      className="d-flex"
      sx={{
        flexWrap: "wrap",
        "& > :not(style)": {
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Grid lg={6} sm={6} md={6} className="d-flex">
        <Paper elevation={10} className="ms-3 mt-2 w-50">
          <form onSubmit={handleSubmit}>
            <Grid>
              <Typography
                sx={{ width: 500 }}
                style={{ fontSize: 25, fontWeight: "bold" }}
                className="mt-5"
              >
                User Form
              </Typography>
            </Grid>
          </form>

          <Grid
            container
            direction="column"
            className="mb-4 justify-content-center align-items-center "
            columns={{ sm: 12, md: 6, lg: 6 }}
          >
            <Grid item sm={12} md={6} className="pt-2">
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
                className="d-flex justify-content-center"
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
                className="d-flex justify-content-center"
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
                  mask="dd/mm/yyyy"
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
                className="d-flex justify-content-center"
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
                className="d-flex justify-content-center"
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
                className=" d-flex justify-content-center"
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

            <Grid item sm={12} md={6}>
              <Button
                variant="contained"
                className="m-4 w-100 d-flex justify-content-center"
                onClick={() => Submit()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid lg={6} sm={6} md={6} className="ms-1 mt-2 w-50">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
            width="700px"
            height="100%"
            frameborder="0"
            style={{ border: "0" }}
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </Grid>
      </Grid>
      <Grid container>
        <FormTable allFormData={allFormData} getFormData={getFormData} />
      </Grid>
    </Box>
  );
}

export default DataForm;
