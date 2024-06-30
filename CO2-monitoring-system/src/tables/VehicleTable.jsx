import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,useMediaQuery, useTheme  } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { styled } from '@mui/system';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#ffffff',
    color: 'black',
    border: '10px solid #D5E9E5',
  },
}));

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

const BlueIconButton = styled(IconButton)({
  color: '#ACCA8E',
});

const GreenIconButton = styled(IconButton)({
  color: '#D5E9E5',
});

const RedIconButton = styled(IconButton)({
  color: '#E56464',
});

export default function Vehicletable({ darkMode,drawerOpen }) {
  const [rows, setRows] = useState([]);
  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(5);
  // const [rowCount, setRowCount] = useState(0);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewRow, setViewRow] = useState({});

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/vehicles'); 
      
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: 'model', headerName: 'Model', flex:1,width: 200, headerAlign: 'center', align: 'center' },
    { field: 'engineSize', headerName: 'Engine Size',flex:1, width: 150, headerAlign: 'center', align: 'center' },
    { field: 'cylinders', headerName: 'No of Cylinders',flex:1, width: 130, headerAlign: 'center', align: 'center' },
    { field: 'vehicleType', headerName: 'Vehicle Type', flex:1,width: 180, headerAlign: 'center', align: 'center' },
    { field: 'transmission', headerName: 'Transmission',flex:1, width: 180, headerAlign: 'center', align: 'center' },
    { field: 'fuelType', headerName: 'Fuel Type', flex:1,width: 180, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex:1,
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
      await axiosInstance.put(`/vehicles/${currentRow.id}`, currentRow);
      setRows((prevRows) => prevRows.map((row) => (row.id === currentRow.id ? currentRow : row)));
      setEditDialogOpen(false);
      setCurrentRow({});
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/vehicles/${deleteId}`);
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

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentRow({});
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setViewRow({});
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={5} style={{ width:'80%',padding: '0.5rem',marginLeft:'10rem', backgroundColor: '#ffffff',marginRight:'1rem', border: '10px solid #D5E9E5' }}>
      <div style={{ height: isMobile ? 400 : 600, width: '100%', marginTop: '10px',padding:'0.5rem' }}>
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
            padding:'1rem',
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

      <StyledDialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this row?</DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDeleteConfirmation} sx={{ color: '#198773' }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle sx={{ textAlign: 'center', color: '#198773', fontWeight: 'bold' }}>Edit Vehicle</DialogTitle>
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
        <StyledDialogActions>
          <Button onClick={handleCloseEditDialog} sx={{ color: '#198773', '&:hover': { backgroundColor: '##D5E9E5'} }}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{ color: 'black', backgroundColor: '#D5E9E5', '&:hover': { backgroundColor: '#ffffff', } }}>Save</Button>
        </StyledDialogActions>
      </StyledDialog>

        <StyledDialog open={viewDialogOpen} onClose={handleCloseViewDialog} classes={{ paper: 'dialogPaper' }}>
                <DialogTitle sx={{ textAlign: 'center', color: '#198773', fontWeight: 'bold' }}>View Vehicle</DialogTitle>
                <DialogContent className="dialogContent">
                  <p><strong>Model :</strong> {viewRow.model}</p>
                  <p><strong>Engine Size :</strong> {viewRow.engineSize}</p>
                  <p><strong>No Of Cylinders :</strong> {viewRow.cylinders}</p>
                  <p><strong>Vehicle Type :</strong>{viewRow.vehicleType}</p>
                  <p><strong>Transmission :</strong>{viewRow.transmission}</p>
                  <p><strong>Fuel Type :</strong>{viewRow.fuelType}</p>

                </DialogContent>
                <StyledDialogActions className="dialogActions">
                  <Button onClick={handleCloseViewDialog} sx={{color:'#198773'}}>Close</Button>
                </StyledDialogActions>
              </StyledDialog>
    </Paper>
  );
}
