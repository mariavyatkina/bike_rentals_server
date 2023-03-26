import React, {useState, useMemo} from 'react';
import './App.css';
import UserInput from './components/UserInput';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Estimation from './components/Estimation';

function App() {
 return (<BrowserRouter>
  <Routes>
        <Route exact path="/estimation" element={<Estimation/>} >
        </Route>
        <Route exact path="/" element={<UserInput/>}>
        </Route>
    </Routes>
  </BrowserRouter>)
}

export default App;