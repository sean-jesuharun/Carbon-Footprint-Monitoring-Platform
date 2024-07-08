import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Visibility } from '@mui/icons-material';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert, useMediaQuery, useTheme, Box, Grid, Typography, Accordion, AccordionSummary, AccordionDetails,Divider, Select, MenuItem, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import axiosInstance from '../utils/axiosInstance';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, RadialBarChart, RadialBar, Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Label, ScatterChart, Scatter} from 'recharts';

const Statistics = ({ evaluations }) => {

  const toolTipStyles = {
    tooltipContainer: {
      backgroundColor: '#fff',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#333',
    },
    productName: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '8px',
      fontSize: '16px',
    },
    tooltipText: {
      margin: '4px 0',
    },
    tooltipValue: {
      fontWeight: 'bold',
      color: '#555',
    },
    totalEmission: {
      marginTop: '10px',
    },
    totalTitle: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
  };

  const [selectedProduct, setSelectedProduct] = useState('');

  // Data For Bar chart and Pie chart
  const productEmissions = evaluations.reduce((acc, evaluation) => {
    evaluation.results.forEach(result => {
      if (!acc[result.productName]) {
        acc[result.productName] = { inbound: 0, outbound: 0, production: 0, quantity: 0, total: 0 };
      }
      acc[result.productName].inbound += result.CO2eEmission.inbound;
      acc[result.productName].outbound += result.CO2eEmission.outbound;
      acc[result.productName].production += result.CO2eEmission.production;
      acc[result.productName].quantity += result.quantity;
      acc[result.productName].total += result.totalCO2eEmission;
    });
    return acc;
  }, {});

  const productGroupedData = Object.keys(productEmissions).map(productName => ({
    productName: productName,
    ...productEmissions[productName],
  }));

  const selectedProductData = productGroupedData.find(item => item.productName === selectedProduct);

  // Data for Scatter plot for every delivery product.
  const productData = evaluations.reduce((acc, evaluation) => {
    evaluation.results.forEach(result => {
      if (!acc[result.productName]) {
        acc[result.productName] = [];
      }
      acc[result.productName].push({
        quantity: result.quantity,
        emissionPerKg: parseFloat(result.CO2eEmissionPerKg),
        productName: result.productName,
        customerId: evaluation.customerId,
        vendorId: result.vendorId,
        totalCO2eEmission: result.totalCO2eEmission,
        inbound: result.CO2eEmission.inbound,
        outbound: result.CO2eEmission.outbound,
        production: result.CO2eEmission.production
      });
    });
    return acc;
  }, {});

  // Barchart custom tooltip
  const CustomBarChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip" style={toolTipStyles.tooltipContainer}>
          <p style={toolTipStyles.productName}>{`${label}`}</p>
          <p style={toolTipStyles.tooltipText}>quantity: <span style={toolTipStyles.tooltipValue}>{data.quantity} kg</span></p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ ...toolTipStyles.tooltipText, color: entry.color }}> {entry.name}: <span style={{...toolTipStyles.tooltipValue, color: entry.color}}> {entry.value.toFixed(2)} kg CO2e </span></p>
          ))}
        </div>
      );
    }
  
    return null;
  };

  // Scatter plot custom tooltip
  const CustomScatterPlotTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip" style={toolTipStyles.tooltipContainer}>
          <p style={toolTipStyles.productName}>{data.productName}</p>
          <p style={toolTipStyles.tooltipText}> Quantity: <span style={toolTipStyles.tooltipValue}>{data.quantity} kg</span></p>
          <p style={toolTipStyles.tooltipText}> Emission Per kg: <span style={toolTipStyles.tooltipValue}>{data.emissionPerKg} kgCO2e/kg</span></p>
          <p style={toolTipStyles.tooltipText}> Vendor ID: <span style={toolTipStyles.tooltipValue}>{data.vendorId}</span></p>
          <p style={toolTipStyles.tooltipText}> Customer ID: <span style={toolTipStyles.tooltipValue}>{data.customerId}</span></p>
          <div style={toolTipStyles.totalEmission}>
            <p style={toolTipStyles.totalTitle}>Total Emission: <span style={toolTipStyles.tooltipValue}>{data.totalCO2eEmission} kgCO2e</span></p>
            <p style={toolTipStyles.tooltipText}>
              Inbound: <span style={toolTipStyles.tooltipValue}>{data.inbound} kgCO2e</span>
            </p>
            <p style={toolTipStyles.tooltipText}>
              Outbound: <span style={toolTipStyles.tooltipValue}>{data.outbound} kgCO2e</span>
            </p>
            <p style={toolTipStyles.tooltipText}>
              Production: <span style={toolTipStyles.tooltipValue}>{data.production} kgCO2e</span>
            </p>
          </div>
        </div>
      );
    }
  
    return null;
  };

  const pieChartColors = ['#8884d8', '#82ca9d', '#ffc658'];
  // Get a random dark color for each product
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
    const saturation = Math.floor(Math.random() * 50) + 50; // Saturation between 50% and 100%
    const lightness = Math.floor(Math.random() * 40) + 20; // Lightness between 20% and 60%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  };

  return (
    <Box sx={{ width: '100%', padding: '1rem' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
        Emissions Statistics
      </Typography>
      
      <Grid container spacing={3}>

        <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ScatterChart
            width={900}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 10,
              left: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quantity" type="number" name="Quantity" unit="kg" />
            <YAxis dataKey="emissionPerKg" type="number" name="Emission Per kg" unit=" kgCO2e/kg" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterPlotTooltip />}/>
            <Legend />
            {Object.keys(productData).map(productName => (
              <Scatter key={productName} name={productName} data={productData[productName]} fill={getRandomColor()} />
            ))}
          </ScatterChart>
        </Grid>

        <Grid item xs={12} md={6}>

          <BarChart 
            width={600} 
            height={400} 
            margin={{
              top: 20,
              right: 20,
              bottom: 10,
              left: 10,
            }}
            data={productGroupedData} 
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="productName" />
            <YAxis unit=" kgCO2e" />
            <Tooltip content={<CustomBarChartTooltip />}/>
            <Legend />
            <Bar dataKey="inbound" fill="#8884d8" />
            <Bar dataKey="outbound" fill="#82ca9d" />
            <Bar dataKey="production" fill="#ffc658" />
            <Bar dataKey="total" fill="#ff7300" />
          </BarChart>

        </Grid>

        <Grid item xs={12} md={6}>

          <Grid container spacing={1} alignItems="center" justifyContent="center" style={{ height: '50vh' }}>
            
            <Grid item xs={12} sm={5} container direction="column" alignItems="center">
              {!selectedProduct && (
                <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
                  Select a Product to view Emission Detail
                </Typography>
              )}
              <Select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select Product
                </MenuItem>
                {productGroupedData.map((product, index) => (
                  <MenuItem key={index} value={product.productName}>
                    {product.productName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={7} container alignItems="center" justifyContent="center">
              {selectedProductData && (
                <PieChart width={400} height={400}>
                  <Pie
                    data={[
                      { name: 'inbound', value: parseFloat(selectedProductData.inbound.toFixed(2)) },
                      { name: 'outbound', value: parseFloat(selectedProductData.outbound.toFixed(2)) },
                      { name: 'production', value: parseFloat(selectedProductData.production.toFixed(2)) },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    fill="#8884d8"
                    label
                  >
                    {productGroupedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                    ))}
                    <Label value={selectedProduct} position="center" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </Grid>

          </Grid>

        </Grid>

        {/* <Grid item xs={12} md={6}>
          <LineChart width={600} height={400} data={productGroupedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="productName" />
            <YAxis
              label={{ value: 'kg CO2e', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              tick={{ dy: 10 }}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="inbound" stroke="#8884d8" />
            <Line type="monotone" dataKey="outbound" stroke="#82ca9d" />
            <Line type="monotone" dataKey="production" stroke="#ffc658" />
            <Line type="monotone" dataKey="total" stroke="#ff7300" />
          </LineChart>
        </Grid> */}

      </Grid>

    </Box>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#ffffff',
    color: 'black',
    // border: '10px solid #D5E9E5',
  },
}));

const BlueIconButton = styled(IconButton)({
  color: '#ACCA8E',
});

const RedIconButton = styled(IconButton)({
  color: '#E56464',
});

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  color: '#fff',
}));

export default function Dashboard({ darkMode, drawerOpen }) {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedResults, setSelectedResults] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/evaluations');
      const data = response.data.map((job) => ({
        id: job.id,
        jobName: job.jobName,
        customerId: job.customerId,
        vehicleId: job.vehicleId,
        results: job.results,
      }));
      setRows(data);
      setSnackbarSeverity('success');
      setSnackbarMessage('Evaluation data fetched successfully!');
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
      await axiosInstance.delete(`/evaluations/${deleteId}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));
      setSnackbarSeverity('success');
      setSnackbarMessage('Evaluation deleted successfully!');
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

  const handleOpen = (results) => {
    setSelectedResults(results);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: 'jobName', headerName: 'Job Name', width: 200, flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'customerId', headerName: 'Customer id', width: 150, flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'vehicleId', headerName: 'Vehicle id', width: 130, flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'results',
      headerName: 'Result',
      width: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button
          style={{
            backgroundColor: '#198773',
            color: '#ffffff',
            flex: 1,
            height: 32,
            width: 150,
            margin: '2px',
          }}
          onClick={() => handleOpen(params.value)}
        >
          <BlueIconButton>
            <Visibility />
          </BlueIconButton>
          Evaluation
        </Button>
      ),
    },
    {
      field: 'actions',
      headerName: 'Delete',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <RedIconButton onClick={() => handleDeleteConfirmation(params.id)} sx={{ padding: '5px' }}>
            <Delete />
          </RedIconButton>
        </div>
      ),
    },
  ];

  return (

    <React.Fragment>

      <Paper
        elevation={5}
        style={{
          width: '80%',
          padding: '0.5rem',
          marginLeft: '10rem',
          marginRight: '1rem',
          backgroundColor: '#ffffff',
          transition: 'margin-left 0.3s',
          border: '10px solid #D5E9E5',
          height: 'auto', // Ensures the height adjusts according to the content
        }}
      >
      {/* <div style={{ height: isMobile ? 400 : 600, width: '100%', marginTop: '10px', padding: '0.5rem' }}> */}
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
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

      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle
          variant='h4'
          sx={{
            backgroundColor: '#D1E6E4',
            color: '#5D6259',
            fontWeight: '1000',
            // width: '550px',
            textAlign: 'center',
            padding: '1rem',
            fontFamily: 'Inter',
          }}
        >
          Evaluation Details
        </DialogTitle>
        <Box sx={{ backgroundColor: 'white', padding: '0.5rem' }}>
          <DialogContent sx={{ margin: '0.5rem' }}>
            {selectedResults.map((result, index) => (
              <div key={index} style={{ marginBottom: '0.5rem' }}>
                <Paper elevation={6} style={{ backgroundColor: '#F5F7F8', marginBottom: '1rem', padding: '1rem' }}>
                  <Grid container spacing={2} alignItems="center" style={{ marginBottom: '0.5rem'}}>
                    <Grid item xs={12} sm={5}>
                      <Typography
                        variant="h5"
                        sx={{ textAlign: 'center', fontFamily: 'Inter', fontWeight: 'bold', marginBottom: '0.5rem' }}
                      >
                        {result.productName}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          backgroundColor: '#3f7b70',
                          color: '#ffffff',
                          padding: '8px',
                          borderRadius: '5px',
                          textAlign: 'center',
                          fontFamily: 'Inter',
                          fontWeight: 'bold',
                        }}
                      >
                        {result.CO2eEmissionPerKg} kg CO2e/kg
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <Divider orientation="vertical" sx={{ height: '100%', backgroundColor: '#198773', borderWidth: '1px' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div style={{ margin: '1rem 0', lineHeight: '2.5rem', fontSize: '16px', fontFamily: 'Hahmlet' }}>
                        <strong>Vendor ID</strong>{' '}
                        <span style={{ marginLeft: '5rem' }}>{result.vendorId}</span> <br />
                        <strong>Quantity</strong>{' '}
                        <span style={{ marginLeft: '5rem' }}>{result.quantity}</span> <br />
                      </div>
                    </Grid>
                  </Grid>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#dddddd' }}>
                      <Typography sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#5D6259' }}>
                        Total Emission: {result.totalCO2eEmission} kg CO2e
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div style={{ lineHeight: '2rem', fontFamily: 'Hahmlet', fontSize: '16px' }}>
                        <div>
                          <strong>Inbound: </strong> {result.CO2eEmission.inbound} kg CO2e
                        </div>
                        <div>
                          <strong>Outbound: </strong> {result.CO2eEmission.outbound} kg CO2e
                        </div>
                        <div>
                          <strong>Production: </strong> {result.CO2eEmission.production} kg CO2e
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              </div>
            ))}
          </DialogContent>
          <StyledDialogActions>
            <Button onClick={handleClose} sx={{ color: '#198773' }}>
              Close
            </Button>
          </StyledDialogActions>
        </Box>
      </StyledDialog>


      <StyledDialog open={deleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this row?</DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDeleteConfirmation} sx={{ color: '#198773' }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </StyledDialogActions>
      </StyledDialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>

    <Paper
      elevation={0}
      style={{
        padding: '0.5rem',
        marginTop: '1rem',
        marginLeft: '5rem',
        backgroundColor: '#ffffff',
        transition: 'margin-left 0.3s',
      }}
    >
      <Statistics evaluations={rows} />
    </Paper>

    </React.Fragment>

  );
}
