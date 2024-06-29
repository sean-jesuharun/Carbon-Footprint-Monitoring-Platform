import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

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

export default function CustomerTable({ darkMode, drawerOpen }) {
  const [rows, setRows] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
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
          <GreenIconButton onClick={() => handleEdit(params.id)} sx={{ padding: '5px' }}><Edit /></GreenIconButton>
          <RedIconButton onClick={() => handleDeleteConfirmation(params.id)} sx={{ padding: '5px' }}><Delete /></RedIconButton>
        </div>
      ),
    },
  ];

 

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

  
  return (
    <Paper elevation={5} style={{ width:'70%',padding:'0.5rem',marginLeft: '15rem', backgroundColor: '#ffffff',transition: 'margin-left 0.3s',marginRight:'1rem', border: '10px solid #D5E9E5' }}
    >
      <div style={{ height: isMobile ? 400 : 600, width: '100%', marginTop: '10px',padding:'0.5rem' }}>
        
      <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: isMobile ? 5 : 10 },
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
        <DialogTitle sx={{ textAlign: 'center', color: '#198773', fontWeight: 'bold' }}>Edit Customer</DialogTitle>
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
          <Button onClick={handleCloseEditDialog} sx={{ color: '#198773', '&:hover': { backgroundColor: '##D5E9E5'} }}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{ color: 'black', backgroundColor: '#D5E9E5', '&:hover': { backgroundColor: '#ffffff', } }}>Save</Button>
        </StyledDialogActions>
      </StyledDialog>

      
    </Paper>
  );
}
