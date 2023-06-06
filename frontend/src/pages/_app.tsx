import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Router, { useRouter } from 'next/router'
import NextApp from 'next/app'
import Head from 'next/head'
import { EuiErrorBoundary } from '@elastic/eui'
import { Global } from '@emotion/react'
import Chrome from '../components/chrome'
import { Theme } from '../components/theme'
import { globalStyles } from '../styles/global.styles'

import Hooks from '@omkar111111/utils/hooks'
import Analytics from '../utils/analytics'
import Api, { is403, is404 } from '../utils/api'
import Links from '../utils/data/links'
import { AuthProvider } from '../components/auth/context'
import { isNotEmpty } from '../utils/missc'
import Config from '../utils/config'
/**
 * Next.js uses the App component to initialize pages. You can override it
 * and control the page initialization. Here use use it to render the
 * `Chrome` component on each page, and apply an error boundary.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */

const EuiApp = ({ Component, pageProps }) => {
  const router = useRouter()

  Hooks.useDidMount(() => {
    const handleRouteChange = (url) => {
      if (pageProps.is_authenticated) {
        Analytics.trackVisit()
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)


    Analytics.trackVisit()
    Analytics.trackExceptions()
    Analytics.trackTimeSpent()

    const urlParams = new URLSearchParams(window.location.search)
    const referral_code = urlParams.get("j")

    if (isNotEmpty(referral_code)) {
      Api.incrementReferralLinkClicks(referral_code).then(() => {
        const isSelfReferral = pageProps.referral_code === referral_code
        if (!localStorage.getItem('referral_code') && !isSelfReferral) {
          Api.getFirstNameByReferralCode(referral_code).then(
            ({ data: { first_name } }) => {
              localStorage.setItem('referrer_first_name', first_name)
              localStorage.setItem('referral_code', referral_code)
            }
          ).catch(console.error)
        }
      }).catch(console.error)
    }

    if (!localStorage.getItem('first_visit')) {
      // If it does not exist, set it and the referral and campaign params
      localStorage.setItem('first_visit', "True")
      localStorage.setItem('first_referrer', document.referrer)

      // Get all the URL query parameters and store them in local storage
      const paramsObj = {}

      //@ts-ignore
      for (const [key, value] of urlParams.entries()) {
        paramsObj[key] = value
      }

      localStorage.setItem('first_url_params', JSON.stringify(paramsObj))
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  })

  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q3CFEJ2LFM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q3CFEJ2LFM', {
              page_path: window.location.pathname,
              });
          `,
          }}
        />
      </Head>
      <Global styles={globalStyles} />
      <Theme>
        <Chrome>
          <EuiErrorBoundary>
            <AuthProvider {...pageProps}>
              <Component {...pageProps} />
            </AuthProvider>
          </EuiErrorBoundary>
        </Chrome>
      </Theme>
    </>
  )
}

function redirect(isServer, res, page, isPermanent = false) {
  if (isServer) {
    res.writeHead(isPermanent ? 301 : 302, {
      Location: page,
    })

    res.end()
  } else {
    // client
    Router.push(page)
  }
  return {}
}

EuiApp.getInitialProps = async props => {
  const {
    ctx,
    Component: { getInitialProps },
  } = props

  const isServer = ctx.req
  const res = ctx.res
  const path = ctx.asPath

  const isStaffPage = path.startsWith('/staff/')
  const isBannedPage = path.startsWith(Links.banned)
  const isContactUsPage = path.startsWith(Links.contactUs)
  const isDeletedPage = path.startsWith(Links.deleted)
  const is404Page = path.startsWith(Links.notFound)
  const isOnboardingPage = path.startsWith(Links.onboarding)

  const getResponse = async () => {
    try {
      if (isServer) {
        return [(await Api.getMe(ctx.req.headers.cookie)).data, false]
      
      } else {
        return [(await Api.getMe(undefined)).data, false]
      }
    } catch (error) {
      if (is404(error)) {
        return [{}, true]
      }

      throw error
    }
  }

  const [data, is_user_deleted] = await getResponse()

  let { is_banned, is_admin, has_on_boarded, is_authenticated } = data

  if (isBannedPage || is404Page || isDeletedPage) {
    return {}
  } else if (is_user_deleted) {
    return redirect(isServer, res, Links.deleted)
  } else if (is_banned) {
    return redirect(isServer, res, Links.banned)
  } else if (!is_admin && isStaffPage) {
    return redirect(isServer, res, Links.notFound)
  } else {
    const appProps = await NextApp.getInitialProps(props)

    const componentPageProps = getInitialProps
      ? await getInitialProps(ctx)
      : {}

    const result = {
      ...appProps,
      pageProps: {
        ...data,
        ...componentPageProps,
      },
    }

    if (isContactUsPage) {
      return result
    } else if (isOnboardingPage) {
      if (has_on_boarded) {
        return redirect(isServer, res, Links.home)
      } else {
        return result
      }
    } else if (is_authenticated && !has_on_boarded) {
      return redirect(isServer, res, Links.onboarding)
    } else {
      return result
    }
  }
}

export default EuiApp