import React from 'react'
import { Link } from 'react-router-dom'
import Card, { CardContent } from '../../components/UI/Card'

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Pets', value: '124', change: '+12%', color: 'blue' },
    { label: 'Pending Adoptions', value: '23', change: '+5%', color: 'yellow' },
    { label: 'Service Bookings', value: '89', change: '+18%', color: 'green' },
    { label: 'Total Revenue', value: '$12,458', change: '+22%', color: 'purple' }
  ]

  const quickActions = [
    { title: 'Add New Pet', description: 'Add a new pet to adoption listings', link: '/admin/pets/add', icon: '🐕' },
    { title: 'Manage Pets', description: 'View and edit all pets', link: '/admin/pets', icon: '📋' },
    { title: 'View Bookings', description: 'Manage service bookings', link: '/admin/bookings', icon: '📅' },
    { title: 'Analytics', description: 'View platform analytics', link: '/admin/analytics', icon: '📊' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your pet adoption platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium text-${stat.color}-600`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Link key={index} to={action.link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{action.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard