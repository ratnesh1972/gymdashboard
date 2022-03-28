//React Imports
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

//UI Imports
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomField from '../customfield/CustomField';
import CustomCard from "../customcard/CustomCard";
import CustomButton from '../custombutton/CustomButton';

//Action Imports
import { addTrainer, updateTrainer, clearCurrentTrainer } from "../../store/actions/trainersActions";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter valid phone no")
    .required("Phone no is required"),
  address: yup.string("Enter your address").required("Address is required"),
});

const TrainerForm = () => {
  const dispatch = useDispatch();
  const { current_trainer } = useSelector((store) => store.trainers);
  const [trainer, setTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (current_trainer !== null) {
      setTrainer({
        name: current_trainer.name,
        email: current_trainer.email,
        phone: current_trainer.phone,
        address: current_trainer.address,
      });
    } else {
      setTrainer({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [current_trainer]);

  const formik = useFormik({
    initialValues: trainer,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (current_trainer !== null) {
        dispatch(updateTrainer(values, current_trainer._id));
        dispatch(clearCurrentTrainer);
      } else {
        dispatch(addTrainer(values));
        formik.resetForm();
      }
    },
  });
  return (
    <CustomCard variant="outlined">
      <Typography variant="h6" pb="24px">Add New Trainer</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          rowSpacing={{ xs: 3 }}
        >
          <Grid item md={12} xs={12}>
            <CustomField
              variant="outlined"
              id="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <CustomField
              variant="outlined"
              id="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth

            />
          </Grid>
          <Grid item md={12} xs={12}>
            <CustomField
              variant="outlined"
              id="phone"
              name="phone"
              label="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              fullWidth

            />
          </Grid>
          <Grid item md={12} xs={12}>
            <CustomField
              variant="outlined"
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={
                formik.touched.address && Boolean(formik.errors.address)
              }
              helperText={formik.touched.address && formik.errors.address}
              fullWidth
              className="form-field"

            />
          </Grid>
          <Grid item md={12} xs={12}>
            <CustomButton
              variant="contained"
              color={current_trainer !== null ? "warning" : "primary"}
              type="submit"
              fullWidth
            >
              {current_trainer !== null ? "Update Trainer" : "Add Trainer"}
            </CustomButton>
            {current_trainer !== null && <CustomButton variant="outlined" color="secondary" sx={{ mt: "16px" }} onClick={() => dispatch(clearCurrentTrainer)} fullWidth>Cancle</CustomButton>}

          </Grid>
        </Grid>
      </form>
    </CustomCard>
  );
}

export default TrainerForm;
