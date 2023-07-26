import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar/navbar.component";
import RegisterStaff from "./components/register-staff.component";
import RegisterCustomer from "./components/register-customer.component";
import RetrieveCustomer from "./components/retrieve-customer.component";
import CreateReport from "./components/create-report.component";
import Login from "./components/login.component";
import UpdateStaff from './components/update-staff.component';
import DeleteStaff from './components/delete-staff.component';
import UpdateCustomer from './components/update-customer.component';
import DeleteCustomer from './components/delete-customer.component';
import AllCustomers from './components/all-customers.component';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register-staff" exact element={<RegisterStaff/>} />
        <Route path='/update-staff' exact element={<UpdateStaff/>} />
        <Route path='/delete-staff' exact element={<DeleteStaff/>} />
        <Route path="/register-customer" exact element={<RegisterCustomer/>} />
        <Route path="/update-customer" exact element={<UpdateCustomer/>} />
        <Route path="/retrieve-customer" exact element={<RetrieveCustomer/>} />
        <Route path='/all-customer' exact element={<AllCustomers/>} />
        <Route path='/delete-customer' exact element={<DeleteCustomer/>} />
        <Route path="/create-report" exact element={<CreateReport/>} />
        <Route path="/login" exact element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
