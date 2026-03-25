import React from 'react'
import Input from '../components/Input'
import { Actions, Card, CardContent, CardHeader } from '../components/Card'
import GoogleButton from '../components/GoogleButton'
import { Link } from 'react-router-dom'
import { Button } from '../components/Buttons'
import { FlexContainer, Footer } from '../components/Containers'


const handelSubmit = (event: any) => {
  event.preventDefaut()
}

const SignupPage: React.FC = () => {
  return (
    <>
    <div className="min-h-screen bg-background dark:bg-backgound-dark  flex flex-col items-center justify-center px-4 py-12">
      <Card className='border-none md:border-gray-800 w-full md:bg-white bg-transparent max-w-[fit-content]'>

        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
          <p className="text-sm text-blue-600 mb-7">
            Please fill in the details.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handelSubmit}>

            <Input label="Full Name" placeholder="John Doe" icon="👤" />
            <Input
              label="Email Address"
              type="email"
              placeholder="john@Opica.com"
              icon="✉️"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-blue-600">
                Choose your role
              </label>
              <div className="relative">
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
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

            <Actions>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon="🔒"
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                icon="🔒"
              />
            </Actions>
            <FlexContainer className='!flex-col my-5'>

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

              <Button style='primary' className="w-full">Create My Account →</Button>

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
                  <Button style='outline'>
                    Sign In
                  </Button>
                </Link>
              </p>
            </FlexContainer>

          </form>
        </CardContent>


      </Card>
    </div>
        <Footer />
        </>
  )
}

export default SignupPage
