import React from 'react';
import QueryForm from './QueryForm';
import QueryList from './QueryList';
import SolutionForm from './SolutionForm';

const UserDashboard = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.name} (User)</h1>
      <h3>Your Queries</h3>
      <QueryForm user={user} />
      <QueryList />
      <SolutionForm />
    </div>
  );
};

export default UserDashboard;
