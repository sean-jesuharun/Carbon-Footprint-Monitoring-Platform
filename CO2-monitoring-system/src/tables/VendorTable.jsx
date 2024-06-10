import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';

// Create a styled component for the column headers
const StyledColumnHeader = styled('div')(({ theme, darkMode }) => ({
  color: darkMode ? 'red' : '#fff',
}));

export default function Vendortable({ darkMode }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from API
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
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [columns] = useState([
    { field: 'vendorName', headerName: 'Name', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'location', headerName: 'Location', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'distanceFromWarehouse', headerName: 'Distance From Warehouse', width: 180, headerAlign: 'center', align: 'center' },
    {
      field: 'vendorProducts',
      headerName: 'Products Details',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Tooltip
          title={
            <div>
              {params.value.map((product, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                  <strong>Product Name:</strong> {product.productName} <br />
                  <strong>Species:</strong> {product.animalSpecies} <br />
                  <strong>Commodity:</strong> {product.commodity} <br />
                  <strong>Production System:</strong> {product.productionSystem} <br />
                  <strong>Region:</strong> {product.region}
                </div>
              ))}
            </div>
          }
          arrow
          placement="right"
        >
          <span>{params.value.map(product => product.productName).join(', ')}</span>
        </Tooltip>
      )
    },
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
      )
    }
  ]);

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
