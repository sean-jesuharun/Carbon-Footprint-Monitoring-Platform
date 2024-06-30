import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery, useTheme } from '@mui/material';
import { Delete} from '@mui/icons-material';
import { styled } from '@mui/system';
import axiosInstance from '../utils/axiosInstance';
import { v4 as uuidv4 } from 'uuid';



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

export default function VendorSupplyTable({ darkMode, drawerOpen }) {
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/supplies');
        const dataWithIds = response.data.map((item) => ({
          ...item,
          id: uuidv4(), // Generate a unique UUID for each row
        }));
        setRows(dataWithIds);
        console.log(dataWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  const handleEdit = (id) => {
    const rowToEdit = rows.find((row) => row.id === id);
    setCurrentRow(rowToEdit || {}); // Ensure currentRow is set to an empty object if not found
    setEditDialogOpen(true);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      console.log(`Attempting to delete row with id ${deleteId}`);
      await axiosInstance.delete(`/supplies/${deleteId}`);
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



  return (
    <Paper elevation={5} style={{ width: '80%', padding: '0.5rem', marginLeft: '10rem', backgroundColor: '#ffffff', marginRight: '1rem', border: '10px solid #D5E9E5' }}>
      <div style={{ height: isMobile ? 400 : 600, width: '100%', marginTop: '10px', padding: '0.5rem' }}>
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

      <StyledDialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this row?</DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDeleteConfirmation} sx={{ color: '#198773' }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </StyledDialogActions>
      </StyledDialog>

      
    </Paper>
  );
}
