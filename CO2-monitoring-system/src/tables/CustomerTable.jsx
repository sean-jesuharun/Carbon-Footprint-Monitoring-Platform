import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material'; // Import icons for actions
import {Paper}from '@mui/material';
import { useState,useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';



// Create a styled component for the column headers
const StyledColumnHeader = styled('div')(({ theme, darkMode }) => ({
  color: darkMode ? 'red' : '#fff',
}));



export default function Customertable({ darkMode }) {
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8060/customers');
        setRows(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [columns] = useState([
    { field: 'customerName', headerName: 'Customer_name', width: 200,headerAlign: 'center', align: 'center' },
    { field: 'location', headerName: 'Customer_location', width: 150,headerAlign: 'center', align: 'center' },
    { field: 'distanceFromWarehouse', headerName: 'Distance_from_Sysco', width:250,headerAlign: 'center', align: 'center' },


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

  

  // const rows = [
  //   { id: 1, Customer_name: 'Kamal', Customer_location: 'ABC123', Distance_from_Sysco: 'Premier Gasoline'},
  //   { id: 2, Carbon_Emission_Job_Name: 'Vimal', Customer: 'XYZ456', Vehicle: 'Ethanol',  Products_Details: '8.75' },
  //   { id: 3, Carbon_Emission_Job_Name: '2024-04-27', Customer: 'DEF789', Vehicle: 'Regular Gasoline',  Products_Details: '14.25' },
  //   { id: 4, Carbon_Emission_Job_Name: '2024-04-26', Customer: 'GHI012', Vehicle: 'Diesel',  Products_Details: '11.36'},
  //   { id: 5, Carbon_Emission_Job_Name: '2024-04-25', Customer: 'JKL345', Vehicle: 'Premier Gasoline',  Products_Details: '9.26' },
  //   { id: 6, Carbon_Emission_Job_Name: '2024-04-24', Customer: 'MNO678', Vehicle: 'Regular Gasoline',  Products_Details: '10.56'},
  //   { id: 7, Carbon_Emission_Job_Name: '2024-04-23', Customer: 'PQR901', Vehicle: 'Diesel',  Products_Details: '55.78' },
  //   { id: 8, Carbon_Emission_Job_Name: '2024-04-22', Customer: 'STU234', Vehicle: 'Permier Gasoline',  Products_Details: '7.25' },
  //   { id: 9, Carbon_Emission_Job_Name: '2024-04-21', Customer: 'VWX567', Vehicle: 'Ethanol',  Products_Details: '125.1'},
  //   { id: 10, Carbon_Emission_Job_Name: '2024-04-20', Customer: 'YZA890', Vehicle: 'Diesel',  Products_Details: '17.8'},
  // ];
  

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