import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';

const BlueIconButton = styled(IconButton)({
  color: 'blue',
});

const GreenIconButton = styled(IconButton)({
  color: 'green',
});

const RedIconButton = styled(IconButton)({
  color: 'red',
});

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


export default function VendorSupplytable({ darkMode,drawerOpen}) {
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/supplies');
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'Vendor Id', flex: 1, Width: 150, headerAlign: 'center', align: 'center' },
    { field: 'date', headerName: 'Date', flex: 1, Width: 200, headerAlign: 'center', align: 'center' },
    { field: 'productName', headerName: 'Product', flex: 1, Width: 130, headerAlign: 'center', align: 'center' },
    { field: 'quantity', headerName: 'Quantity', flex: 1, Width: 130, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      Width: 120,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <BlueIconButton onClick={() => handleView(params.id)} sx={{padding:'5px'}}><Visibility /></BlueIconButton>
          <GreenIconButton onClick={() => handleEdit(params.id)} sx={{padding:'5px'}}><Edit /></GreenIconButton>
          <RedIconButton onClick={() => handleDelete(params.id)} sx={{padding:'5px'}}><Delete /></RedIconButton>
        </div>
      ),
    },
  ];

  const handleView = (id) => {
    const rowToView = rows.find((row) => row.id === id);
    setCurrentRow(rowToView || {}); // Ensure currentRow is set to an empty object if not found
    setViewDialogOpen(true);
  };

  const handleEdit = (id) => {
    const rowToEdit = rows.find((row) => row.id === id);
    setCurrentRow(rowToEdit || {}); // Ensure currentRow is set to an empty object if not found
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    setCurrentRow({ ...currentRow, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:8070/supplies/${currentRow.id}`, currentRow);
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
      console.log(`Attempting to delete row with id ${deleteId}`);
      await axios.delete(`http://localhost:8070/supplies/${deleteId}`);
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

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentRow({});
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setViewProducts([]);
  };

  return (
    <Paper elevation={5} style={{ padding: '0.5rem',marginLeft: drawerOpen ? 300 : 80, backgroundColor: '#caf0f8',marginRight:'1rem' }}>
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
        <DialogContent>
          Are you sure you want to delete this row?
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDeleteConfirmation} sx={{ color: '#caf0f8' }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle sx={{ textAlign: 'center', color: '#caf0f8', fontWeight: 'bold' }}>Edit Supply</DialogTitle>
        <DialogContent>
          <StyledTextField
            margin="dense"
            label="Vendor ID"
            name="id"
            value={currentRow.id || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Date"
            name="date"
            value={currentRow.date || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <StyledTextField
            margin="dense"
            label="Product Name"
            name="productName"
            value={currentRow.productName || ''}
            onChange={handleEditChange}
            fullWidth
          />

           <StyledTextField
            margin="dense"
            label="Quantity"
            name="quantity"
            value={currentRow.quantity || ''}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseEditDialog} sx={{ color: '#caf0f8', '&:hover': { backgroundColor: '#778da9', } }}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{ color: '#fff', backgroundColor: '#1b263b', '&:hover': { backgroundColor: '#778da9', } }}>Save</Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={viewDialogOpen} onClose={handleCloseViewDialog} classes={{ paper: 'dialogPaper' }}>
        <DialogTitle className="dialogTitle">View Supply</DialogTitle>
        <DialogContent className="dialogContent">
          <p><strong>Vendor ID :</strong> {currentRow.id}</p>
          <p><strong>Date :</strong> {currentRow.date}</p>
          <p><strong>Product Name :</strong> {currentRow.productName}</p>
          <p><strong>Quantity :</strong>{currentRow.quantity}</p>
        </DialogContent>
        <StyledDialogActions className="dialogActions">
          <Button onClick={handleCloseViewDialog} className="buttonCancel">Close</Button>
        </StyledDialogActions>
      </StyledDialog>
    </Paper>
  );
}
