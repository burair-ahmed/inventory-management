import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ClientProfileList = () => {
  const [clients, setClients] = useState([]);
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
      <Link to="/clients/new" className="create-link">Create New Client</Link>
      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Plot:</strong> {client.plot}</p>
            <p><strong>Block:</strong> {client.block}</p>
            <p><strong>Amount Paid:</strong> {client.amountPaid}</p>
            <p><strong>Amount Due:</strong> {client.amountDue}</p>
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
