import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddBol() {
  const [formData, setFormData] = useState({
    loadNumber: '',
    shipper: '',
    consignee: '',
    rate: ''
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/bols', formData)
      navigate('/')
    } catch (error) {
      console.error('Error creating BOL:', error)
    }
  }

  return (
    <div>
      <h2>Add New BOL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Load Number"
          value={formData.loadNumber}
          onChange={(e) => setFormData({...formData, loadNumber: e.target.value})}
          required
        />
        {/* Add other fields similarly */}
        <button type="submit">Save</button>
      </form>
    </div>
  )
}