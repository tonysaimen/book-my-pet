import { useState, useEffect } from 'react'

export const useBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockBookings = [
        {
          id: 1,
          service: 'Paws & Claws Grooming',
          type: 'Grooming',
          date: '2024-01-20',
          time: '10:00 AM',
          status: 'confirmed',
          pet: 'Buddy'
        }
      ]
      setBookings(mockBookings)
    } catch (err) {
      setError('Failed to load bookings')
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return { 
    bookings, 
    loading, 
    error, 
    refetch: fetchBookings 
  }
}