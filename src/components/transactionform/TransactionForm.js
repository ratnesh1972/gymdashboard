//React Imports
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

//UI Imports
import CustomCard from '../customcard/CustomCard';
import CustomButton from '../custombutton/CustomButton';
import CustomField from '../customfield/CustomField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

//Icon Imports

//Action Imports
import { fetchTrainers } from '../../store/actions/trainersActions';
import { addTransaction, updateTransaction, clearCurrentTransaction } from '../../store/actions/memberActions';

import { MenuItem, InputAdornment } from '@mui/material';



const validationSchema = yup.object({
    trainer: yup
        .string('Select trainer')
        .required('Trainer is required'),
    start_date: yup
        .date('Enter valid date')
        .required('Start date is required'),
    end_date: yup
        .date('Enter valid date')
        .required('End date is required'),
    package: yup
        .string('Select package')
        .required('Package is required'),
    slot: yup
        .string('Select slot')
        .required('Slot is required'),
    paid: yup
        .number('Enter valid paid fees')
        .required('Paid fees is required'),
    recived_by: yup
        .string('Enter name of recepient')
})

const TransactionForm = () => {
    const { id } = useParams();
    const { data } = useSelector(store => store.trainers);
    const { current_transaction } = useSelector(store => store.member);
    const dispatch = useDispatch();

    //create a variable with initial transaction values.
    const ini_transaction = {
        trainer: 'Self',
        start_date: '5/2/2022',
        end_date: '',
        package: '1',
        slot: '6AM - 7AM',
        paid: 0,
        recieved_by: '',
        recieved_date: ''
    }

    const [transaction, setTransaction] = useState({ ...ini_transaction });

    useEffect(() => {
        dispatch(fetchTrainers);

        if (current_transaction !== null) {
            setTransaction({
                trainer: current_transaction.trainer,
                start_date: new Date(current_transaction.start_date).toISOString().slice(0, 10),
                end_date: new Date(current_transaction.end_date).toISOString().slice(0, 10),
                package: current_transaction.package,
                slot: current_transaction.slot,
                paid: current_transaction.paid,
                recieved_by: current_transaction.recieved_by,
                recieved_date: current_transaction.recieved_date !== null ? new Date(current_transaction.recieved_date).toISOString().slice(0, 10) : ''
            })
        } else {
            setTransaction({ ...ini_transaction })
        }
        // eslint-disable-next-line
    }, [current_transaction]);

    //set up validation and initial values for form
    const formik = useFormik({
        initialValues: transaction,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const transaction = { member: id, ...values }

            if (current_transaction !== null) {
                dispatch(updateTransaction(transaction, current_transaction._id));
                dispatch(clearCurrentTransaction);
            } else {
                dispatch(addTransaction(transaction));
                formik.resetForm();
            }
        }
    });

    return (
        <CustomCard variant="outlined">
            <Typography variant="h6" pb="24px">Add New Transaction</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <CustomField
                            select
                            id="trainer"
                            name="trainer"
                            label="Trainer"
                            value={formik.values.trainer}
                            onChange={formik.handleChange}
                            error={formik.touched.trainer && Boolean(formik.errors.trainer)}
                            helperText={formik.touched.trainer && formik.errors.trainer}
                            fullWidth
                        >
                            <MenuItem value="Self">Self</MenuItem>
                            {data.map(trainer => <MenuItem value={trainer.name} key={trainer._id}>{trainer.name}</MenuItem>)}
                        </CustomField>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <CustomField
                            label="Start Date"
                            type="date"
                            variant="outlined"
                            id="start_date"
                            value={formik.values.start_date}
                            onChange={formik.handleChange}
                            error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                            helperText={formik.touched.start_date && formik.errors.start_date}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <CustomField
                            type="date"
                            label="End Date"
                            variant="outlined"
                            id="end_date"
                            value={formik.values.end_date}
                            onChange={formik.handleChange}
                            error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                            helperText={formik.touched.end_date && formik.errors.end_date}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <CustomField
                            select
                            name="package"
                            id="package"
                            label="Package"
                            value={formik.values.package}
                            onChange={formik.handleChange}
                            error={formik.touched.package && Boolean(formik.errors.package)}
                            helperText={formik.touched.package && formik.errors.package}
                            fullWidth
                        >
                            <MenuItem value="1">1 Month</MenuItem>
                            <MenuItem value="3">3 Months</MenuItem>
                            <MenuItem value="6">6 Months</MenuItem>
                            <MenuItem value="12">12 Months</MenuItem>
                        </CustomField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <CustomField
                            select
                            name="slot"
                            id="slot"
                            label="Time Slot"
                            value={formik.values.slot}
                            onChange={formik.handleChange}
                            error={formik.touched.slot && Boolean(formik.errors.slot)}
                            helperText={formik.touched.slot && formik.errors.slot}
                            fullWidth
                        >
                            <MenuItem value="6AM - 7AM">6AM - 7AM</MenuItem>
                            <MenuItem value="7AM - 8AM">7AM - 8AM</MenuItem>
                            <MenuItem value="8AM - 9AM">8AM - 9AM</MenuItem>
                            <MenuItem value="9AM - 10AM">9AM - 10AM</MenuItem>
                            <MenuItem value="10AM - 11AM">10AM - 11AM</MenuItem>
                            <MenuItem value="3PM - 5PM">3PM - 5PM</MenuItem>
                            <MenuItem value="5PM - 6PM">5PM - 6PM</MenuItem>
                            <MenuItem value="6PM - 7PM">6PM - 7PM</MenuItem>
                            <MenuItem value="7PM - 8PM">7PM - 8PM</MenuItem>
                            <MenuItem value="8PM - 9PM">8PM - 9PM</MenuItem>
                            <MenuItem value="9PM - 10PM">9PM - 10PM</MenuItem>
                        </CustomField>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <CustomField
                            type="number"
                            variant="outlined"
                            id="paid"
                            label="Paid"
                            value={formik.values.paid}
                            onChange={formik.handleChange}
                            error={formik.touched.paid && Boolean(formik.errors.paid)}
                            helperText={formik.touched.paid && formik.errors.paid}
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <CustomField
                            variant="outlined"
                            id="recieved_by"
                            label="Recived By"
                            value={formik.values.recieved_by}
                            onChange={formik.handleChange}
                            error={formik.touched.recieved_by && Boolean(formik.errors.recieved_by)}
                            helperText={formik.touched.recieved_by && formik.errors.recieved_by}
                            fullWidth
                        />
                    </Grid>
                    {formik.values.recieved_by !== '' &&
                        (<Grid item md={12} xs={12}>
                            <CustomField
                                type="date"
                                label="Recieved Date"
                                variant="outlined"
                                id="recieved_date"
                                value={formik.values.recieved_date}
                                onChange={formik.handleChange}
                                error={formik.touched.recieved_date && Boolean(formik.errors.recieved_date)}
                                helperText={formik.touched.recieved_date && formik.errors.recieved_date}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        </Grid>)
                    }
                    <Grid item md={12} xs={12}>
                        <CustomButton variant="contained" color={current_transaction !== null ? 'warning' : 'primary'} type="submit" fullWidth>{current_transaction !== null ? 'Update Transaction' : 'Add Transaction'}</CustomButton>
                        {current_transaction !== null && <CustomButton variant="outlined" color="secondary" sx={{ mt: "16px" }} onClick={() => dispatch(clearCurrentTransaction)} fullWidth>Cancle</CustomButton>}
                    </Grid>
                </Grid>
            </form>
        </CustomCard>
    )
}

export default TransactionForm;
