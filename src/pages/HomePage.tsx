import React from 'react'
import Navbar from '../components/Navbar'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { Button } from '../components/Buttons'
import { fakeUser, homeStats, projects } from '../data/fakeData'
import { Link } from 'react-router-dom'
import { FlexContainer, Footer } from '../components/Containers'
import { Card, CardContent, CardHeader } from '../components/Card'
import { useT } from '../lib/i18n'

const statIcons = [
  <svg key="0" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
]

const HomePage: React.FC = () => {
  const { t } = useT()
  const [isAuthenticated] = React.useState(true)

  return (
    <main className="min-h-screen bg-surface-overlay transition-colors">
      <Navbar />
      <div className="m-5 px-4 sm:px-6 py-6">

        {/* Hero */}
        <FlexContainer className='!no-wrap md:!flex-row-reverse mb-24'>
          <div className="md:w-[35vw] w-full md:!h-[35vw] h-72 rounded-[24px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
              alt="Software engineering" className="w-full h-full object-cover" />
          </div>
          <FlexContainer className='!flex-col justify-center flex-1'>
            <p className="text-content-muted text-xs mb-1">{t('home.greeting')}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-content-primary mb-2">
              {t('home.welcomeBack')}{' '}
              <span className="text-primary">{fakeUser.name}</span>
            </h1>
            <p className="text-content-secondary text-sm mb-5 max-w-sm leading-relaxed">{t('home.heroSubtitle')}</p>
            <div className="flex gap-3 flex-wrap">
              <Link to={isAuthenticated ? '/Profile' : '/signin'}>
                <Button style="primary">{t('home.startProject')}</Button>
              </Link>
              <Link to={isAuthenticated ? "/Admin" : '/signin'}>
                <Button style='outline'>{t('home.viewDashboard')}</Button>
              </Link>
            </div>
          </FlexContainer>
        </FlexContainer>

        {/* Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12">
          {homeStats.map((s, i) => (
            <div key={s.label}
              className={`rounded-2xl p-5 shadow-sm flex flex-col gap-3 transition-colors ${
                s.accent ? 'bg-primary text-white' : 'bg-surface border border-border'
              }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                s.accent ? 'bg-white/20 text-white' : 'bg-primary-light text-primary'
              }`}>
                {statIcons[i]}
              </div>
              <div>
                <p className={`text-3xl font-bold ${s.accent ? 'text-white' : 'text-content-primary'}`}>{s.value}</p>
                <p className={`text-xs uppercase tracking-widest font-medium mt-0.5 ${s.accent ? 'text-white/70' : 'text-content-muted'}`}>
                  {t(`home.${s.label === 'Active Projects' ? 'activeProjects' : s.label === 'Pending Approvals' ? 'pendingApprovals' : 'unreadMessages'}`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-12">
          {/* Profile card */}
          <Card className="dark:!bg-surface-raised dark:!border-border">
            <CardHeader className='flex flex-col items-center pb-8'>
              <Avatar initials={fakeUser.initials} size="lg" />
              <h3 className="font-bold text-content-primary mt-3">{fakeUser.name}</h3>
            </CardHeader>
            <CardContent className='!p-0 items-start'>
              <p className="text-content-muted p-3 text-sm">{fakeUser.title}</p>
              <div className="w-full space-y-2.5 text-left flex flex-col gap-2 mb-12">
                {[{ icon: '✉️', text: fakeUser.email }, { icon: '📍', text: fakeUser.location }, { icon: '✅', text: fakeUser.member }].map(item => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-content-secondary">
                    <span>{item.icon}</span><span>{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <Link to="/Profile"><Button style='outline'>{t('home.editProfile')}</Button></Link>
          </Card>

          <FlexContainer className='!flex-col grid-span gap-12'>
            {/* Recent Projects */}
            <Card className="w-full dark:!bg-surface-raised dark:!border-border">
              <CardHeader className="flex items-center !justify-between w-full mb-4">
                <h3 className="font-bold text-content-primary">{t('home.recentProjects')}</h3>
                <button className="text-primary text-xs hover:underline">{t('home.viewAll')}</button>
              </CardHeader>
              <div className="space-y-3 w-full">
                {projects.map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-raised transition-colors">
                    <div className={`w-10 h-10 rounded-xl ${p.iconBg} flex items-center justify-center text-base flex-shrink-0`}>{p.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-content-primary truncate">{p.name}</p>
                      <p className="text-xs text-content-muted">{p.updated}</p>
                    </div>
                    <Badge label={p.status} color={p.statusColor} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Info cards */}
            <FlexContainer className="gap-4">
              <div className="bg-surface-dark rounded-2xl p-5 flex-1">
                <h4 className="font-bold text-white mb-1">{t('home.proInsights')}</h4>
                <p className="text-content-muted text-xs leading-relaxed mb-4">{t('home.proInsightsText')}</p>
                <button className="bg-white text-surface-dark text-xs font-semibold px-4 py-2 rounded-lg hover:bg-surface-raised transition-colors">
                  {t('home.readArticle')}
                </button>
              </div>
              <div className="bg-primary-light rounded-2xl p-5 border border-primary/20 flex-1">
                <h4 className="font-bold text-content-primary mb-1">{t('home.needHelp')}</h4>
                <p className="text-content-secondary text-xs leading-relaxed mb-3">{t('home.needHelpText')}</p>
                <button className="text-primary text-xs font-semibold hover:underline">{t('home.scheduleCall')}</button>
              </div>
            </FlexContainer>
          </FlexContainer>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default HomePage
