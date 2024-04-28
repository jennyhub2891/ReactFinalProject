import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DogList from './DogList';
import AddDog from './AddDog';
import EditDog from './EditDog';
//import './App.css';

function App() {
  return (
    // Router component for managing navigation
    <Router>
      <div>
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<DogList />} />
          <Route path="/add" element={<AddDog />} />
          <Route path="/edit/:id" element={<EditDog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
