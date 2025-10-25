import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useApp } from '../../contexts/AppContext'
import Card, { CardContent } from '../UI/Card'
import Button from '../UI/Button'

const ServiceBooking = ({ service, onBookingSuccess }) => {
  const { user } = useAuth()
  const { setError, setSuccess } = useApp()
  const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '60',
    notes: ''
  })

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ]

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ]

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      setError('Please log in to book a service')
      return
    }

    setLoading(true)
    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess(`Booking confirmed with ${service.name}! You'll receive a confirmation email shortly.`)
      setBookingData({
        date: '',
        time: '',
        duration: '60',
        notes: ''
      })
      
      if (onBookingSuccess) {
        onBookingSuccess()
      }
    } catch (error) {
      setError('Failed to book service. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Book This Service</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="form-label">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={bookingData.date}
              onChange={handleChange}
              required
              min={today}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="time" className="form-label">
              Time *
            </label>
            <select
              id="time"
              name="time"
              value={bookingData.time}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select a time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="duration" className="form-label">
              Duration
            </label>
            <select
              id="duration"
              name="duration"
              value={bookingData.duration}
              onChange={handleChange}
              className="input"
            >
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="form-label">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={bookingData.notes}
              onChange={handleChange}
              rows={3}
              className="input"
              placeholder="Any special instructions or requirements..."
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Service:</span>
                <span>{service.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span>{service.service_categories?.name}</span>
              </div>
              {bookingData.date && (
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date(bookingData.date).toLocaleDateString()}</span>
                </div>
              )}
              {bookingData.time && (
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{bookingData.time}</span>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
            disabled={!bookingData.date || !bookingData.time}
          >
            Confirm Booking
          </Button>

          {!user && (
            <p className="text-sm text-gray-500 text-center">
              Please log in to book this service
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default ServiceBooking