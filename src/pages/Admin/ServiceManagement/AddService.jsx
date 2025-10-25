import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../../contexts/AppContext'
import Card, { CardHeader, CardContent } from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'

const AddService = () => {
  const navigate = useNavigate()
  const { setError, setSuccess, loading, setLoading } = useApp()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    image_url: ''
  })

  const categories = [
    { id: '1', name: 'Grooming' },
    { id: '2', name: 'Veterinary' },
    { id: '3', name: 'Training' },
    { id: '4', name: 'Boarding' }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccess('Service provider added successfully!')
      navigate('/admin/services')
    } catch (error) {
      setError('Failed to add service provider')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Service Provider</h1>
            <p className="text-gray-600 mt-2">Add a new service provider to the platform</p>
          </div>
          <Button
            onClick={() => navigate('/admin/services')}
            variant="outline"
          >
            Back to Services
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Service Provider Information</h2>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="name" className="form-label">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label htmlFor="category" className="form-label">
                  Service Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter email address"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter business address"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="image_url" className="form-label">
                  Image URL
                </label>
                <input
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input"
                  placeholder="Describe the services offered, expertise, and any other important information..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/services')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Add Service Provider
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddService