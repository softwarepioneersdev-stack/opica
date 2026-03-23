import React, { useState } from 'react'
import Input from '../components/Input'
import GoogleButton from '../components/GoogleButton'
import { Link } from 'react-router-dom'


const LoginPage: React.FC = () => {
  const [showPass, setShowPass] = useState(false)
  const [keepLogged, setKeepLogged] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold text-amber-700 font-serif mb-8 tracking-tight">
        ArchServices
      </h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-7">
          Please enter your details to sign in
        </p>

        <div className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@archservices.com"
            icon="✉️"
          />

          {/* Password with custom toggle */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <button className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                🔒
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                defaultValue="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="radio"
              checked={keepLogged}
              onChange={() => setKeepLogged(!keepLogged)}
              className="accent-blue-600"
            />
            Keep me logged in
          </label>
          <Link to={'/signin'}>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors mt-1"
            >
              Sign In →
            </button>
          </Link>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              or continue with
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <GoogleButton />

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to={"/signup"}>
              <button
                className="text-blue-600 font-medium hover:underline"
              >
                Create an account
              </button>
            </Link>
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        © 2024 ArchServices. All rights reserved. • Privacy Policy • Terms of
        Service
      </p>
    </div>
  )
}

export default LoginPage
