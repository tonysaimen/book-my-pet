import { useState, useEffect } from 'react'
import { petsAPI } from '../lib/api/pets'

export const usePets = (filters = {}) => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPets = async () => {
    try {
      setLoading(true)
      setError(null)
      const petsData = await petsAPI.getPets(filters)
      setPets(petsData)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching pets:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPets()
  }, [filters])

  return { 
    pets, 
    loading, 
    error, 
    refetch: fetchPets
  }
}