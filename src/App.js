import React from "react";
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Table from './Table';
import Home from './Home';

const App=()=> {
    return (
    <Router>
        <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/SORcalculator" element={<Table/>} />
  </Routes>
  </Router>);
}

export default App;