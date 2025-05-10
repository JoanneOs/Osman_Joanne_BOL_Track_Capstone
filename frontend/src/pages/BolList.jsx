import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function BolList() {
  const [bols, setBols] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBols = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/bols')
        setBols(data)
      } catch (error) {
        console.error('Error fetching BOLs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBols()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Bills of Lading</h1>
      <Link to="/add">Add New BOL</Link>
      <ul>
        {bols.map(bol => (
          <li key={bol._id}>
            <Link to={`/bols/${bol._id}`}>
              {bol.loadNumber} - {bol.shipper}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}