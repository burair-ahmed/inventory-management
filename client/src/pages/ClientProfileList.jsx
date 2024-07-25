import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ClientProfileList = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/client/superadmin/get', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClients(response.data);
      } catch (error) {
        console.error('Failed to fetch clients', error);
      }
    };

    fetchClients();
  }, []);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/client/search?name=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(response.data);
    } catch (error) {
      console.error('Failed to search clients', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/client/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(clients.filter((client) => client._id !== id));
    } catch (error) {
      console.error('Failed to delete client', error);
    }
  };

  return (
    <div className="client-profile-list-container">
      <h2>Client Profiles</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <Link to="/clients/new" className="create-link">Create New Client</Link>
      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Plot:</strong> {client.plot}</p>
            <p><strong>Block:</strong> {client.block}</p>
            <p><strong>Amount Paid:</strong> {client.amountPaid}</p>
            <p><strong>Amount Due:</strong> {client.amountDue}</p>
            <p><strong>Due Date:</strong> {new Date(client.dueDate).toLocaleDateString()}</p>
            <p><strong>Created By:</strong> {client.createdByAdmin}</p>
            <div className="actions">
              <button className="edit-btn" onClick={() => navigate(`/clients/edit/${client._id}`)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(client._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientProfileList;
