import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProposalForm = ({ user }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/proposals', {
        ...form,
        type: 'business'
      }, {
        headers: { 'x-auth-token': token }
      });
      setMessage('Proposal submitted!');
      setForm({ title: '', description: '', category: ''});
    } catch (error) {
      setMessage('Error submitting proposal');
    }
  };

  if (!user) 
    return <div className="alert alert-warning text-center my-2">Please login to post proposals.</div>;

  return (
    <div className="card shadow border-0 mx-auto bg-light">
      <div className="card-body">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              name="title"
              className="form-control"
              value={form.title}
              onChange={onChange}
              required
              placeholder="Business proposal title"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={form.description}
              onChange={onChange}
              required
              rows={4}
              placeholder="Description of your idea"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <select
              name="category"
              className="form-select"
              onChange={onChange}
              value={form.category}
              required
            >
              <option value="">Select category</option>
              {categories.map(c => 
                <option key={c._id} value={c._id}>{c.name}</option>
              )}
            </select>
          </div>
          
          <button type="submit" className="btn btn-success px-4">
            <i className="bi bi-send me-1"></i>Submit
          </button>
          {message && (
            <div className={`mt-3 alert ${message === 'Proposal submitted!' ? 'alert-success' : 'alert-danger'}`}>{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProposalForm;
