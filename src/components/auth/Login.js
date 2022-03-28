import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, TextField, Button, Container, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login, loadUser } from '../../store/actions/authActions';
import AlertBox from '../alertbox/AlertBox';

const validationSchema = yup.object({
    username: yup
        .string().email('Enter valid username')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
})


const Login = () => {

    const auth = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        dispatch(loadUser);
        if (auth.isLoggedIn) {
            navigate(from, { replace: true });
        }
        // eslint-disable-next-line 
    }, [auth])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(login(values));
            formik.resetForm();
        }
    });

    return (
        <Container sx={{ marginTop: '50px' }}>
            <AlertBox />
            <form onSubmit={formik.handleSubmit}>
                <Grid container>
                    <Grid item columns={{ xs: 12, md: 4 }} sx={{ margin: 'Auto' }}>
                        <Typography variant='h5' mb='16px' textAlign='center'>GYM DASHBOARD</Typography>
                        <TextField
                            variant="outlined"
                            type="text"
                            id="username"
                            label="Username"
                            fullWidth
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            sx={{ marginBottom: '16px' }}
                        />
                        <TextField
                            variant="outlined"
                            type="password"
                            id="password"
                            label="Password"
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{ marginBottom: '16px' }}
                        />
                        <Button variant="contained" color='primary' fullWidth type="submit">Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Login;
