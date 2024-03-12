import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";
import EditButton from "../Component/EditButton";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// Import useNavigate instead of useHistory
import { useNavigate } from 'react-router-dom';

const useAddData = () => {
    const navigate = useNavigate();

    const handleAddData = () => {
        navigate("/WareHouseData");
    };

    return handleAddData;
};




const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
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
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const cardsData = [
    {
        title: "Apple",
        content: "Forklift, Packing Machine"
    },
    {
        title: "Banana",
        content: "Packaging Material, Conveyor Belt"
    },
    {
        title: "Orange",
        content: "Storage Racks, Pallet Jack"
    }
];

export default function WareHouse() {

    const handleAddData = useAddData();


    return (

        <div className="card-container">

            <Box sx={{
                "flexGrow": 1,
                // "backgroundColor":'#D9D9D9'
            }}
            >
                <AppBar position="static"
                    style={{
                        backgroundColor: '#fff',
                        margin: '0 0 1rem 0'
                    }}

                >
                    <Toolbar>

                        <Search
                            // noWrap
                            component="div"
                            sx={{
                                //flexGrow: 1,
                                //display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            <SearchIconWrapper>
                                <SearchIcon sx={{ color: '#5DB58A' }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                color={"black"}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>

                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton size="large" color="black" onClick={handleAddData}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                            <Typography variant="h6" color="black" fontWeight='bold'>Add Data</Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Grid container spacing={2}  style={{padding: '2rem'}}>
                {cardsData.map((card, index) => (
                    <Grid key={index} item xl={4} lg={4} md={6} xs={12}>
                        <Box position="relative">
                            <Card variant="outlined"
                                style={
                                    {
                                        backgroundColor: '#D9D9D9',
                                        position: 'relative',
                                        marginLeft: '10px',
                                        marginRight: '10px',
                                    }
                                }
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 25 }} color="text.secondary" fontWeight='bold' gutterBottom>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {card.content.split(',').map((item, idx) => (
                                            <React.Fragment key={idx}>
                                                {item.trim()}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </Typography>
                                </CardContent>
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        backgroundColor: '#D9D9D9',
                                        zIndex: 1,
                                    }}
                                >
                                    <IoCloseCircleOutline />
                                </IconButton>

                                <EditButton />
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
