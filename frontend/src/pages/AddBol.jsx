import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddBol.css';

eexport default function AddBol() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      loadNumber: '',
      shipper: '',
      consignee: '',
      rate: '',
      miles: '',
      status: 'Pending'
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const validate = () => {
      const newErrors = {};
      if (!formData.loadNumber.trim()) newErrors.loadNumber = 'Load # is required';
      if (!formData.shipper.trim()) newErrors.shipper = 'Shipper is required';
      if (!formData.consignee.trim()) newErrors.consignee = 'Consignee is required';
      if (!formData.rate || isNaN(formData.rate)) newErrors.rate = 'Valid rate is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validate()) return;
  
      setIsSubmitting(true);
      try {
        await axios.post('/api/bols', {
          ...formData,
          rate: Number(formData.rate),
          miles: Number(formData.miles) || 0
        });
        navigate('/bols', { state: { success: 'BOL added successfully!' } });
      } catch (error) {
        console.error('Submission error:', error);
        if (error.response?.data?.message) {
          setErrors({ server: error.response.data.message });
        } else {
          setErrors({ server: 'Failed to create BOL. Please try again.' });
        }
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear error when typing
      if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };
  
    return (
      <div className="form-container">
        <h2>Add New Bill of Lading</h2>
        
        {errors.server && <div className="error-message">{errors.server}</div>}
  
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Load Number *</label>
            <input
              type="text"
              name="loadNumber"
              value={formData.loadNumber}
              onChange={handleChange}
              className={errors.loadNumber ? 'error' : ''}
            />
            {errors.loadNumber && <span className="error-text">{errors.loadNumber}</span>}
          </div>
  
          <div className="form-group">
            <label>Shipper *</label>
            <input
              type="text"
              name="shipper"
              value={formData.shipper}
              onChange={handleChange}
              className={errors.shipper ? 'error' : ''}
            />
            {errors.shipper && <span className="error-text">{errors.shipper}</span>}
          </div>
  
          <div className="form-group">
            <label>Consignee *</label>
            <input
              type="text"
              name="consignee"
              value={formData.consignee}
              onChange={handleChange}
              className={errors.consignee ? 'error' : ''}
            />
            {errors.consignee && <span className="error-text">{errors.consignee}</span>}
          </div>
  
          <div className="form-row">
            <div className="form-group">
              <label>Rate ($) *</label>
              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                className={errors.rate ? 'error' : ''}
                step="0.01"
              />
              {errors.rate && <span className="error-text">{errors.rate}</span>}
            </div>
  
            <div className="form-group">
              <label>Miles</label>
              <input
                type="number"
                name="miles"
                value={formData.miles}
                onChange={handleChange}
              />
            </div>
          </div>
  
          <div className="form-group">
            <label>Status</label>
            <select 
              name="status" 
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Disputed">Disputed</option>
            </select>
          </div>
  
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? 'Saving...' : 'Save BOL'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/bols')}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }