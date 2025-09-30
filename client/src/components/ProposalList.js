import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProposalList = ({onSelectedProject}) => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/proposals')
      .then(res => setProposals(res.data))
      .catch(() => setProposals([]));
  }, []);

  const handleSelect = proposal => {
    if (onSelectedProject) onSelectedProject(proposal);
  };

  return (
    <div>
      {proposals.length === 0 && <p>No businesses currently available.</p>}
      <ul>
        {proposals.map(p => (
          <li key={p._id} onClick={() => handleSelect(p)} style={{ cursor: 'pointer' }}>
            <strong>{p.title}</strong> - {p.description}<br />
            By: {p.createdBy?.name} (Role: {p.createdBy?.role})<br />
            Category: {p.category?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalList;
