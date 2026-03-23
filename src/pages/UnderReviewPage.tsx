import React from 'react'
import { Button } from '../components/Buttons'
import {Footer} from '../components/Containers'


const UnderReviewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-5">
          <svg
            className="w-8 h-8 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Account is Under Review
        </h2>
        <p className="text-sm text-gray-500 mb-7 leading-relaxed">
          Your account has been successfully created and is currently under
          review. Our team will contact you within 10 hours.
        </p>

        {/* Status Card */}
        <div className="w-full bg-gray-50 rounded-xl border border-gray-100 p-4 mb-6">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              Status
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-amber-400 rounded-full" />
              <span className="text-sm font-medium text-gray-700">
                Pending Review
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              Estimated Response Time
            </span>
            <span className="text-sm font-medium text-gray-700">
              Within 10 Hours
            </span>
          </div>
        </div>

        <Button style='primary'>
          Contact Support
        </Button>

        <Button style='ghost'>
          Logout
        </Button>

        <p className="text-xs text-gray-400 mt-5">
          Need help immediately? Check our{' '}
          <span className="text-blue-500 underline cursor-pointer">
            Help Center
          </span>
          .
        </p>
      </div>

      <Footer />
    </div>
  )
}

export default UnderReviewPage
