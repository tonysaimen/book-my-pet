import React from 'react'
// Fix the import  
import Card from "../../components/UI/Card";
import Button from '../../../components/UI/Button'

const MyBookings = () => {
  const bookings = [
    {
      id: 1,
      service: 'Paws & Claws Grooming',
      type: 'Grooming',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'confirmed',
      pet: 'Buddy'
    },
    {
      id: 2,
      service: 'Animal Care Hospital',
      type: 'Veterinary',
      date: '2024-01-25',
      time: '2:30 PM',
      status: 'pending',
      pet: 'Buddy'
    }
  ]

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-600 mt-2">Manage your service appointments</p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">Book your first service for your pet!</p>
            <Button as="a" href="/services">
              Book a Service
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.service}
                        </h3>
                        <p className="text-gray-600">{booking.type} • {booking.pet}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {booking.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                    {booking.status === 'pending' && (
                      <Button variant="danger" size="small">
                        Cancel
                      </Button>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button variant="outline" size="small">
                        Reschedule
                      </Button>
                    )}
                    <Button variant="outline" size="small">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button as="a" href="/services" variant="outline" className="justify-center">
              ✂️ Book Grooming
            </Button>
            <Button as="a" href="/services" variant="outline" className="justify-center">
              🏥 Book Vet Visit
            </Button>
            <Button as="a" href="/services" variant="outline" className="justify-center">
              🎾 Book Training
            </Button>
            <Button as="a" href="/services" variant="outline" className="justify-center">
              🏠 Book Boarding
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MyBookings