import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabComponent from '../Component/TabComponent';
import NavBar from '../Component/Navbar';

export default function WareHouseData() {
    const h3Styles = {
        color: 'black',
        fontSize: '1.2rem',
        textAlign: 'center',
        backgroundColor: '#5DB58A',
        padding: '1rem',
    };

    const options = ['Beef', 'Chicken', 'Apple'];

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        label: {
            marginTop: '1rem',
            color: 'var(--text-color)',
        },
    };

    const styles1 = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '1rem',
        },
        labelContainer: {
            textAlign: 'right',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    };

    return (
        <div>
            {/* <Grid container spacing={2}> */}
            <Grid item >
                <Typography variant="h4" align="center" marginTop="1rem" marginBottom="1rem">
                    WareHouse Data
                </Typography>
            </Grid>

            <Grid item >
                <Typography variant="h5" align="center" margin='1rem' backgroundColor="#5DB58A" padding="0.25rem">
                    WareHouse Details
                </Typography>
            </Grid>

            <Grid container spacing={2} style={{padding: '2rem'}}>
                <Grid item xl={2} md={3} xs={0} sm={0}></Grid>

                <Grid item xl={4} md={3} xs={12} sm={6}>
                    <Typography variant="h6" style={styles.label}>
                        Product :
                    </Typography>
                </Grid>
                <Grid item xl={4} md={4} xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        renderInput={(params) => <TextField {...params} label="Products" />}
                    />
                </Grid>
                <Grid item xl={2} md={2} xs={0} sm={0}></Grid>

            </Grid>

            <Grid container spacing={2} style={{padding: '2rem'}}>
                <Grid item xl={2} md={3} xs={0} sm={0}></Grid>

                <Grid item xl={4} md={3} xs={12} sm={6}>
                    <Typography variant="h6" style={styles.label}>
                        Associated Equipments :
                    </Typography>
                </Grid>

                <Grid item xl={4} md={3} xs={12} sm={4}>
                    <FormGroup style={styles1.formGroup}>
                        <FormControlLabel control={<Checkbox />} label="ForkLift" />
                        <FormControlLabel control={<Checkbox />} label="Packing Machine" />
                        <FormControlLabel control={<Checkbox />} label="Lighting Systems" />
                        <FormControlLabel control={<Checkbox />} label="Cooling Systems" />
                        <FormControlLabel control={<Checkbox />} label="Pallet Jack" />
                    </FormGroup>
                </Grid>
                <Grid item xl={2} md={3} xs={0} sm={0}></Grid>
            </Grid>




            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" marginTop="1.5rem">
                    <Button variant="contained" color="success">
                        Submit
                    </Button>
                </Box>
            </Grid>
            {/* </Grid> */}
        </div >
    );
}