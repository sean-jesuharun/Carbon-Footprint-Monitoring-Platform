import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';

// Create a styled component for the column headers
const StyledColumnHeader = styled('div')(({ theme, darkMode }) => ({
  color: darkMode ? 'red' : '#fff',
}));

export default function Dashboard({ darkMode }) {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedResults, setSelectedResults] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/evaluations');
        const data = response.data.map((job) => ({
          id: job.id,
          jobName: job.jobName,
          customerId: job.customerId,
          vehicleId: job.vehicleId,
          results: job.results
        }));
        setRows(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'jobName', headerName: 'Job Name', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'customerId', headerName: 'Customer id', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'vehicleId', headerName: 'Vehicle id', width: 130, headerAlign: 'center', align: 'center' },
    {
      field: 'results',
      headerName: 'Result',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleOpen(params.value)}>
          Details
        </Button>
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
  ];

  const handleOpen = (results) => {
    setSelectedResults(results);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          getRowClassName={() => 'custom-row'}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Evaluation Result Details</DialogTitle>
        <DialogContent>
          {selectedResults.map((result, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <strong>Product Name:</strong> {result.productName} <br />
              <strong>Quantity:</strong> {result.quantity} <br />
              <strong>Inbound CO2e:</strong> {result.inboundCo2e} <br />
              <strong>Outbound CO2e:</strong> {result.outboundCo2e} <br />
              <strong>Production CO2e:</strong> {result.productionCo2e}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
