import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WareHouse from './views/WareHouse';
import WareHouseData from './views/WareHouseData';
import NavBar from './Component/Navbar';
import TabComponent from './Component/TabComponent';

function App() {
    return (
        <Router>
            <NavBar /> {/* Render NavBar outside of Routes */}
            <TabComponent />
            <Routes>
                <Route path="/" element={<WareHouse />} />
                <Route path="/WareHouseData" element={<WareHouseData />} />
            </Routes>
        </Router>
    );
}

export default App;
