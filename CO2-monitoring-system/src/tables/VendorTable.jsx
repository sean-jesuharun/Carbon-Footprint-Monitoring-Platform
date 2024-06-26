import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#1b263b',
    color: '#f1faee',
  },
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

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: '#fff',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  color: '#fff',
}));

export default function Vendortable({ darkMode, drawerOpen }) {
  const [rows, setRows] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewProducts, setViewProducts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8050/vendors');
        const data = response.data.map((vendor) => ({
          id: vendor.id,
          vendorName: vendor.vendorName,
          location: vendor.location,
          distanceFromWarehouse: vendor.distanceFromWarehouse,
          vendorProducts: vendor.vendorProducts.map(product => ({
            productName: product.productName,
            animalSpecies: product.productionMatrix.animalSpecies,
            commodity: product.productionMatrix.commodity,
            productionSystem: product.productionMatrix.productionSystem,
            region: product.productionMatrix.region
          }))
        }));
        setRows(data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'vendorName', headerName: 'Name', flex: 1, width: 200, headerAlign: 'center', align: 'center' },
    { field: 'location', headerName: 'Location', flex: 1, width: 150, headerAlign: 'center', align: 'center' },
    { field: 'distanceFromWarehouse', headerName: 'Distance From Warehouse', flex: 1, width: 180, headerAlign: 'center', align: 'center' },
    {
      field: 'vendorProducts',
      headerName: 'Products Details',
      flex: 1,
      width: 300,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Tooltip title="View Product Details" arrow placement="right">
          <Button
            style={{ backgroundColor: '#1b263b', color: '#caf0f8',flex:1 }}
            onClick={() => handleViewProducts(params.row.id)}
          >
            <BlueIconButton>  <Visibility/> </BlueIconButton>
            Product
          </Button>
        </Tooltip>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      width: 120,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <BlueIconButton onClick={() => handleView(params.row.id)} sx={{ padding: '5px' }}><Visibility /></BlueIconButton>
          <GreenIconButton onClick={() => handleEdit(params.row.id)} sx={{ padding: '5px' }} ><Edit /></GreenIconButton>
          <RedIconButton onClick={() => handleDeleteConfirmation(params.row.id)} sx={{ padding: '5px' }}><Delete /></RedIconButton>
        </div>
      ),
    },
  ];

  const handleViewProducts = (id) => {
    const rowToView = rows.find((row) => row.id === id);
    setViewProducts(rowToView ? rowToView.vendorProducts : []);
    setViewDialogOpen(true);
  };

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
      await axios.put(`http://localhost:8050/vendors/${currentRow.id}`, currentRow);
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
      await axios.delete(`http://localhost:8050/vendors/${deleteId}`);
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  

  return (
    <Paper elevation={5} style={{ padding: '0.5rem', marginLeft: drawerOpen ? 300 : 80, backgroundColor: '#caf0f8',marginRight:'1rem' }}>
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
        <DialogTitle sx={{ textAlign: 'center', color: '#caf0f8', fontWeight: 'bold' }}>Edit Vendor</DialogTitle>
        <DialogContent>
          <StyledTextField
            margin="dense"
            label="Vendor Name"
            name="vendorName"
            value={currentRow.vendorName || ''}
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
          <Button onClick={handleCloseEditDialog} sx={{ color: '#caf0f8', '&:hover': { backgroundColor: '#778da9', } }}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{ color: '#fff', backgroundColor: '#1b263b', '&:hover': { backgroundColor: '#778da9', } }}>Save</Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
        
        <DialogContent>
          {viewProducts.length > 0 ? (
            viewProducts.map((product, index) => (
              <div key={index}>
                <DialogTitle>View  Product Details</DialogTitle>
                <p><strong>Product Name:</strong> {product.productName}</p>
                <p><strong>Animal Species:</strong> {product.animalSpecies}</p>
                <p><strong>Commodity:</strong> {product.commodity}</p>
                <p><strong>Production System:</strong> {product.productionSystem}</p>
                <p><strong>Region:</strong> {product.region}</p>
                <hr />
              </div>
            ))
          ) : (
            <div>
              <DialogTitle>View Vendor Details</DialogTitle>
              <p><strong>Vendor Name:</strong> {currentRow.vendorName}</p>
              <p><strong>Location:</strong> {currentRow.location}</p>
              <p><strong>Distance From Warehouse:</strong> {currentRow.distanceFromWarehouse}</p>
            </div>
          )}
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseViewDialog} sx={{ color: '#caf0f8' }}>Close</Button>
        </StyledDialogActions>
      </StyledDialog>
    </Paper>
  );
}
