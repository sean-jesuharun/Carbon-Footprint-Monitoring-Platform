import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material'; 
import { styled } from '@mui/system';
import axios from 'axios';

// Create a styled component for the column headers
const StyledColumnHeader = styled('div')(({ theme, darkMode }) => ({
  color: darkMode ? 'red' : '#fff',
}));

export default function Vehicletable({ darkMode }) {
  const [rows, setRows] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleView(params.id)}><Visibility /></IconButton>
          <IconButton onClick={() => handleEdit(params.id)}><Edit /></IconButton>
          <IconButton onClick={() => handleDeleteConfirmation(params.id)}><Delete /></IconButton>
        </div>
      ),
    },
  ];

  const handleView = (id) => {
    // Handle view action
    console.log(`View clicked for row with id ${id}`);
  };

  const handleEdit = (id) => {
    // Handle edit action
    console.log(`Edit clicked for row with id ${id}`);
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

  return (
    <Paper elevation={5} >
      <div style={{ height: 600, width: '100%', marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
      //     style={{ backgroundColor:'#778da9',color:'black', 
      //       '&:hover': {
      //       color: 'red',
      //     }, 
      // }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        
        />
      </div>
      <Dialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this row?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

