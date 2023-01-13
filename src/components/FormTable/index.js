import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import React, { useEffect, useState } from "react";
import EditFormData from "../EditFormData";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

function FormTable({ allFormData ,getFormData}) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  

  const deleteData = async (_id) => {
    try {
      let res = await axios.delete(
        `http://localhost:8000/form/deleteFormData/${_id}`
      );
      getFormData()

    } catch (err) {
      console.log(err);
    }
  };

  const editData = (val) => {
    setSelectedUser(val);
    setOpen(true);
  };

  return (
    <Box sx={{ width: "100%", px: 5, m: 1 }}>
      <TableContainer sx={{ justifyContent: "center", marginLeft: "0px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell align="center" sx={{fontWeight:"bold"}}>FirstName</TableCell>
              <TableCell align="center" sx={{fontWeight:"bold"}}>LastName</TableCell>
              <TableCell align="center" sx={{fontWeight:"bold"}}>Email ID</TableCell>
              <TableCell align="center" sx={{fontWeight:"bold"}}>Mobile No</TableCell>
              <TableCell align="center" sx={{fontWeight:"bold"}}>DOB</TableCell>
              <TableCell align="center"  sx={{fontWeight:"bold"}}>Age</TableCell>
              <TableCell align="center" sx={{fontWeight:"bold"}}>Address</TableCell>
              <TableCell align="center" sx={{fontWeight:"bold"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allFormData.map((val) => {
              return (
                <TableRow
                 
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{val.fName}</TableCell>
                  <TableCell align="center">{val.lName}</TableCell>
                  <TableCell align="center">{val.emailId}</TableCell>
                  <TableCell align="center">{val.phNo}</TableCell>
                  <TableCell align="center">{val.dob}</TableCell>
                  <TableCell align="center">{val.age}</TableCell>
                  <TableCell align="center">{val.address}</TableCell>
                  <TableCell align="center" sx={{justifyItems:"center"}}>
                    <ModeEditIcon sx={{color:"#107E32 "}} onClick={() =>{editData(val)}} />
                    <DeleteSweepIcon  sx={{color:"#EE4F0E",marginLeft:"20px"}} onClick={() => {deleteData(val._id);}}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <EditFormData
        open={open}
        setOpen={setOpen}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        getFormData={getFormData}
      />
    </Box>
  );
}

export default FormTable;


              