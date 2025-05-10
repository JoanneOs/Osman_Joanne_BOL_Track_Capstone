import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BolList.css';

export default function BolList() {
  const [bols, setBols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBols = async () => {
      try {
        const { data } = await axios.get('/api/bols');
        setBols(data);
      } catch (error) {
        console.error('Failed to fetch BOLs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBols();
  }, []);

  const filteredBols = bols.filter(bol => 
    bol.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bol.shipper.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bols/${id}`);
      setBols(bols.filter(bol => bol._id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <div className="bol-list-container">
      <div className="list-header">
        <h2>Bills of Lading</h2>
        <input
          type="text"
          placeholder="Search BOLs..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bol-grid">
          {filteredBols.map(bol => (
            <div key={bol._id} className="bol-card">
              <div className="card-header">
                <h3>{bol.loadNumber}</h3>
                <span className={`status-badge ${bol.status.toLowerCase()}`}>
                  {bol.status}
                </span>
              </div>
              <p><strong>Shipper:</strong> {bol.shipper}</p>
              <p><strong>Consignee:</strong> {bol.consignee}</p>
              <p><strong>Rate:</strong> ${bol.rate}</p>
              
              <div className="card-actions">
                <Link to={`/bols/${bol._id}/edit`} className="edit-btn">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(bol._id)} 
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}