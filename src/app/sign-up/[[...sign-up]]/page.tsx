'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <div className="h-screen flex items-center justify-between p-8">
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="400" height="400">
          <path fill="#fff"
            d="M5 50 L45 5 L60 5 L20 50 L60 95 L45 95 Z" />
          <path fill="#fff"
            d="M35 50 L75 5 L90 5 L50 50 L90 95 L75 95 Z" />

        </svg>

      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">Happening now</h1>
        <h1 className="text-2xl">Join today.</h1>
        <SignUp.Root >
          <SignUp.Step name="start" className='flex flex-col gap-4'>
            <Clerk.Connection name='google' className='bg-white rounded-full p-2 text-black w-72 flex items-center justify-center gap-2 font-bold'>
              <svg width="24" height="24" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.54 1.22 8.98 3.22l6.7-6.7C35.64 2.34 30.36 0 24 0 14.62 0 6.44 5.38 2.56 13.22l7.98 6.2C12.38 13.44 17.7 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.64-.15-3.22-.43-4.74H24v9.02h12.5c-.54 2.9-2.18 5.36-4.6 7.02l7.1 5.5c4.14-3.82 6.5-9.46 6.5-16.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.54 28.42A14.5 14.5 0 0 1 9.5 24c0-1.54.26-3.02.72-4.42l-7.98-6.2A23.92 23.92 0 0 0 0 24c0 3.86.92 7.5 2.56 10.78l7.98-6.36z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.36 0 11.7-2.1 15.6-5.7l-7.1-5.5c-1.98 1.34-4.52 2.14-8.5 2.14-6.3 0-11.62-3.94-13.46-9.36l-7.98 6.36C6.44 42.62 14.62 48 24 48z"
                />
              </svg>

              Sign in with Google
            </Clerk.Connection>
            <Clerk.Connection
              name="apple"
              className="bg-white rounded-full p-2 text-black w-72 flex items-center justify-center gap-2 font-bold"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.365 1.43c0 1.14-.414 2.205-1.206 3.043-.79.85-2.1 1.51-3.31 1.41-.15-1.13.45-2.32 1.19-3.1.82-.84 2.21-1.47 3.33-1.35z"
                  fill="black"
                />
                <path
                  d="M20.8 17.55c-.44 1.01-.64 1.46-1.2 2.36-.78 1.24-1.88 2.79-3.24 2.8-1.21.01-1.52-.8-3.15-.8-1.63 0-1.98.79-3.17.82-1.36.03-2.4-1.4-3.18-2.63-2.18-3.4-2.4-7.38-1.07-9.45.94-1.45 2.44-2.3 3.85-2.3 1.46 0 2.38.82 3.59.82 1.18 0 1.9-.83 3.58-.83 1.26 0 2.6.7 3.54 1.9-3.12 1.7-2.61 6.16.45 7.3z"
                  fill="black"
                />
              </svg>
              Sign in with Apple
            </Clerk.Connection>
            <div className="flex flex-col gap-4">
              Sign up with Credentials

              <Clerk.Field name="username" className="flex flex-col gap-2">
                <Clerk.Input
                  className="py-2 px-6 rounded-full text-black w-72 placeholder:text-sm"
                  placeholder="Username"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>

              <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
                <Clerk.Input
                  className="py-2 px-6 rounded-full text-black w-72 placeholder:text-sm"
                  placeholder="E-mail"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>

              <Clerk.Field name="password" className="flex flex-col gap-2">
                <Clerk.Input
                  className="py-2 px-6 rounded-full text-black w-72 placeholder:text-sm"
                  placeholder="Password"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>
              <SignUp.Captcha />
              <SignUp.Action submit className="mt-3 w-72 bg-iconBlue rounded-full p-2 text-white font-bold  text-center">Sign Up</SignUp.Action>
            </div>
          </SignUp.Step>
          <SignUp.Step name="continue">
            <Clerk.Field name="username">
              <Clerk.Input className="py-2 px-6 rounded-full text-black w-72 placeholder:text-sm" placeholder="Username" />
              <Clerk.FieldError className="text-red-300 text-sm" />
            </Clerk.Field>

            <SignUp.Action submit className="mt-3 w-72 bg-iconBlue rounded-full p-2 text-white font-bold  text-center">Continue</SignUp.Action>
          </SignUp.Step>
          <SignUp.Step name="verifications">
            <SignUp.Strategy name="email_code">
              <h1 className="text-sm mb-2">Check your E-mail</h1>

              <Clerk.Field name="code" className="flex flex-col gap-4">
                <Clerk.Input
                  placeholder="Verification code"
                  className="py-2 px-6 rounded-full text-black w-72 placeholder:text-sm"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>

              <SignUp.Action
                submit
                className="mt-3 w-72 bg-iconBlue rounded-full p-2 text-white font-bold"
              >
                Verify
              </SignUp.Action>
            </SignUp.Strategy>
          </SignUp.Step>
          {/* OR SIGNUP */}
          <div className="w-72 flex items-center gap-4">
            <div className="h-px bg-borderGray flex-grow"></div>
            <span className="text-textGrayLight">or</span>
            <div className="h-px bg-borderGray flex-grow"></div>
          </div>

          <Link
            href="/sign-in"
            className="bg-iconBlue rounded-full p-2 text-white font-bold w-72 text-center"
          >
            Already have an account?
          </Link>
        </SignUp.Root>
      </div>
    </div >
  );
};

export default SignUpPage;