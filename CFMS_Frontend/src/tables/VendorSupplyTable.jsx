import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery, useTheme, Snackbar, Alert,InputBase } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { styled ,alpha} from '@mui/system';
import axiosInstance from '../utils/axiosInstance';
import { v4 as uuidv4 } from 'uuid';
import SearchIcon from '@mui/icons-material/Search';

const RedIconButton = styled(IconButton)({
  color: '#E56464',
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#ffffff',
    color: 'black',
    border: '10px solid #D5E9E5',
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  color: '#fff',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '5rem',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex:1,
  color:'#198773'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#198773',
  backgroundColor:'#D1E6E4',
  marginBottom:'0.3rem',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '20%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  borderRadius:'0.5rem'
}));


export default function VendorSupplyTable({ darkMode, drawerOpen }) {
  const [rows, setRows] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/supplies');
      const dataWithIds = response.data.map((item) => ({
        ...item,
        id: uuidv4(),
      }));
      setRows(dataWithIds);
      setSnackbarSeverity('success');
      setSnackbarMessage('Supply data fetched successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      handleRequestError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      const rowToDelete = rows.find((row) => row.id === deleteId);
      if (!rowToDelete) {
        throw new Error('Row not found');
      }

      const { supplyId, productName } = rowToDelete;
      await axiosInstance.delete(`/supplies/${supplyId}/products/${encodeURIComponent(productName)}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));
      setSnackbarSeverity('success');
      setSnackbarMessage('Supply deleted successfully!');
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRows = rows.filter((row) =>
    (row.date && row.date.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (row.vendorId && row.vendorId.toString().includes(searchQuery)) ||
    (row.vehicleId && row.vehicleId.toString().includes(searchQuery)) ||
    (row.productName && row.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (row.quantity && row.quantity.toString().includes(searchQuery))
  );
  

  const columns = [
    { field: 'date', headerName: 'Date', flex: 1, width: 200, headerAlign: 'center', align: 'center' },
    { field: 'vendorId', headerName: 'Vendor Id', flex: 1, width: 150, headerAlign: 'center', align: 'center' },
    { field: 'vehicleId', headerName: 'Vehicle Id', flex: 1, width: 150, headerAlign: 'center', align: 'center' },
    { field: 'productName', headerName: 'Product', flex: 1, width: 130, headerAlign: 'center', align: 'center' },
    { field: 'quantity', headerName: 'Quantity', flex: 1, width: 130, headerAlign: 'center', align: 'center' },
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
          <RedIconButton onClick={() => handleDeleteConfirmation(params.id)} sx={{ padding: '5px' }}><Delete /></RedIconButton>
        </div>
      ),
    },
  ];

  return (
    <Paper
      elevation={5}
      style={{
        width: '80%',
        padding: '0.5rem',
        marginLeft: '10rem',
        backgroundColor: '#ffffff',
        marginRight: '1rem',
        border: '10px solid #D5E9E5',
        height:'auto'
      }}
    >
      {/* <div style={{ height: isMobile ? 400 : 600, width: '100%', marginTop: '10px', padding: '0.5rem' }}> */}
      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Quick Search"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Search>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: isMobile ? 5 : 10 },
            },
          }}
          autoHeight
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
      {/* </div> */}

      <StyledDialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this row?</DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDeleteConfirmation} sx={{ color: '#198773' }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </StyledDialogActions>
      </StyledDialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
