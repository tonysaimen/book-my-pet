import { useState, useEffect } from 'react'
import { servicesAPI } from '../lib/api/services'

export const useServices = (filters = {}) => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const servicesData = await servicesAPI.getServices(filters)
      setServices(servicesData)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [filters])

  return { 
    services, 
    loading, 
    error, 
    refetch: fetchServices 
  }
}