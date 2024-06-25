import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

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

export default function CustomerTable({ darkMode, drawerOpen }) {
  const [rows, setRows] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewRow, setViewRow] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8060/customers');
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'customerName', headerName: 'Name', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
    { field: 'location', headerName: 'Location', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
    { field: 'distanceFromWarehouse', headerName: 'Distance From Warehouse', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center', align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div >
          <BlueIconButton onClick={() => handleView(params.id)} sx={{ padding: '5px' }}><Visibility /></BlueIconButton>
          <GreenIconButton onClick={() => handleEdit(params.id)} sx={{ padding: '5px' }}><Edit /></GreenIconButton>
          <RedIconButton onClick={() => handleDeleteConfirmation(params.id)} sx={{ padding: '5px' }}><Delete /></RedIconButton>
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
      await axios.put(`http://localhost:8060/customers/${currentRow.id}`, currentRow);
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
      await axios.delete(`http://localhost:8060/customers/${deleteId}`);
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

  return (
    <Paper elevation={5} style={{ padding: '0.5rem', marginLeft: drawerOpen ? 300 : 80, transition: 'margin-left 0.3s', marginRight: '1rem', backgroundColor: '#caf0f8' }}>
      <div style={{ height: isMobile ? 400 : 600, width: '100%', marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: isMobile ? 5 : 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>

      <StyledDialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this row?</DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDeleteConfirmation} sx={{ color: '#caf0f8', '&:hover': { backgroundColor: '#778da9' } }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <StyledTextField
            margin="dense"
            label="Customer Name"
            name="customerName"
            value={currentRow.customerName || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Location"
            name="location"
            value={currentRow.location || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Distance From Warehouse"
            name="distanceFromWarehouse"
            value={currentRow.distanceFromWarehouse || ''}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseEditDialog} sx={{ color: '#caf0f8', '&:hover': { backgroundColor: '#778da9' } }}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{ color: '#fff', backgroundColor: '#1b263b', '&:hover': { backgroundColor: '#778da9' } }}>Save</Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>View Customer</DialogTitle>
        <DialogContent>
          <p><strong>Customer Name:</strong> {viewRow.customerName}</p>
          <p><strong>Location:</strong> {viewRow.location}</p>
          <p><strong>Distance From Warehouse:</strong> {viewRow.distanceFromWarehouse}</p>
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseViewDialog} sx={{ color: '#caf0f8' }}>Close</Button>
        </StyledDialogActions>
      </StyledDialog>
    </Paper>
  );
}
