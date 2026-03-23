import React from 'react'
import Navbar from '../components/Navbar'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { Button } from '../components/Buttons'
import { fakeUser, homeStats, projects } from '../data/fakeData'
import { Link } from 'react-router-dom'
import { FlexContainer } from '../components/Containers'
import { Card, CardContent, CardHeader } from '../components/Card'


const statIcons = [
  <svg key="0" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
]


const HomePage: React.FC = () => {
  const [isAuthinticated] = React.useState(true)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="m-5  px-4 sm:px-6 py-6">
        {/* ── Hero Banner ── */}
        <FlexContainer className='!no-wrap md:!flex-row-reverse mb-24 '>

          <div className="md:w-[35vw] w-full md:!h-[35vw] h-98 rounded-[24px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80"
              alt="Architecture building"
              className="w-full h-full object-cover"
            />
          </div>

          <FlexContainer className='!flex-col justify-center flex-1'>
            <p className="text-gray-400 text-xs mb-1">Good morning 👋</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome back,{' '}
              <span className="text-blue-600">{fakeUser ? fakeUser.name : ""}</span>
            </h1>
            <p className="text-gray-500 text-sm mb-5 max-w-sm leading-relaxed">
              Manage your architectural requests, view active project
              timelines, and connect with your dedicated design team all in
              one central workspace.
            </p>
            <div className="flex gap-3 flex-wrap">

              <Link to={isAuthinticated ? '/Profile' : '/signin'}>
                <Button style="primary">
                  Start New Project →
                </Button>
              </Link>
              <Link to={isAuthinticated ? "/Dashbaord" : '/signin'}>
                <Button style='outline'>
                  Dashbaord
                </Button>
              </Link>
            </div>
          </FlexContainer>
        </FlexContainer>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 my-12">
          {homeStats.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-2xl p-5 shadow-sm flex flex-col gap-3 ${s.accent
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-100'
                }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.accent ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-500'
                  }`}
              >
                {statIcons[i]}
              </div>
              <div>
                <p
                  className={`text-3xl font-bold ${s.accent ? 'text-white' : 'text-gray-900'
                    }`}
                >
                  {s.value}
                </p>
                <p
                  className={`text-xs uppercase tracking-widest font-medium mt-0.5 ${s.accent ? 'text-blue-200' : 'text-gray-400'
                    }`}
                >
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Row ── */}
        <div className="flex flex-col md:grid md:grid-cols-3 md:gridCols gap-12">

          {/* Profile Card */}
          <Card>
            <CardHeader className='flex flex-col items-center pb-8'>
              <Avatar initials={fakeUser.initials} size="lg" />
              <h3 className="font-bold text-gray-900 mt-3">{fakeUser.name}</h3>
            </CardHeader>
            <CardContent className='!p-0 items-start'>
              <p className="text-gray-400 p-3 text-s">{fakeUser.title}</p>
              <div className="w-full space-y-2.5 text-left flex flex-col gap-2 mb-12">
                {[
                  { icon: '✉️', text: fakeUser.email },
                  { icon: '📍', text: fakeUser.location },
                  { icon: '✅', text: fakeUser.member },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 text-m text-gray-600"
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <Link to={"/Profile"} className='p-0'>
              <Button style='outline'>
                Edit Profile
              </Button>
            </Link>
          </Card>

          <FlexContainer className='gridbg !flex-col  gap-12'>

            {/* Recent Projects */}
            <Card className='w-full'>
              <CardHeader className="flex items-center !justify-between w-full  mb-4">
                <h3 className="font-bold text-gray-900">Recent Projects</h3>
                <button className="text-blue-500 text-xs hover:underline flex items-center gap-1">
                  View All ↗
                </button>
              </CardHeader>

              <div className="space-y-3 w-full">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${p.iconBg} flex items-center justify-center text-base flex-shrink-0`}
                    >
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-400">{p.updated}</p>
                    </div>
                    <Badge label={p.status} color={p.statusColor} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Info Cards */}
            <FlexContainer className="gridbg gap-12">
              <div className="bg-gray-900 rounded-2xl p-5 flex-1">
                <h4 className="font-bold text-white mb-1">Pro Insights</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                  Read the latest trends in sustainable architecture for 2024.
                </p>
                <button className="bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Read Article
                </button>
              </div>
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <h4 className="font-bold text-gray-800 mb-1">Need Help?</h4>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">
                  Our design consultants are available for a 1-on-1 session.
                </p>
                <button className="text-blue-600 text-xs font-semibold hover:underline">
                  Schedule Call →
                </button>
              </div>
            </FlexContainer>
          </FlexContainer>
        </div>
      </div >
    </div >
  )
}

export default HomePage
