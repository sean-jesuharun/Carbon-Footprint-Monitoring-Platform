import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Visibility } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip, useMediaQuery, useTheme } from '@mui/material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#ffffff',
    color: 'black',
    border: '10px solid #D5E9E5',
  },
}));

const BlueIconButton = styled(IconButton)({
  color: '#ACCA8E',
});

const RedIconButton = styled(IconButton)({
  color: '#E56464',
});

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  color: '#fff',
}));

export default function Dashboard({ darkMode, drawerOpen }) {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedResults, setSelectedResults] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/evaluations');
        const data = response.data.map((job) => ({
          id: job.id,
          jobName: job.jobName,
          customerId: job.customerId,
          vehicleId: job.vehicleId,
          results: job.results,
        }));
        setRows(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'jobName', headerName: 'Job Name', width: 200, flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'customerId', headerName: 'Customer id', width: 150, flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'vehicleId', headerName: 'Vehicle id', width: 130, flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'results',
      headerName: 'Result',
      width: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button
          style={{
            backgroundColor: '#198773',
            color: '#ffffff',
            flex: 1,
            height: 32,
            width: 150,
            margin: '2px',
          }}
          onClick={() => handleOpen(params.value)}
        >
          <BlueIconButton>
            <Visibility />
          </BlueIconButton>
          Evaluation
        </Button>
      ),
    },
    {
      field: 'actions',
      headerName: 'Delete',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <RedIconButton onClick={() => handleDeleteConfirmation(params.id)} sx={{ padding: '5px' }}>
            <Delete />
          </RedIconButton>
        </div>
      ),
    },
  ];

  const handleOpen = (results) => {
    setSelectedResults(results);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      console.log(`Attempting to delete row with id ${deleteId}`);
      await axios.delete(`http://localhost:8070/evaluations/${deleteId}`);
      console.log(`Delete successful for row with id ${deleteId}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    setDeleteConfirmation(false);
    setDeleteId(null);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation(false);
    setDeleteId(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={5}
      style={{
        width: '80%',
        padding: '0.5rem',
        marginLeft: '10rem',
        backgroundColor: '#ffffff',
        transition: 'margin-left 0.3s',
        marginRight: '1rem',
        border: '10px solid #D5E9E5',
      }}
    >
      <div style={{ height: isMobile ? 400 : 600, width: '100%', marginTop: '10px', padding: '0.5rem' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            padding: '1rem',
            '& .MuiDataGrid-columnHeaders': {
              color: 'black',
              fontSize: '1rem',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#D1E6E4',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#D1E6E4',
            },
          }}
        />
      </div>

      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle>Evaluation Result Details</DialogTitle>
        <DialogContent>
          {selectedResults.map((result, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <strong>Product Name:</strong> {result.productName} <br />
              <strong>Quantity:</strong> {result.quantity} <br />
              <strong>Inbound CO2e:</strong> {result.inboundCo2e} <br />
              <strong>Outbound CO2e:</strong> {result.outboundCo2e} <br />
              <strong>Production CO2e:</strong> {result.productionCo2e}
            </div>
          ))}
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleClose} sx={{ color: '#198773' }}>
            Close
          </Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this row?</DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDeleteConfirmation} sx={{ color: '#198773' }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </StyledDialogActions>
      </StyledDialog>
    </Paper>
  );
}
