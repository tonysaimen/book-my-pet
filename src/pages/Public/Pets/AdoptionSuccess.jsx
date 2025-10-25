import React from 'react'
import { Link } from 'react-router-dom'
import Card, { CardContent } from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'

const AdoptionSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Adoption Application Submitted!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in adopting a pet! Our team will review your application 
              and contact you within 24-48 hours to schedule a meet and greet.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We'll contact you to schedule a meeting</li>
                <li>• Prepare your home for the new arrival</li>
                <li>• Gather necessary supplies</li>
                <li>• Get ready for your new best friend!</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button as={Link} to="/pets" className="w-full">
                Browse More Pets
              </Button>
              <Button as={Link} to="/dashboard" variant="outline" className="w-full">
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdoptionSuccess