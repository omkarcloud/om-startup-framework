import { GoogleOAuthProvider } from '@react-oauth/google'
import Config from '../../utils/config'
import { GoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiCard,
  EuiFieldPassword,
  EuiText,
  EuiLink,
  EuiCallOut,
} from '@elastic/eui'
import Toast from '@omkar111111/components/Toast'
import FrontendAxios from '../../utils/axios/frontend'
import Api from '../../utils/api'
import Link from 'next/link'
import { pushToHome } from '../../utils/next'
import { isEmptyString, isValidEmail } from '../../utils/data/validators'
import Messages from '../../utils/messages'
import { isNotEmpty } from '../../utils/missc'


function GoogleAuth() {
  const router = useRouter()

  const validateTokenAndObtainSession = token => {
    return Api.sendGoogleAuthToken(token).then(() => {
      pushToHome(router)
    })
  }

  function showErrorToast() {
    Toast.error('Failed to login to Google. Please try again.')
  }

  function onGoogleLoginFailure(response) {
    console.error(response)
    showErrorToast()
  }

  const onGoogleLoginSuccess = token => {
    validateTokenAndObtainSession(token).catch(onGoogleLoginFailure)
  }

  return (
    <div className="space-x-4 child-iframe-m-auto">
      <GoogleOAuthProvider clientId={Config.OAUTH_CLIENT_ID}>
        <GoogleLogin
          type="standard"
          theme="outline"
          shape="pill"
          text="continue_with"
          onSuccess={credentialResponse => {
            onGoogleLoginSuccess(credentialResponse.credential)
          }}
          onError={() => {
            showErrorToast()
          }}
        />
      </GoogleOAuthProvider>
    </div>
  )
}




function isValidPassword(password: string) {
  return password.length >= 8
}

function SignUpForm() {
  const referral_code = typeof window !== 'undefined' && localStorage.getItem('referral_code')
  const has_referral_code = typeof window !== 'undefined' && isNotEmpty(referral_code)
  const referrer_first_name = typeof window !== 'undefined' && localStorage.getItem('referrer_first_name')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

  const errors = []
  if (isEmptyString(name)) {
    errors.push(Messages.NAME_IN_VALID)
  }

  if (!isValidEmail(email)) {
    errors.push(
      Messages.EMAIL_IN_VALID
    )
  }

  if (!isValidPassword(password)) {
    errors.push(Messages.PASSWORD_IN_VALID)
  }

  const isInvalid = errors.length > 0

  function handleSubmit(e) {
    e.preventDefault()

    setHasSubmittedOnce(true)
    if (!isInvalid) {
      FrontendAxios.post('/auth/sign-up/', {
        name,
        email,
        password,
      }).then(() => {
        Toast.success(
          'Thank you for signing up! An email confirmation has been sent to your inbox.'
        )
      })
    }
  }

  return (
    <div className="page-card-wrapper ">

      {has_referral_code && <>
        <EuiCallOut className='' title={`You are joining using referral link of ${referrer_first_name}, So you will receive a discount of 10% on your payments for a duration of 24 months.`} color="success" iconType="user" />
      </>
      }

      {has_referral_code && <EuiSpacer />}

      <EuiCard title="Sign Up">
        <div className='mt-6' />
        <GoogleAuth />
        <EuiText className='py-6'>
          <u>OR</u>
        </EuiText>
        <div className="text-left">
          <EuiForm
            isInvalid={hasSubmittedOnce && isInvalid && true}
            error={hasSubmittedOnce && isInvalid && errors}
            component="form"
            onSubmit={handleSubmit}>
            <EuiFormRow label="Name" fullWidth>
              <EuiFieldText
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
              />
            </EuiFormRow>
            <EuiFormRow label="Email" fullWidth>
              <EuiFieldText
                type={"email"}

                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
              />
            </EuiFormRow>
            <EuiFormRow label="Password" fullWidth>
              <EuiFieldPassword
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="dual"
                fullWidth
              />
            </EuiFormRow>
            <EuiSpacer />
            <div className="text-center">
              <EuiButton type="submit" fill>
                Submit
              </EuiButton>
            </div>
            <EuiSpacer />
            <EuiText className="text-center">
              Signing up for a yourcompanyname account means you agree to the{' '}
              <Link href="/legal/privacy/" passHref>
                <EuiLink>Privacy Policy</EuiLink>
              </Link>{' '}
              and{' '}
              <Link href="/legal/terms/" passHref>
                <EuiLink> Terms of Service</EuiLink>
              </Link>
              .
            </EuiText>
            <EuiSpacer />
            <EuiText className="text-center">
              Have an Account?{' '}
              <Link href="/auth/sign-in/" passHref>
                <EuiLink>Sign In</EuiLink>
              </Link>
            </EuiText>
          </EuiForm>
        </div>
      </EuiCard>
    </div>
  )
}

function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

  const router = useRouter()

  const errors = []

  if (!isValidEmail(email)) {
    errors.push(
      Messages.EMAIL_IN_VALID
    )
  }

  const isInvalid = errors.length > 0

  function handleSubmit(e) {
    e.preventDefault()
    setHasSubmittedOnce(true)
    if (!isInvalid) {
      FrontendAxios.post('/auth/sign-in/', {
        email,
        password,
      }).then(() => {
        pushToHome(router)
      })
    }
  }

  return (
    <div className="page-card-wrapper ">
      <EuiCard title="Sign In">
        <div className='mt-6' />
        <GoogleAuth />
        <EuiText className='py-6'>
          <u>OR</u>
        </EuiText>
        <div className="text-left">
          <EuiForm
            isInvalid={hasSubmittedOnce && isInvalid && true}
            error={hasSubmittedOnce && isInvalid && errors}
            component="form"
            onSubmit={handleSubmit}>
            <EuiFormRow label="Email" fullWidth>
              <EuiFieldText
                type={"email"}

                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
              />
            </EuiFormRow>
            <EuiFormRow label="Password" fullWidth>
              <EuiFieldPassword
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="dual"
                fullWidth
              />
            </EuiFormRow>
            <EuiSpacer />

            <div className="text-center">
              <EuiButton type="submit" fill>
                Submit
              </EuiButton>
            </div>
            <EuiSpacer />
            <div className="flex justify-between">
              <Link href="/auth/sign-up/" passHref>
                <EuiLink>Don't have an account?</EuiLink>
              </Link>
              <Link href="/auth/forgot-password/" passHref>
                <EuiLink>Forgot password?</EuiLink>
              </Link>
            </div>
          </EuiForm>
        </div>
      </EuiCard>
    </div>
  )
}

function SendPasswordResetForm() {
  const [email, setEmail] = useState('')

  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

  const errors = []

  if (!isValidEmail(email)) {
    errors.push(
      Messages.EMAIL_IN_VALID
    )
  }

  const isInvalid = errors.length > 0

  function handleSubmit(e) {
    e.preventDefault()
    setHasSubmittedOnce(true)
    if (!isInvalid) {
      FrontendAxios.post('/auth/reset-password-send/', { email }).then(() => {
        Toast.success(
          'Password reset instructions have been sent to your registered email address. Please check your email to reset your password.'
        )
      })
    }
  }

  return (
    <div className="page-card-wrapper ">
      <EuiCard title="Reset your password">
        <div className="text-left">
          <EuiForm
            className='mt-6'
            isInvalid={hasSubmittedOnce && isInvalid && true}
            error={hasSubmittedOnce && isInvalid && errors}
            component="form"
            onSubmit={handleSubmit}>
            <EuiFormRow label="Email" fullWidth>
              <EuiFieldText
                type={"email"}

                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
              />
            </EuiFormRow>
            <EuiSpacer />
            <div className="text-center">
              <EuiButton type="submit" fill>
                Submit
              </EuiButton>
            </div>
          </EuiForm>
        </div>
      </EuiCard>
    </div>
  )
}

function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

  const router = useRouter()

  const errors = []

  if (!isValidPassword(password)) {
    errors.push(Messages.PASSWORD_IN_VALID)
  }

  if (password !== confirmPassword) {
    errors.push(Messages.CONFIRM_PASSWORD_IN_VALID)
  }

  const isInvalid = errors.length > 0

  function handleSubmit(e) {
    e.preventDefault()
    setHasSubmittedOnce(true)
    if (!isInvalid) {
      FrontendAxios.post(`/auth/reset-password-change/${token}/`, {
        password,
      }).then(() => pushToHome(router))
    }
  }

  return (
    <div className="page-card-wrapper ">
      <EuiCard title="Reset your password">
        <div className="text-left">
          <EuiForm
            className='mt-6'
            isInvalid={hasSubmittedOnce && isInvalid && true}
            error={hasSubmittedOnce && isInvalid && errors}
            component="form"
            onSubmit={handleSubmit}>
            <EuiFormRow label="Password" fullWidth>
              <EuiFieldPassword
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="dual"
                fullWidth
              />
            </EuiFormRow>
            <EuiFormRow label="Confirm Password" fullWidth>
              <EuiFieldPassword
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type="dual"
                fullWidth
              />
            </EuiFormRow>
            <EuiSpacer />
            <div className="text-center">
              <EuiButton type="submit" fill>
                Submit
              </EuiButton>
            </div>
          </EuiForm>
        </div>
      </EuiCard>
    </div>
  )
}

export { SendPasswordResetForm, ResetPasswordForm, SignInForm, SignUpForm }
