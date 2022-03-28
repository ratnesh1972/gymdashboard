//React Imports
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

//UI Imports
import CustomCard from '../customcard/CustomCard';
import CustomField from '../customfield/CustomField';
import CustomButton from '../custombutton/CustomButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

//Action Imports
import { addMember, clearCurrentMember, updateMember } from '../../store/actions/membersActions';

//Validation schema for our form.
const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    email: yup
        .string().email('Enter valid email')
        .required('Email is required'),
    phone: yup
        .string().matches(/^[0-9]{10}$/, 'Enter valid phone no')
        .required('Phone no is required'),
    address: yup
        .string('Enter your address')
        .required('Address is required'),
    weight: yup
        .number('Enter valid weight')
        .min(10, 'Enter valid weight')
        .required('Weight is required'),
    height: yup
        .number('Enter valid height')
        .min(50, 'Enter valid height')
        .required('Height is required'),
    age: yup
        .number('Enter valid age')
        .min(5, 'Enter valid age')
        .required('Age is required'),
    status: yup
        .string('Select status')
        .required('Status is required'),
    reference: yup
        .string('Enter reference')
})

const MemberForm = () => {
    const dispatch = useDispatch();
    const { current_member } = useSelector((store) => store.members);
    const emptyMember = {
        name: '',
        email: '',
        phone: '',
        address: '',
        weight: 0,
        height: 0,
        age: 0,
        status: 'Active',
        reference: ''
    }
    //create a member state to manage current member data.
    const [member, setMember] = useState({ ...emptyMember });

    useEffect(() => {
        //Assign values to member depending upon our current_member. If current_member is null then we will assign empty values to member.
        if (current_member === null) {
            setMember({ ...emptyMember });

        } else {
            setMember({
                name: current_member.name,
                email: current_member.email,
                phone: current_member.phone,
                address: current_member.address,
                weight: current_member.weight,
                height: current_member.height,
                age: current_member.age,
                status: current_member.status,
                reference: current_member.reference
            })
        }
        // eslint-disable-next-line
    }, [current_member]);

    //using useFormik hook we are setting initial values, validation schema and onsubmit function for our form.
    const formik = useFormik({
        initialValues: member,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (current_member !== null) {
                dispatch(updateMember(values, current_member._id));
                dispatch(clearCurrentMember);
            } else {
                dispatch(addMember(values));
            }
            formik.resetForm();
        }
    })

    return (
        <CustomCard variant="outlined">
            <Typography variant="h6" pb="24px">{current_member === null ? "Add New Member" : "Update Member"}</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
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
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <CustomField
                            type="number"
                            variant="outlined"
                            id="weight"
                            label="Weight"
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                            error={formik.touched.weight && Boolean(formik.errors.weight)}
                            helperText={formik.touched.weight && formik.errors.weight}
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">kg.</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <CustomField
                            type="number"
                            variant="outlined"
                            id="height"
                            label="Height"
                            value={formik.values.height}
                            onChange={formik.handleChange}
                            error={formik.touched.height && Boolean(formik.errors.height)}
                            helperText={formik.touched.height && formik.errors.height}
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Cm.</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <CustomField
                            type="number"
                            variant="outlined"
                            id="age"
                            label="Age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            error={formik.touched.age && Boolean(formik.errors.age)}
                            helperText={formik.touched.age && formik.errors.age}
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Years</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <CustomField
                            select={true}
                            id="status"
                            label="Status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}
                            fullWidth
                        >
                            <MenuItem key="Active" value="Active">
                                Active
                            </MenuItem>
                            <MenuItem key="Inactive" value="Inactive">
                                Inactive
                            </MenuItem>
                        </CustomField>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <CustomField
                            variant="outlined"
                            id="reference"
                            label="Reference"
                            value={formik.values.reference}
                            onChange={formik.handleChange}
                            error={formik.touched.reference && Boolean(formik.errors.reference)}
                            helperText={formik.touched.reference && formik.errors.reference}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <CustomButton variant="contained" color={current_member === null ? 'primary' : 'warning'} fullWidth type="submit">{current_member === null ? "Add Member" : "Update Member"}</CustomButton>
                        {current_member !== null && <CustomButton variant="outlined" color="secondary" fullWidth sx={{ mt: "16px" }} onClick={() => dispatch(clearCurrentMember)}>Cancle</CustomButton>}
                    </Grid>
                </Grid>
            </form>
        </CustomCard >
    )
}

export default MemberForm;
