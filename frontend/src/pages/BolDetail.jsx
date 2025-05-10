import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function BolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bol, setBol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBol = async () => {
      try {
        const { data } = await axios.get(`/api/bols/${id}`);
        setBol(data);
      } catch (error) {
        console.error('Error fetching BOL:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBol();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!bol) return <div>BOL not found</div>;

  return (
    <div>
      <h2>BOL Details: {bol.loadNumber}</h2>
      <p>Shipper: {bol.shipper}</p>
      <p>Consignee: {bol.consignee}</p>
      <p>Rate: ${bol.rate}</p>
      <p>Status: {bol.status}</p>
      
      <div className="action-buttons">
        <Link to={`/bols/${id}/edit`} className="button">Edit</Link>
        <button onClick={() => navigate('/bols')}>Back to List</button>
      </div>
    </div>
  );
}