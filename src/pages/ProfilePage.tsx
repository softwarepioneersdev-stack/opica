import React from 'react'
import Navbar from '../components/Navbar'
import Avatar from '../components/Avatar'
import { profileDetails } from '../data/fakeData'


const availabilityColors = [
  'bg-green-100 text-green-700',
  'bg-blue-100 text-blue-600',
  'bg-amber-100 text-amber-700',
]

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar/>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* ── Left Column ── */}
          <div className="flex flex-col gap-5">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="relative mb-3">
                <Avatar
                  initials={profileDetails.initials}
                  size="xl"
                  color="bg-gradient-to-br from-amber-300 to-orange-400"
                />
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  18
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                {profileDetails.fullName.split(' ').slice(0, 2).join(' ')}
              </h3>
              <p className="text-gray-400 text-xs mb-4">
                {profileDetails.role} • {profileDetails.location}
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-1">
                ✏️ Edit Profile
              </button>
            </div>

            {/* Account Statistics */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span>📊</span> Account Statistics
              </h4>
              <div className="space-y-2.5">
                {profileDetails.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs text-gray-500">{s.label}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-800">
                  Personal Information
                </h4>
                <button className="text-gray-400 hover:text-gray-600">
                  •••
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'Full Name', value: profileDetails.fullName },
                  { label: 'Email Address', value: profileDetails.email },
                  { label: 'Phone Number', value: profileDetails.phone },
                  { label: 'Office Address', value: profileDetails.office },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability & Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Availability
                </h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {profileDetails.availability.map((a, i) => (
                    <span
                      key={a}
                      className={`text-xs font-medium px-3 py-1 rounded-full ${availabilityColors[i]}`}
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Available for new architectural consultations starting from Q3
                  2024.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Verified Credentials
                </h4>
                <div className="space-y-2">
                  {profileDetails.credentials.map((c) => (
                    <div
                      key={c}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                        ✓
                      </span>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-3">
                Account Security
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: '🔐',
                    title: 'Two-Factor Auth',
                    sub: 'Enabled via Mobile App',
                  },
                  {
                    icon: '💻',
                    title: 'Active Sessions',
                    sub: '5 devices logged in',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400">{item.sub}</p>
                    </div>
                    <span className="text-gray-400">›</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
