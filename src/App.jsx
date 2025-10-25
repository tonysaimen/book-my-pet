import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'
import { CartProvider } from './contexts/CartContext'
import Layout from './components/Layout/Layout'
import ChatBot from './components/AI/ChatBot'

// Public Pages
import Home from './pages/Public/Home'
import Login from './pages/Public/Login'
import Signup from './pages/Public/Signup'
import BrowsePets from './pages/Public/Pets/BrowsePets'
import PetDetailPage from './pages/Public/Pets/PetDetailPage'
import AdoptionSuccess from './pages/Public/Pets/AdoptionSuccess'
import ServiceListing from './pages/Public/Services/ServiceListing'
import ServiceDetail from './pages/Public/Services/ServiceDetail'
import BookingConfirmation from './pages/Public/Services/BookingConfirmation'

// User Pages
import Dashboard from './pages/User/Dashboard'
import Profile from './pages/User/Profile'
import MyPets from './pages/User/MyPets'
import MyBookings from './pages/User/MyBookings'
import Favorites from './pages/User/Favorites'

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard'
import AddPet from './pages/Admin/PetManagement/AddPet'
import EditPet from './pages/Admin/PetManagement/EditPet'
import PetList from './pages/Admin/PetManagement/PetList'
import PetAnalytics from './pages/Admin/PetManagement/PetAnalytics'
import AddService from './pages/Admin/ServiceManagement/AddService'
import ManageBookings from './pages/Admin/ServiceManagement/ManageBookings'
import ServiceProviders from './pages/Admin/ServiceManagement/ServiceProviders'
import Analytics from './pages/Admin/ServiceManagement/Analytics'

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute'
import AdminRoute from './components/Auth/AdminRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <CartProvider>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/pets" element={<BrowsePets />} />
                <Route path="/pets/:id" element={<PetDetailPage />} />
                <Route path="/adoption-success" element={<AdoptionSuccess />} />
                <Route path="/services" element={<ServiceListing />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />

                {/* User Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/my-pets" 
                  element={
                    <ProtectedRoute>
                      <MyPets />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/my-bookings" 
                  element={
                    <ProtectedRoute>
                      <MyBookings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/favorites" 
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  } 
                />

                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/pets" 
                  element={
                    <AdminRoute>
                      <PetList />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/pets/add" 
                  element={
                    <AdminRoute>
                      <AddPet />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/pets/edit/:id" 
                  element={
                    <AdminRoute>
                      <EditPet />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/pets/analytics" 
                  element={
                    <AdminRoute>
                      <PetAnalytics />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/services" 
                  element={
                    <AdminRoute>
                      <ServiceProviders />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/services/add" 
                  element={
                    <AdminRoute>
                      <AddService />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/bookings" 
                  element={
                    <AdminRoute>
                      <ManageBookings />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/analytics" 
                  element={
                    <AdminRoute>
                      <Analytics />
                    </AdminRoute>
                  } 
                />

                {/* 404 Page - Catch all route */}
                <Route 
                  path="*" 
                  element={
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-xl text-gray-600 mb-4">Page not found</p>
                        <p className="text-gray-500 mb-8">
                          The page you're looking for doesn't exist.
                        </p>
                        <a 
                          href="/" 
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Go back home
                        </a>
                      </div>
                    </div>
                  } 
                />
              </Routes>
            </Layout>
            <ChatBot />
          </CartProvider>
        </AppProvider>
      </AuthProvider>
    </Router>
  )
}

export default App