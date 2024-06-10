import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material'; // Import icons for actions
import {Paper}from '@mui/material';
import { useState ,useEffect} from 'react';
import { styled } from '@mui/system';
import axios from 'axios';


// Create a styled component for the column headers
const StyledColumnHeader = styled('div')(({ theme, darkMode }) => ({
  color: darkMode ? 'red' : '#fff',
}));



export default function VendorSupplytable({ darkMode }) {

  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8050/vendors');
        setRows(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [columns] = useState([
    { field: 'vendorName', headerName: 'Vendor_name', width: 200,headerAlign: 'center', align: 'center' },
    { field: 'supplyDate', headerName: 'Vendor_location', width: 150,headerAlign: 'center', align: 'center' },
    { field: 'products', headerName: 'Distance_from_Sysco', width: 130,headerAlign: 'center', align: 'center' },
    
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      headerAlign: 'center', align: 'center',
      renderCell: (params) => (
        <div>
            <IconButton onClick={() => handleView(params.id)}><Visibility /></IconButton>
            <IconButton onClick={() => handleEdit(params.id)}><Edit /></IconButton>
            <IconButton onClick={() => handleDelete(params.id)}><Delete /></IconButton>
        </div>
    ),
    
  },
  ]);

  
const getRowClassName = (params) => 'custom-row';

const handleView = (id) => {
  // Handle view action
  console.log(`View clicked for row with id ${id}`);
};

const handleEdit = (id) => {
  // Handle edit action
  console.log(`Edit clicked for row with id ${id}`);
};

const handleDelete = (id) => {
  // Handle delete action
  console.log(`Delete clicked for row with id ${id}`);
};
 

  return (
    
    <Paper elevation={5} style={{ backgroundColor: darkMode ? 'black' : '#fff'}}>
    <div style={{  height: 600, width: '100%',marginTop: '10px' }}>
    <DataGrid
          rows={rows}
          columns={columns}
          style={{ color: darkMode ? 'green' : '#000' }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
    </div>
    </Paper>
    
    
  );
}