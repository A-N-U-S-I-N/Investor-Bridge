import React from 'react';
import ProposalForm from './ProposalForm';
import ProposalList from './ProposalList';

const InvestorDashboard = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.name} (Investor)</h1>
      <ProposalForm user={user} />
      <ProposalList />
      <h3>Evaluations</h3>
    </div>
  );
};

export default InvestorDashboard;
