import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useForm, Form } from "../../components/core/formControl/useForm";
import Input from "../../components/core/inputFeild";

import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
import ResponsiveAppBar from "../../components/layout/navbar/navbar";
import { Container } from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import axios from "../../axios";
import useNotification from "../../components/core/snakeBar";

const useStyles = makeStyles(
  () =>
    createStyles({
      Main: {
        backgroundColor: "#FFFFFF",
        margin: "0 auto",
      },
      MainDiv: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",

        minHeight: "100vh",
        height: "auto",
        width: "500px",
        margin: "0 auto",

        // backgroundColor: "#ccc",
      },
      Para: {
        color: "#4B0082",
        fontSize: "30px",
        fontFamily: "Poppins",
        fontWeight: "800",
        textAlign: "center",
        margin: "10px auto 90px",
      },
      Angor: { color: "#4B0082", textDecoration: "underline" },
      GoBack: {
        color: "#000000",
        fontFamily: "Poppins",
        fontSize: "30px",
        fontWeight: 400,
        paddingTop: "50px",
        textAlign: "center",
      },
    }),
  { withTheme: true }
);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DialogsEdit(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [SelectedImage, setSelectedImage] = useState(null);
  const [, sendNotification] = useNotification();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const { open, handleClickOpen, handleClose, data } = props;

  const initialFValues = {
    date: data ? data.date : "",
    time: data ? data.time : "|",
    crew: data ? data.crew : "|",
    serviseType: data ? data.serviseType : "|",
    payment: data ? data.payment : "|",
  };

  const validate = useCallback((fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 5 ? "" : "Minimum 6 characters required.";

    // console.log(values.password, values.Cpassword, "///");
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  });
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );
  const handleSend = async (e) => {
    e.preventDefault();
    handleSubmit();
    // handleClose();
  };
  const handleSubmit = (e) => {
    console.log(values);
    const json = {
      date: values.date,
      time: values.time,
      crew: values.crew,
      serviseType: values.serviseType,
      payment: values.payment,
      isComplete: Number(value),
    };
    axios
      .post(`booking`, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        sendNotification({ msg: "success", variant: "success" });
        window.location.href = "/bookings";
      })
      .catch((error) => {
        console.log("There was an error!", error.response);
        sendNotification({ msg: "success", variant: "success" });
      });
  };
  return (
    <div>
      <ResponsiveAppBar />
      <br />
      <Container>
        <Form className={classes.MainDiv} onSubmit={handleSubmit}>
          <Input
            name="date"
            label="Date"
            placeholder="date"
            value={values.date}
            type="date"
            onChange={handleInputChange}
          />
          <br />

          <Input
            name="time"
            label="Time"
            type="time"
            placeholder="time"
            value={values.time}
            onChange={handleInputChange}
            error={errors.time}
          />
          <br />

          <Input
            name="crew"
            type="crew"
            placeholder="crew"
            value={values.crew}
            onChange={handleInputChange}
            error={errors.crew}
            label="Crew"
          />
          <br />

          <Input
            name="serviseType"
            type="serviseType"
            placeholder="serviseType"
            value={values.serviseType}
            onChange={handleInputChange}
            error={errors.serviseType}
            label="Servise Type"
          />
          <br />
          <Input
            name="payment"
            type="payment"
            placeholder="payment"
            value={values.payment}
            onChange={handleInputChange}
            error={errors.payment}
            label="Payment"
          />
          <br />
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Complete
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value={1} control={<Radio />} label="YES" />
              <FormControlLabel value={0} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <br />
          <br />
          <Button onClick={handleSend}>Add</Button>
        </Form>
      </Container>
    </div>
  );
}
