import React from 'react'
import Input from '../components/Input'
import GoogleButton from '../components/GoogleButton'
import { Link } from 'react-router-dom'


const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
        <p className="text-sm text-blue-600 mb-7">
          Please fill in the details to start your journey.
        </p>

        <div className="flex flex-col gap-4">
          <Input label="Full Name" placeholder="John Doe" icon="👤" />
          <Input
            label="Email Address"
            type="email"
            placeholder="john@archservices.com"
            icon="✉️"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-blue-600">
              Choose your role
            </label>
            <div className="relative">
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option value="">Choose your role</option>
                <option>Principal Architect</option>
                <option>Senior Architect</option>
                <option>Project Manager</option>
                <option>Client</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                ▾
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Password" type="password" placeholder="••••••••" icon="🔒" />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              icon="🔒"
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-blue-600" />
            <span>
              I agree to the{' '}
              <span className="text-blue-600 underline cursor-pointer">
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="text-blue-600 underline cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </label>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Create My Account →
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              or register with
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <GoogleButton />

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to={'/signin'}>
            <button
              className="text-blue-600 font-medium hover:underline"
            >
              Sign In
            </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
