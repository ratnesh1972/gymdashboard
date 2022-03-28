import React, { useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTrainers,
  setCurrentTrainer,
  deleteTrainer,
} from "../../store/actions/trainersActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomCard from "../customcard/CustomCard";

const TrainersTable = () => {
  const { data, loading } = useSelector((store) => store.trainers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrainers);
    // eslint-disable-next-line
  }, []);

  const handleTrainerEdit = (id) => {
    dispatch(setCurrentTrainer(id));
  };

  const handleTrainerDelete = (id) => {
    dispatch(deleteTrainer(id));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon color="warning" />}
          onClick={() => handleTrainerEdit(params.row._id)}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          onClick={() => handleTrainerDelete(params.row._id)}
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <CustomCard variant="outlined">
      <Typography variant="h6" pb="24px">Trainers</Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ overflow: "auto" }}>
          {loading ? (
            <Skeleton variant="rectangular" width="auto" />
          ) : (
              <DataGrid
                columns={columns}
                rows={data}
                getRowId={(row) => row._id}
                autoHeight
                components={{ Toolbar: GridToolbar }}
                sx={{ width: { xs: "1000px", md: "auto" } }}
              />
            )}
        </Box>
      </Box>
    </CustomCard>
  );
};
export default TrainersTable;
