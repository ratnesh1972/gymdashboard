//React Imports
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//UI Imports
import CustomCard from "../customcard/CustomCard";
import DeleteModal from '../deletemodal/DeleteModal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";

//Icon Imports
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

//Action Imports
import { fetchMembers, setCurrentMember, deleteMember } from "../../store/actions/membersActions";
import { fetchNotifications } from "../../store/actions/notificationsActions";



const MembersTable = () => {
  const { data, loading } = useSelector((store) => store.members);
  const notifications = useSelector((store) => store.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state management for delete modal.
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  //set open to true once we click delete button.
  const openModal = (id) => {
    setId(id)
    setOpen(true);
  }

  //set open to false once we click ok or cancle button.
  const closeModal = () => {
    setId(null);
    setOpen(false)
  };

  //call dispatch for deletemember action from here.
  const handleDelete = () => {
    //Call dispatch on delete member action.
    dispatch(deleteMember(id));
    //Close opened modal.
    closeModal();
  }

  useEffect(() => {
    dispatch(fetchMembers);
    dispatch(fetchNotifications);
    // eslint-disable-next-line
  }, []);

  //check the payment status of member based upon notification list data.
  const checkStatus = (member_id) => {
    const data = notifications.data.filter(
      (transaction) => member_id === transaction.member._id
    );
    if (data.length) return true;
    return false;
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      renderCell: (params) => (
        <Link
          to={`/member/${params.row._id}`}
          style={{ textDecorationLine: "none", color: "inherit" }}
        >
          {params.value}
        </Link>
      ),
      flex: 1,
    },
    {
      field: "status",
      headerName: "Payment Status",
      renderCell: (params) => (
        <Chip
          label={checkStatus(params.row._id) ? "Pending" : "Paid"}
          size="small"
          color={checkStatus(params.row._id) ? "error" : "success"}
        />
      ),
      flex: 1,
    },
    {
      field: "reference",
      headerName: "Reference",
      flex: 1,
    },
    {
      field: "reg_date",
      headerName: "Reg Date",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<AccountBoxIcon color="info" />}
          onClick={() => navigate(`/member/${params.row._id}`)}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={<EditIcon color="warning" />}
          onClick={() => dispatch(setCurrentMember(params.row._id))}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          onClick={() => openModal(params.row._id)}
          label="Delete"
        />
      ],
    }
  ];

  return (
    <Box>
      <DeleteModal state={open} handleClose={closeModal} handleDelete={handleDelete} />
      <CustomCard variant="outlined">
        <Typography variant="h6" pb="24px">Members</Typography>
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
    </Box>
  );
};

export default MembersTable;
