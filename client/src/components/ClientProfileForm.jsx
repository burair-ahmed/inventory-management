import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ClientProfileForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    plot: "",
    block: "",
    amountPaid: "",
    amountDue: "",
    dueDate: "",
    createdByAdmin: "", // Add this line
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`/api/client/get/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFormData(response.data);
        } catch (error) {
          console.error("Failed to fetch client", error);
        }
      };

      fetchClient();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (id) {
        await axios.post(`/api/client/update/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/client/create", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/clients");
      setFormData({
        name: "",
        plot: "",
        block: "",
        amountPaid: "",
        amountDue: "",
        dueDate: "",
        createdByAdmin: "", // Reset this field
      });
    } catch (error) {
      setError(error.response.data.message);
      console.error("Failed to save client", error.response.data);
    }
  };

  return (
    <div className="client-profile-form-container">
      <h2>{id ? "Edit Client" : "Create Client"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="client-profile-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Plot</label>
          <input
            type="number"
            name="plot"
            placeholder="Enter plot number"
            value={formData.plot}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Block</label>
          <input
            type="text"
            name="block"
            placeholder="Enter block"
            value={formData.block}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount Paid</label>
          <input
            type="number"
            name="amountPaid"
            placeholder="Enter amount paid"
            value={formData.amountPaid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount Due</label>
          <input
            type="number"
            name="amountDue"
            placeholder="Enter amount due"
            value={formData.amountDue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        {id && (
          <div className="form-group">
            <label>Created By Admin</label>
            <input
              type="text"
              name="createdByAdmin"
              value={formData.createdByAdmin}
              readOnly
            />
          </div>
        )}
        <button type="submit" className="btn-submit">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ClientProfileForm;
