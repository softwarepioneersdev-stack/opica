import React from 'react'
import Navbar from '../components/Navbar'
import Avatar from '../components/Avatar'
import { profileDetails } from '../data/fakeData'
import { useT } from '../lib/i18n'

const availabilityColors = [
  'bg-success/10 text-success',
  'bg-primary/10 text-primary',
  'bg-warning/10 text-warning',
]

const ProfilePage: React.FC = () => {
  const { t } = useT()

  return (
    <div className="min-h-screen bg-surface-overlay transition-colors">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Left */}
          <div className="flex flex-col gap-5">
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border flex flex-col items-center text-center transition-colors">
              <div className="relative mb-3">
                <Avatar initials={profileDetails.initials} size="xl" color="bg-gradient-to-br from-amber-300 to-orange-400" />
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">18</span>
              </div>
              <h3 className="font-bold text-content-primary text-lg">{profileDetails.fullName.split(' ').slice(0,2).join(' ')}</h3>
              <p className="text-content-muted text-xs mb-4">{profileDetails.role} • {profileDetails.location}</p>
              <button className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2 rounded-xl transition-colors">
                {t('profile.editProfile')}
              </button>
            </div>

            <div className="bg-surface rounded-2xl p-5 shadow-sm border border-border transition-colors">
              <h4 className="font-semibold text-content-primary mb-3 flex items-center gap-2">
                <span>📊</span> {t('profile.accountStats')}
              </h4>
              <div className="space-y-2.5">
                {profileDetails.stats.map(s => (
                  <div key={s.label} className="flex justify-between items-center">
                    <span className="text-xs text-content-secondary">{s.label}</span>
                    <span className="text-sm font-bold text-content-primary">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* Personal Info */}
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border transition-colors">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-content-primary">{t('profile.personalInfo')}</h4>
                <button className="text-content-muted hover:text-content-secondary">•••</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: t('profile.fields.fullName'), value: profileDetails.fullName },
                  { label: t('profile.fields.email'), value: profileDetails.email },
                  { label: t('profile.fields.phone'), value: profileDetails.phone },
                  { label: t('profile.fields.office'), value: profileDetails.office },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-xs text-content-muted uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-content-primary">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability + Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-surface rounded-2xl p-5 shadow-sm border border-border transition-colors">
                <h4 className="font-semibold text-content-primary mb-3">{t('profile.availability')}</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {profileDetails.availability.map((a, i) => (
                    <span key={a} className={`text-xs font-medium px-3 py-1 rounded-full ${availabilityColors[i]}`}>{a}</span>
                  ))}
                </div>
                <p className="text-xs text-content-muted leading-relaxed">{t('profile.availabilityNote')}</p>
              </div>

              <div className="bg-surface rounded-2xl p-5 shadow-sm border border-border transition-colors">
                <h4 className="font-semibold text-content-primary mb-3">{t('profile.credentials')}</h4>
                <div className="space-y-2">
                  {profileDetails.credentials.map(c => (
                    <div key={c} className="flex items-center gap-2 text-sm text-content-secondary">
                      <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-surface rounded-2xl p-5 shadow-sm border border-border transition-colors">
              <h4 className="font-semibold text-content-primary mb-3">{t('profile.security')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: '🔐', title: t('profile.twoFactor'), sub: t('profile.twoFactorSub') },
                  { icon: '💻', title: t('profile.sessions'), sub: t('profile.sessionsSub') },
                ].map(item => (
                  <div key={item.title}
                    className="flex items-center gap-3 bg-surface-raised rounded-xl p-3 hover:bg-surface-overlay transition-colors cursor-pointer border border-border">
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-content-primary">{item.title}</p>
                      <p className="text-xs text-content-muted">{item.sub}</p>
                    </div>
                    <span className="text-content-muted">›</span>
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
