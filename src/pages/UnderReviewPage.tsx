import React from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Containers'

const UnderReviewPage: React.FC = () => (
  <div className="min-h-screen bg-surface-overlay flex flex-col items-center justify-center px-4 py-12 transition-colors">
    <div className="w-full max-w-md bg-surface rounded-2xl shadow-sm border border-border p-10 flex flex-col items-center text-center transition-colors">
      <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mb-5">
        <svg className="w-8 h-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-content-primary mb-2">Your Account is Under Review</h2>
      <p className="text-sm text-content-secondary mb-7 leading-relaxed">Your account has been successfully created and is currently under review. Our team will contact you within 10 hours.</p>
      <div className="w-full bg-surface-raised rounded-xl border border-border p-4 mb-6 transition-colors">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-xs text-content-muted uppercase tracking-widest">Status</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-warning rounded-full" />
            <span className="text-sm font-medium text-content-primary">Pending Review</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-xs text-content-muted uppercase tracking-widest">Estimated Response Time</span>
          <span className="text-sm font-medium text-content-primary">Within 10 Hours</span>
        </div>
      </div>
      <button className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-xl transition-colors mb-3">Contact Support</button>
      <Link to="/signin" className="w-full">
        <button className="w-full bg-surface-raised hover:bg-surface-overlay text-content-secondary font-semibold py-3 rounded-xl transition-colors border border-border">Logout</button>
      </Link>
      <p className="text-xs text-content-muted mt-5">Need help immediately? Check our <span className="text-primary underline cursor-pointer">Help Center</span>.</p>
    </div>
    <Footer />
  </div>
)
export default UnderReviewPage
