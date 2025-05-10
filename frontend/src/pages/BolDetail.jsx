import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditBol() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loadNumber: '',
    shipper: '',
    consignee: '',
    rate: '',
    status: 'Pending'
  });

  useEffect(() => {
    const fetchBol = async () => {
      try {
        const { data } = await axios.get(`/api/bols/${id}`);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching BOL:', error);
      }
    };
    fetchBol();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/bols/${id}`, formData);
      navigate(`/bols/${id}`);
    } catch (error) {
      console.error('Error updating BOL:', error);
    }
  };

  return (
    <div>
      <h2>Edit BOL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Load Number"
          value={formData.loadNumber}
          onChange={(e) => setFormData({...formData, loadNumber: e.target.value})}
          required
        />
        {/* Add other fields similarly */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}