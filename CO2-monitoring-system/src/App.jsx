import './App.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Signup from './pages/Signup';

function App() {
  return (
   <div>
      {/* <Login /> */}
      <Signup/>
    </div>

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Login />} /> {/* Login route at root path */}
    //     <Route path="/signup" element={<Signup />} /> {/* Signup route at /signup path */}
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
