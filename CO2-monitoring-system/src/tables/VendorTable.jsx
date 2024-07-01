import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { 
  IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Tooltip, Snackbar, Alert, useMediaQuery, useTheme, MenuItem 
} from '@mui/material';
import { Delete, Edit, Visibility, Add } from '@mui/icons-material';
import { styled } from '@mui/system';
import axiosInstance from '../utils/axiosInstance';

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

const GreenIconButton = styled(IconButton)({
  color: '#D5E9E5',
});

const RedIconButton = styled(IconButton)({
  color: '#E56464',
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

export default function Vendortable({ darkMode, drawerOpen }) {
  const [rows, setRows] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewProducts, setViewProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    productionMatrix: {
      region: '',
      animalSpecies: '',
      productionSystem: '',
      commodity: '',
    }
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/vendors');
      const data = response.data.map((vendor) => ({
        id: vendor.id,
        vendorName: vendor.vendorName,
        location: vendor.location,
        distanceFromWarehouse: vendor.distanceFromWarehouse,
        vendorProducts: vendor.vendorProducts.map((product) => ({
          productName: product.productName,
          animalSpecies: product.productionMatrix.animalSpecies,
          commodity: product.productionMatrix.commodity,
          productionSystem: product.productionMatrix.productionSystem,
          region: product.productionMatrix.region,
        })),
      }));
      setRows(data);
      setSnackbarSeverity('success');
      setSnackbarMessage('Data fetched successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleRequestError = (error, serviceName = null) => {
    let errorMessage = 'An error occurred while processing your request.';
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        errorMessage = error.response.data.errors.map((err) => err.message).join(', ');
      } else if (error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    }
    setSnackbarSeverity('error');
    setSnackbarMessage(serviceName ? `${serviceName}: ${errorMessage}` : errorMessage);
    setSnackbarOpen(true);
  };

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
            style={{ backgroundColor: '#198773', color: '#ffffff', flex: 1, height: 32, width: 150 }}
            onClick={() => handleViewProducts(params.row.id)}
          >
            <BlueIconButton><Visibility /></BlueIconButton>
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
          <GreenIconButton onClick={() => handleEdit(params.row.id)} sx={{ padding: '5px' }}><Edit /></GreenIconButton>
          <RedIconButton onClick={() => handleDeleteConfirmation(params.row.id)} sx={{ padding: '5px' }}><Delete /></RedIconButton>
        </div>
      ),
    },
  ];

  const handleViewProducts = (id) => {
    const rowToView = rows.find((row) => row.id === id);
    setCurrentRow(rowToView || {});
    setViewProducts(rowToView ? rowToView.vendorProducts : []);
    setViewDialogOpen(true);
  };

  const handleEdit = (id) => {
    const rowToEdit = rows.find((row) => row.id === id);
    setCurrentRow(rowToEdit || {});
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    setCurrentRow({ ...currentRow, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const { id, vendorName, location, distanceFromWarehouse } = currentRow || {};
      if (!id) {
        console.error('Cannot submit empty data.');
        return;
      }
      await axiosInstance.patch(`/vendors/${currentRow.id}`, {
        vendorName,
        location,
        distanceFromWarehouse,
      });
      setRows((prevRows) => prevRows.map((row) => (row.id === currentRow.id ? currentRow : row)));
      setEditDialogOpen(false);
      setCurrentRow({});
      setSnackbarSeverity('success');
      setSnackbarMessage('Vendor details updated successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/vendors/${deleteId}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));
      setSnackbarSeverity('success');
      setSnackbarMessage('Vendor deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      handleRequestError(error);
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddProductDialogOpen = () => {
    setAddProductDialogOpen(true);
  };

  const handleAddProductDialogClose = () => {
    setAddProductDialogOpen(false);
  };

  const handleAddProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name.includes('productionMatrix') ? 'productionMatrix' : name]: name.includes('productionMatrix') 
        ? { ...prevProduct.productionMatrix, [name.split('.')[1]]: value }
        : value,
    }));
  };

  const handleAddProductSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        `/vendors/${currentRow.id}/products`,
        newProduct
      );
      // Extract the added product from the response
      const addedProduct = response.data.vendorProducts.find(
        (product) => product.productName === newProduct.productName.toUpperCase()
      );
  
      // Construct a new object with specific properties
      const addedProductDetail = {
        productName: addedProduct.productName,
        animalSpecies: addedProduct.productionMatrix.animalSpecies,
        commodity: addedProduct.productionMatrix.commodity,
        productionSystem: addedProduct.productionMatrix.productionSystem,
        region: addedProduct.productionMatrix.region,
      };
  
      // Update viewProducts state directly to include the newly constructed product
      setViewProducts((prevProducts) => [...prevProducts, addedProductDetail]);
  
      // Update rows state to reflect the addition in the main table
      setRows((prevRows) =>
        prevRows.map((row) => {
          if (row.id === currentRow.id) {
            return {
              ...row,
              vendorProducts: [...row.vendorProducts, addedProductDetail],
            };
          }
          return row;
        })
      );
  
      setSnackbarSeverity('success');
      setSnackbarMessage('Product added successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      handleRequestError(error);
    }
  
    // Reset the newProduct state to initial values
    setNewProduct({
      productName: '',
      productionMatrix: {
        region: '',
        animalSpecies: '',
        productionSystem: '',
        commodity: '',
      }
    });
    setAddProductDialogOpen(false);
  };
  
  const handleDeleteProduct = async (productName) => {
    try {
      await axiosInstance.delete(`/vendors/${currentRow.id}/products/${productName}`);
      // Update viewProducts state directly to reflect the deletion
      setViewProducts((prevProducts) =>
        prevProducts.filter((product) => product.productName !== productName)
      );
      // Update rows state to reflect the deletion in the main table
      setRows((prevRows) =>
        prevRows.map((row) => {
          if (row.id === currentRow.id) {
            return {
              ...row,
              vendorProducts: row.vendorProducts.filter(
                (product) => product.productName !== productName
              ),
            };
          }
          return row;
        })
      );
      setSnackbarSeverity('success');
      setSnackbarMessage('Product deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      handleRequestError(error);
    }
  };

  return (
    <Paper elevation={5} style={{ width: '80%', padding: '0.5rem', marginLeft: '10rem', backgroundColor: '#ffffff', marginRight: '1rem', border: '10px solid #D5E9E5' }}>
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

      <StyledDialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Vendor</DialogTitle>
        <DialogContent>
          <StyledTextField
            label="Name"
            name="vendorName"
            value={currentRow.vendorName || ''}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <StyledTextField
            label="Location"
            name="location"
            value={currentRow.location || ''}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <StyledTextField
            label="Distance From Warehouse"
            name="distanceFromWarehouse"
            value={currentRow.distanceFromWarehouse || ''}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {viewProducts.map((product, index) => (
            <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
              <div><strong>Product Name:</strong> {product.productName}</div>
              <div><strong>Animal Species:</strong> {product.animalSpecies}</div>
              <div><strong>Commodity:</strong> {product.commodity}</div>
              <div><strong>Production System:</strong> {product.productionSystem}</div>
              <div><strong>Region:</strong> {product.region}</div>
              <IconButton onClick={() => handleDeleteProduct(product.productName)} color="error">
                <Delete />
              </IconButton>
            </div>
          ))}
          <Button onClick={handleAddProductDialogOpen} variant="contained" style={{backgroundColor:'#198773',color:'#ffffff'}}>
            Add Product
          </Button>
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </StyledDialogActions>
      </StyledDialog>

      <StyledDialog open={addProductDialogOpen} onClose={handleAddProductDialogClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <StyledTextField
            label="Product Name"
            name="productName"
            value={newProduct.productName}
            onChange={handleAddProductChange}
            fullWidth
            margin="dense"
          />
          <StyledTextField
            select
            label="Region"
            name="productionMatrix.region"
            value={newProduct.productionMatrix.region}
            onChange={handleAddProductChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="Global">Global</MenuItem>
            <MenuItem value="East Asia and Southeast Asia">East Asia and Southeast Asia</MenuItem>
            <MenuItem value="Eastern Europe">Eastern Europe</MenuItem>
            <MenuItem value="Latin America and the Caribbean">Latin America and the Caribbean</MenuItem>
            <MenuItem value="Near East and North Africa">Near East and North Africa</MenuItem>
            <MenuItem value="North America">North America</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
            <MenuItem value="Russian Federation">Russian Federation</MenuItem>
            <MenuItem value="South Asia">South Asia</MenuItem>
            <MenuItem value="Sub-Saharan Africa">Sub-Saharan Africa</MenuItem>
            <MenuItem value="Western Europe">Western Europe</MenuItem>
          </StyledTextField>
          <StyledTextField
            select
            label="Animal Species"
            name="productionMatrix.animalSpecies"
            value={newProduct.productionMatrix.animalSpecies}
            onChange={handleAddProductChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="Cattle">Cattle</MenuItem>
            <MenuItem value="Buffaloes">Buffaloes</MenuItem>
            <MenuItem value="Sheep">Sheep</MenuItem>
            <MenuItem value="Goats">Goats</MenuItem>
            <MenuItem value="Pigs">Pigs</MenuItem>
            <MenuItem value="Chicken">Chicken</MenuItem>
          </StyledTextField>
          <StyledTextField
            select
            label="Production System"
            name="productionMatrix.productionSystem"
            value={newProduct.productionMatrix.productionSystem}
            onChange={handleAddProductChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="Aggregated">Aggregated</MenuItem>
            <MenuItem value="Grassland systems">Grassland systems</MenuItem>
            <MenuItem value="Mixed systems">Mixed systems</MenuItem>
            <MenuItem value="Feedlots">Feedlots</MenuItem>
            <MenuItem value="Backyard systems">Backyard systems</MenuItem>
            <MenuItem value="Intermediate systems">Intermediate systems</MenuItem>
            <MenuItem value="Industrial systems">Industrial systems</MenuItem>
            <MenuItem value="Layers">Layers</MenuItem>
            <MenuItem value="Broilers">Broilers</MenuItem>
          </StyledTextField>
          <StyledTextField
            select
            label="Commodity"
            name="productionMatrix.commodity"
            value={newProduct.productionMatrix.commodity}
            onChange={handleAddProductChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="Aggregated">Aggregated</MenuItem>
            <MenuItem value="Milk">Milk</MenuItem>
            <MenuItem value="Meat">Meat</MenuItem>
            <MenuItem value="Eggs">Eggs</MenuItem>
          </StyledTextField>
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleAddProductDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProductSubmit} color="primary">
            Add
          </Button>
        </StyledDialogActions>
      </StyledDialog>

      <Dialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this vendor?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

