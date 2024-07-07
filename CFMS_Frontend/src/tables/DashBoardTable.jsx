import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Visibility } from '@mui/icons-material';
import { IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert, useMediaQuery, useTheme, Box, Grid, Typography, Accordion, AccordionSummary, AccordionDetails,Divider, Select, MenuItem, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import axiosInstance from '../utils/axiosInstance';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, RadialBarChart, RadialBar, Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Label} from 'recharts';

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

  const Statistics = ({ evaluations }) => {

    const [selectedProduct, setSelectedProduct] = useState('');
    
    const productEmissions = evaluations.reduce((acc, evaluation) => {
      evaluation.results.forEach(result => {
        if (!acc[result.productName]) {
          acc[result.productName] = { Inbound: 0, Outbound: 0, Production: 0, total: 0 };
        }
        acc[result.productName].Inbound += result.CO2eEmission.Inbound;
        acc[result.productName].Outbound += result.CO2eEmission.Outbound;
        acc[result.productName].Production += result.CO2eEmission.Production;
        acc[result.productName].total += result.totalCO2eEmission;
      });
      return acc;
    }, {});
  
    const productData = Object.keys(productEmissions).map(productName => ({
      productName: productName,
      ...productEmissions[productName],
    }));

    // const vendorEmissions = evaluations.reduce((acc, evaluation) => {
    //   evaluation.results.forEach(result => {
    //     const vendorId = result.vendorId;
    //     if (!acc[vendorId]) {
    //       acc[vendorId] = { Inbound: 0, Outbound: 0, Production: 0, total: 0 };
    //     }
    //     acc[vendorId].Inbound += result.CO2eEmission.Inbound;
    //     acc[vendorId].Outbound += result.CO2eEmission.Outbound;
    //     acc[vendorId].Production += result.CO2eEmission.Production;
    //     acc[vendorId].total += result.totalCO2eEmission;
    //   });
    //   return acc;
    // }, {});
    
    // const vendorData = Object.keys(vendorEmissions).map(vendorId => ({
    //   vendorId: parseInt(vendorId),
    //   ...vendorEmissions[vendorId],
    // }));

    // Filter data for selected product
    const selectedProductData = productData.find(item => item.productName === selectedProduct);
    // Colors for different emissions
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];
  
    return (
      <Box sx={{ width: '100%', padding: '1rem' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          Emissions Statistics
        </Typography>
        
        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <BarChart width={600} height={400} data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="productName" />
              <YAxis
                label={{ value: 'kg CO2e', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                tick={{ dy: 10 }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Inbound" fill="#8884d8" />
              <Bar dataKey="Outbound" fill="#82ca9d" />
              <Bar dataKey="Production" fill="#ffc658" />
              <Bar dataKey="total" fill="#ff7300" />
            </BarChart>
          </Grid>

          <Grid item xs={12} md={6}>
            <LineChart width={600} height={400} data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="productName" />
              <YAxis
                label={{ value: 'kg CO2e', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                tick={{ dy: 10 }}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Inbound" stroke="#8884d8" />
              <Line type="monotone" dataKey="Outbound" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Production" stroke="#ffc658" />
              <Line type="monotone" dataKey="total" stroke="#ff7300" />
            </LineChart>
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
                  {productData.map((product, index) => (
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
                        { name: 'Inbound', value: parseFloat(selectedProductData.Inbound) },
                        { name: 'Outbound', value: parseFloat(selectedProductData.Outbound) },
                        { name: 'Production', value: parseFloat(selectedProductData.Production) },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      fill="#8884d8"
                      label
                    >
                      {productData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

        </Grid>

      </Box>
    );
  };

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
                          <strong>Inbound: </strong> {result.CO2eEmission.Inbound} kg CO2e
                        </div>
                        <div>
                          <strong>Outbound: </strong> {result.CO2eEmission.Outbound} kg CO2e
                        </div>
                        <div>
                          <strong>Production: </strong> {result.CO2eEmission.Production} kg CO2e
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
