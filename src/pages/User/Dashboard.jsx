import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Card, { CardContent } from '../../components/UI/Card'
import Button from '../../components/UI/Button'

const Dashboard = () => {
  const { user, profile } = useAuth()

  const quickActions = [
    {
      title: 'Browse Pets',
      description: 'Find your perfect pet companion',
      icon: '🐕',
      link: '/pets',
      color: 'blue'
    },
    {
      title: 'Book Services',
      description: 'Schedule grooming, vet visits, and more',
      icon: '✂️',
      link: '/services',
      color: 'green'
    },
    {
      title: 'My Pets',
      description: 'View your adopted pets',
      icon: '🏡',
      link: '/my-pets',
      color: 'purple'
    },
    {
      title: 'My Bookings',
      description: 'Manage your service appointments',
      icon: '📅',
      link: '/my-bookings',
      color: 'orange'
    }
  ]

  const recentActivity = [
    { action: 'Viewed Golden Retriever puppies', time: '2 hours ago', type: 'view' },
    { action: 'Saved Labrador to favorites', time: '1 day ago', type: 'favorite' },
    { action: 'Completed pet adoption quiz', time: '2 days ago', type: 'quiz' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {profile?.full_name || 'Pet Lover'}!
        </h1>
        <p className="text-gray-600">
          Ready to find your next furry family member or book pet care services?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className={`text-3xl mb-4 p-3 rounded-full bg-${action.color}-100 text-${action.color}-600 w-16 h-16 mx-auto flex items-center justify-center`}>
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{action.description}</p>
              <Button as={Link} to={action.link} variant="outline" size="small" className="w-full">
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'view' ? 'bg-blue-500' :
                    activity.type === 'favorite' ? 'bg-red-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pet Care Tips */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pet Care Tips</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Regular Vet Checkups</h3>
                <p className="text-blue-800 text-sm">
                  Schedule annual checkups to keep your pet healthy and catch any issues early.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Proper Nutrition</h3>
                <p className="text-green-800 text-sm">
                  Feed your pet a balanced diet appropriate for their age, size, and breed.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Exercise & Play</h3>
                <p className="text-purple-800 text-sm">
                  Regular exercise and mental stimulation are essential for your pet's wellbeing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard