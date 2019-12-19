import React from 'react';
import './App.css';

import {LoanRequests} from './components/LoanRequests';
import {LoanPayments} from './components/LoanPayments';
import {LoanPaymentsReport} from './components/LoanPaymentsReport';
import {Navigation} from './components/Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
    <div className="container">
    <h3 className="mt-3 d-flex justify-content-center">LendingFront Loan Engine</h3>
    <h5 className="mt-3 d-flex justify-content-center">Technical Assesment Solution</h5>
    <Navigation></Navigation>

      <Switch>
        <Route path='/' component={LoanRequests} exact></Route>
        <Route path='/requests' component={LoanRequests}></Route>
        <Route path='/payments' component={LoanPayments}></Route>
        <Route path='/paymentsReport' component={LoanPaymentsReport}></Route>
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
