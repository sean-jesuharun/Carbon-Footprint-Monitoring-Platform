import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,useMediaQuery, useTheme  } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#1b263b',
    color: '#f1faee',
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
      const response = await axios.get('http://localhost:8040/vehicles'); 
      
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
      await axios.put(`http://localhost:8040/vehicles/${currentRow.id}`, currentRow);
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
      await axios.delete(`http://localhost:8040/vehicles/${deleteId}`);
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
    <Paper elevation={5} style={{ padding: '0.5rem',marginLeft: drawerOpen ? 300 : 80, backgroundColor: '#caf0f8',marginRight:'1rem' }}>
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

      <StyledDialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <StyledDialogTitle>Confirmation</StyledDialogTitle>
        <StyledDialogContent>Are you sure you want to delete this row?</StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDeleteConfirmation} sx={{ color: '#caf0f8' }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle sx={{ textAlign: 'center', color: '#caf0f8', fontWeight: 'bold' }}>Edit Vehicle</DialogTitle>
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
          <Button onClick={handleCloseEditDialog} sx={{ color: '#caf0f8', '&:hover': { backgroundColor: '#778da9', } }}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{ color: '#fff', backgroundColor: '#1b263b', '&:hover': { backgroundColor: '#778da9', } }}>Save</Button>
        </StyledDialogActions>
      </StyledDialog>

      {/* <StyledDialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle sx={{ textAlign: 'center', color: '#caf0f8', fontWeight: 'bold' }}>View Vehicle</DialogTitle>
        <DialogContent>
          <StyledTextField
            margin="dense"
            label="Model"
            name="model"
            value={viewRow.model || ''}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Engine Size"
            name="engineSize"
            value={viewRow.engineSize || ''}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="No of Cylinders"
            name="cylinders"
            value={viewRow.cylinders || ''}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Vehicle Type"
            name="vehicleType"
            value={viewRow.vehicleType || ''}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Transmission"
            name="transmission"
            value={viewRow.transmission || ''}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Fuel Type"
            name="fuelType"
            value={viewRow.fuelType || ''}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseViewDialog} sx={{ color: '#caf0f8' }}>Close</Button>
        </StyledDialogActions>
      </StyledDialog> */}

        <StyledDialog open={viewDialogOpen} onClose={handleCloseViewDialog} classes={{ paper: 'dialogPaper' }}>
                <DialogTitle className="dialogTitle">View Vehicle</DialogTitle>
                <DialogContent className="dialogContent">
                  <p><strong>Model :</strong> {viewRow.model}</p>
                  <p><strong>Engine Size :</strong> {viewRow.engineSize}</p>
                  <p><strong>No Of Cylinders :</strong> {viewRow.cylinders}</p>
                  <p><strong>Vehicle Type :</strong>{viewRow.vehicleType}</p>
                  <p><strong>Transmission :</strong>{viewRow.transmission}</p>
                  <p><strong>Fuel Type :</strong>{viewRow.fuelType}</p>

                </DialogContent>
                <StyledDialogActions className="dialogActions">
                  <Button onClick={handleCloseViewDialog} className="buttonCancel">Close</Button>
                </StyledDialogActions>
              </StyledDialog>
    </Paper>
  );
}
