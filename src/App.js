import React from 'react'
import Home from './Home'
import Checkout from './Components/Checkout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
  </Router>
  );
}

export default App;
