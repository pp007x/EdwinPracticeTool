import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import Header from './DashboardHeader';
import '../Css/CompanyDashboard.css';

const CompanyDashboard = () => (
  <div className="dashboard">
    <DashboardSidebar />
    <div className="main">
      <Header />
      <div className="content">
        <h1>Company Dashboard</h1>
        <p>Welcome to the Company Dashboard page!</p>
      </div>
    </div>
  </div>
);

export default CompanyDashboard;
