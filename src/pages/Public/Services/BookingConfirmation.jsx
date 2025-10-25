import React from 'react'
import { Link } from 'react-router-dom'
import Card, { CardContent } from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'

const BookingConfirmation = () => {
  const bookingDetails = {
    service: 'Paws & Claws Grooming',
    date: 'January 20, 2024',
    time: '10:00 AM',
    pet: 'Buddy',
    bookingId: 'BK-2024-001'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-6">
              Your service booking has been confirmed. You'll receive an email with all the details.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-green-900 mb-3">Booking Details</h3>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{bookingDetails.service}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{bookingDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{bookingDetails.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pet:</span>
                  <span className="font-medium">{bookingDetails.pet}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking ID:</span>
                  <span className="font-medium">{bookingDetails.bookingId}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button as={Link} to="/my-bookings" className="w-full">
                View My Bookings
              </Button>
              <Button as={Link} to="/services" variant="outline" className="w-full">
                Book Another Service
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BookingConfirmation