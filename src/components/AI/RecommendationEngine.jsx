import React from 'react'
import Card, { CardContent } from '../UI/Card'

const RecommendationEngine = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No recommendations available yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Complete the pet matchmaker quiz to get personalized recommendations.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Recommended for You
        </h3>
        
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                    {rec.emoji}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {rec.type} - {rec.breed}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {rec.reason}
                  </p>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Perfect Match
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {rec.species}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Why these recommendations?</h4>
          <p className="text-sm text-blue-800">
            Our AI analyzed your preferences and lifestyle to find pets that would be the best fit for your home and routine.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecommendationEngine