import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material'; 
import { useState } from 'react';
import { styled } from '@mui/system';

// Create a styled component for the column headers
const StyledColumnHeader = styled('div')(({ theme, darkMode }) => ({
  color: darkMode ? 'red' : '#fff',
}));

export default function Vehicletable({ darkMode }) {
  const [columns] = useState([
    { field: 'Vehicle_model', headerName: 'Vehicle_model', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'Engine_size', headerName: 'Engine_size', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'Number_of_cylinders', headerName: 'Number_of_cylinders', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'Vehicle_type', headerName: 'Vehicle_type', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'Transmission', headerName: 'Transmission', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'Capacity', headerName: 'Capacity', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'Fuel_type', headerName: 'Fuel_type', width: 180, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleView(params.id)}><Visibility /></IconButton>
          <IconButton onClick={() => handleEdit(params.id)}><Edit /></IconButton>
          <IconButton onClick={() => handleDelete(params.id)}><Delete /></IconButton>
        </div>
      ),
    },
  ]);

  const rows = [
    { id: 1, Vehicle_model: 'Kamal', Engine_size: 'ABC123', Number_of_cylinders: 'Premier Gasoline', Vehicle_type: '10.25', Transmission: 'Inbound', Capacity: '10.25', Fuel_type: 'Diesel' },
    { id: 2, Vehicle_model: 'Amal', Engine_size: 'DEF456', Number_of_cylinders: 'Standard Gasoline', Vehicle_type: '11.5', Transmission: 'Outbound', Capacity: '12.5', Fuel_type: 'Petrol' },
    { id: 3, Vehicle_model: 'Jamal', Engine_size: 'GHI789', Number_of_cylinders: 'Superior Gasoline', Vehicle_type: '9.75', Transmission: 'Inbound', Capacity: '9.75', Fuel_type: 'Diesel' },
    { id: 4, Vehicle_model: 'Namal', Engine_size: 'JKL012', Number_of_cylinders: 'Economic Gasoline', Vehicle_type: '8.5', Transmission: 'Outbound', Capacity: '8.5', Fuel_type: 'Petrol' },
    // Add more rows with unique ids as needed
  ];

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
    <Paper elevation={5} style={{ backgroundColor: darkMode ? 'black' : '#fff' }}>
      <div style={{ height: 600, width: '100%', marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns.map((column) => ({
            ...column,
            headerClassName: () => <StyledColumnHeader darkMode={darkMode}>{column.headerName}</StyledColumnHeader>,
          }))}
          style={{ color: darkMode ? 'green' : '#000' }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          getRowClassName={getRowClassName}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </Paper>
  );
}
