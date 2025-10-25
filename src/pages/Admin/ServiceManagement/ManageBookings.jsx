import React, { useState } from 'react'
import Card, { CardContent } from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'

const ManageBookings = () => {
  const [bookings] = useState([
    {
      id: '1',
      user: 'John Doe',
      service: 'Paws & Claws Grooming',
      date: '2024-01-20',
      time: '10:00',
      status: 'confirmed',
      pet: 'Buddy'
    },
    {
      id: '2',
      user: 'Sarah Smith',
      service: 'Animal Care Hospital',
      date: '2024-01-21',
      time: '14:30',
      status: 'pending',
      pet: 'Luna'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      service: 'Pet Training Academy',
      date: '2024-01-22',
      time: '11:00',
      status: 'completed',
      pet: 'Max'
    }
  ])

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const handleStatusUpdate = (bookingId, newStatus) => {
    console.log(`Updating booking ${bookingId} to ${newStatus}`)
    // Implement status update logic
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
        <p className="text-gray-600 mt-2">View and manage service bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
            <p className="text-sm text-gray-600">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {bookings.filter(b => b.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.user}
                        </div>
                        <div className="text-sm text-gray-500">
                          Pet: {booking.pet}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="small"
                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="danger"
                            size="small"
                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          size="small"
                          onClick={() => handleStatusUpdate(booking.id, 'completed')}
                        >
                          Mark Complete
                        </Button>
                      )}
                      <Button variant="outline" size="small">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">There are no service bookings to display.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageBookings