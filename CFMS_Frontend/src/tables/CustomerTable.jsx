import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, useMediaQuery, useTheme, Snackbar, Alert,InputBase} from '@mui/material';
import { styled,alpha } from '@mui/system';
import axiosInstance from '../utils/axiosInstance';
import SearchIcon from '@mui/icons-material/Search';

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

const GreenIconButton = styled(IconButton)({
  color: '#D5E9E5',
});

const RedIconButton = styled(IconButton)({
  color: '#E56464',
});

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


export default function CustomerTable({ darkMode, drawerOpen }) {
  const [rows, setRows] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/customers');
      setRows(response.data);
      setSnackbarSeverity('success');
      setSnackbarMessage('Customer data fetched successfully!');
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
      await axiosInstance.put(`/customers/${currentRow.id}`, currentRow);
      setRows((prevRows) => prevRows.map((row) => (row.id === currentRow.id ? currentRow : row)));
      setEditDialogOpen(false);
      setCurrentRow({});
      setSnackbarSeverity('success');
      setSnackbarMessage('Customer details updated successfully!');
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
      await axiosInstance.delete(`/customers/${deleteId}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));
      setSnackbarSeverity('success');
      setSnackbarMessage('Customer deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      handleRequestError(error);
    }
    setDeleteConfirmation(false);
    setDeleteId(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentRow({});
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
    row.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.distanceFromWarehouse.toString().includes(searchQuery)
  );


  const columns = [
    { field: 'id', headerName: 'Customer Id', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
    { field: 'customerName', headerName: 'Name', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
    { field: 'location', headerName: 'Location', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
    { field: 'distanceFromWarehouse', headerName: 'Distance From Warehouse', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <GreenIconButton onClick={() => handleEdit(params.id)} sx={{ padding: '5px' }}><Edit /></GreenIconButton>
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
        transition: 'margin-left 0.3s',
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
          pageSizeOptions={[5, 10]}
          autoHeight
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
          <Button onClick={handleCloseEditDialog} sx={{ color: '#198773', '&:hover': { backgroundColor: '##D5E9E5' } }}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{ color: 'black', backgroundColor: '#D5E9E5', '&:hover': { backgroundColor: '#ffffff' } }}>Save</Button>
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
