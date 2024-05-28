import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <button onClick={() => setIsLogin(true)}>Login</button>
      <button onClick={() => setIsLogin(false)}>Signup</button>
      {isLogin ? <Login /> : <Signup />}
    </div>
  );
};

export default App;
