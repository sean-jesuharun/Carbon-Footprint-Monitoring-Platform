import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete,  Visibility } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Tooltip, useMediaQuery, useTheme } from '@mui/material';


const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#1b263b',
    color: '#f1faee',
  },
}));

const BlueIconButton = styled(IconButton)({
  color: 'blue',
});


const RedIconButton = styled(IconButton)({
  color: 'red',
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#ffffff',
    color: 'black',
  },
  '& .MuiInputLabel-root': {
    color: '#1b263b',
    marginTop: '5px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  '& .MuiInputBase-input': {
    color: 'black',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  color: '#fff',
}));

export default function Dashboard({ darkMode,drawerOpen }) {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedResults, setSelectedResults] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentRow, setCurrentRow] = useState({});
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

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
          results: job.results
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
    { field: 'jobName', headerName: 'Job Name', width: 200, flex:1,headerAlign: 'center', align: 'center' },
    { field: 'customerId', headerName: 'Customer id', width: 150,flex:1, headerAlign: 'center', align: 'center' },
    { field: 'vehicleId', headerName: 'Vehicle id', width: 130, flex:1,headerAlign: 'center', align: 'center' },
    {
      field: 'results',
      headerName: 'Result',
      width: 200,
      flex:1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button 
        style={{ backgroundColor: '#1b263b', color: '#caf0f8',flex:1 }}
        onClick={() => handleOpen(params.value)}>
          <BlueIconButton>  <Visibility/> </BlueIconButton>
          Evaluation
        </Button>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <BlueIconButton onClick={() => handleView(params.id)} sx={{ padding: '5px' }}><Visibility /></BlueIconButton>
          <RedIconButton onClick={() => handleDelete(params.id)} sx={{ padding: '5px' }}><Delete /></RedIconButton>
        </div>
      )
    }
  ];

  const handleOpen = (results) => {
    setSelectedResults(results);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = (id) => {
    const rowToView = rows.find((row) => row.id === id);
    setCurrentRow(rowToView || {}); // Ensure currentRow is set to an empty object if not found
    setViewDialogOpen(true);
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


  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setViewProducts([]);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={5} style={{ padding:'0.5rem',marginLeft: drawerOpen ? 300 : 80, backgroundColor: '#caf0f8',transition: 'margin-left 0.3s',marginRight:'1rem' }}>
      <div style={{ height: isMobile ? 400 : 600, width: '100%', marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>

      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle> Evaluation Result Details</DialogTitle>
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
          <Button onClick={handleClose} sx={{color:'#caf0f8'}}>Close</Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this row?
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDeleteConfirmation} sx={{ color: '#caf0f8' }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>View Details</DialogTitle>
        <DialogContent>
          <p><strong>Job Name:</strong> {currentRow.jobName}</p>
          <p><strong>Customer ID:</strong> {currentRow.customerId}</p>
          <p><strong>Vehicle ID:</strong> {currentRow.vehicleId}</p>
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseViewDialog} sx={{ color: '#caf0f8' }}>Close</Button>
        </StyledDialogActions>
      </StyledDialog>
    </Paper>
  );
}
