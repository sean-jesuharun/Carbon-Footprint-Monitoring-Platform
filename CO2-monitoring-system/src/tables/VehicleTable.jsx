import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material'; 
import { styled } from '@mui/system';
import axios from 'axios';


// Create a styled component for the column headers
const StyledColumnHeader = styled('div')(({ theme, darkMode }) => ({
  color: darkMode ? 'red' : '#fff',
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#1b263b',
    color: '#caf0f8',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#778da9',
    color: '#caf0f8',
  },
  '& .MuiInputLabel-root': {
    color: '#1b263b',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1b263b',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: '#fff',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  color: '#fff',
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  color: '#fff',
}));

const BlueIconButton = styled(IconButton)({
  color: 'blue',
});

const GreenIconButton = styled(IconButton)({
  color: 'green',
});

const RedIconButton = styled(IconButton)({
  color: 'red',
});

export default function Vehicletable({ darkMode }) {
  const [rows, setRows] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewRow, setViewRow] = useState({});


  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8040/vehicles');
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'model', headerName: 'Model', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'engineSize', headerName: 'Engine Size', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'cylinders', headerName: 'No of Cylinders', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'transmission', headerName: 'Transmission', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'fuelType', headerName: 'Fuel Type', width: 180, headerAlign: 'center', align: 'center' },
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
          <BlueIconButton onClick={() => handleView(params.id)}><Visibility /></BlueIconButton>
          <GreenIconButton onClick={() => handleEdit(params.id)}><Edit /></GreenIconButton>
          <RedIconButton onClick={() => handleDeleteConfirmation(params.id)}><Delete /></RedIconButton>
        </div>
      ),
    },
  ];

  const handleView = (id) => {
    const rowToView = rows.find((row) => row.id === id);
    setViewRow(rowToView);
    setViewDialogOpen(true);
  };

  const handleEdit = (id) => {
    const rowToEdit = rows.find((row) => row.id === id);
    setCurrentRow(rowToEdit);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    setCurrentRow({ ...currentRow, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:8040/vehicles/${currentRow.id}`, currentRow);
      setRows((prevRows) => prevRows.map((row) => (row.id === currentRow.id ? currentRow : row)));
      setEditDialogOpen(false);
      setCurrentRow({});
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    // Show the delete confirmation dialog
    setDeleteConfirmation(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      console.log(`Attempting to delete row with id ${deleteId}`);
      // Make an API call to delete the data from the server
      await axios.delete(`http://localhost:8040/vehicles/${deleteId}`);
      console.log(`Delete successful for row with id ${deleteId}`);
      // Update the state to remove the row
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    // Close the delete confirmation dialog
    setDeleteConfirmation(false);
    setDeleteId(null);
  };

  const handleCloseDeleteConfirmation = () => {
    // Close the delete confirmation dialog without deleting
    setDeleteConfirmation(false);
    setDeleteId(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentRow({});
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setViewRow({});
  };

  return (
    <Paper elevation={5} >
      <div style={{ height: 600, width: '100%', marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>

      <StyledDialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <StyledDialogTitle>Confirmation</StyledDialogTitle>
        <StyledDialogContent>
          Are you sure you want to delete this row?
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDeleteConfirmation} sx={{color:'#caf0f8'}}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </StyledDialogActions>
      </StyledDialog>
      <StyledDialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Vehicle</DialogTitle>
        <DialogContent>
          <StyledTextField
            margin="dense"
            label="Model"
            name="model"
            value={currentRow.model || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Engine Size"
            name="engineSize"
            value={currentRow.engineSize || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="No of Cylinders"
            name="cylinders"
            value={currentRow.cylinders || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Vehicle Type"
            name="vehicleType"
            value={currentRow.vehicleType || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Transmission"
            name="transmission"
            value={currentRow.transmission || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Fuel Type"
            name="fuelType"
            value={currentRow.fuelType || ''}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} sx={{ color:'#caf0f8','&:hover': {
            backgroundColor: '#778da9',
          }}}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{color:'#fff',backgroundColor:'#1b263b', '&:hover': {
            backgroundColor: '#778da9',
          }}} >Save</Button>
        </DialogActions>
      </StyledDialog>

      <StyledDialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
        <StyledDialogTitle>View Vehicle</StyledDialogTitle>
        <StyledDialogContent>
          <StyledTextField
            margin="dense"
            label="Model"
            name="model"
            value={viewRow.model || ''}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <StyledTextField
            margin="dense"
            label="Engine Size"
            name="engineSize"
            value={viewRow.engineSize || ''}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <StyledTextField
            margin="dense"
            label="No of Cylinders"
            name="cylinders"
            value={viewRow.cylinders || ''}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <StyledTextField
            margin="dense"
            label="Vehicle Type"
            name="vehicleType"
            value={viewRow.vehicleType || ''}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <StyledTextField
            margin="dense"
            label="Transmission"
            name="transmission"
            value={viewRow.transmission || ''}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <StyledTextField
            margin="dense"
            label="Fuel Type"
            name="fuelType"
            value={viewRow.fuelType || ''}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </StyledDialogActions>
      </StyledDialog>
    </Paper>
  );
}
