
import { EuiButton, EuiCallOut, EuiIconTip } from '@elastic/eui'
import { useState } from 'react'
import FAQ, { FaqWrapper } from '../components/Faq'
import Footer, { Social } from '../components/Footer'
import Seo from '../components/Seo'
import AuthedLanding from '../layouts/AuthedLanding'
import UnAuthedLanding from '../layouts/UnAuthedLanding'
import { pricingFaqItems } from '../utils/data/faq'
import CenterContent from '../components/CenterContent'
import Link from 'next/link'
import Links from '../utils/data/links'
import usePricingContactUs from '../components/modals/usePricingContactUs'
import { H1Text } from '../components/H1Text'
import { useAuth } from '../components/auth/context'
import { isNotEmpty } from '../utils/missc'
import { GetServerSideProps } from 'next/types'
import AxiosInstance from '../utils/axios'

function PricingInfo({ content }) {
  return (<div
    style={{ marginTop: '-1px' }} className='ml-1'
  >
    <EuiIconTip
      // color="subdued"
      type="iInCircle"
      size='m'
      content={content}
      iconProps={{

      }}
    />
  </div>)
}
function WhatsappUs() {
  return <CenterContent className="pt-16 pb-8"><EuiButton href={Social.whatsapp} target="_blank" className='cta-button' fill>
    <div className='flex space-x-4'>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="fill-current text-white dark:text-gray-200 h-6 w-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </span>
      <span>
        Whatsapp Us
      </span>
    </div>
  </EuiButton></CenterContent>
}


function objectToList(obj) {
  const keys = Object.keys(obj)

  const list = []

  keys.forEach((key) => {
    const data = obj[key]

    const yearlyMonthlyPrice = data['MonthlyPrice'] * 12
    const yearlyTotalMonthlyDiscountedPrice = data['MonthlyDiscountedPrice'] * 12
    const savingsAnnual = yearlyMonthlyPrice - yearlyTotalMonthlyDiscountedPrice


    const yearlyReferredMonthlyPrice = data['ReferredMonthlyPrice'] * 12
    const yearlyReferredMonthlyDiscountedPrice = data['ReferredMonthlyDiscountedPrice'] * 12
    const savingsAnnualReferred = yearlyReferredMonthlyPrice - yearlyReferredMonthlyDiscountedPrice

    list.push({
      ...data, country: key,

      savingsAnnual: savingsAnnual + ` (${Math.floor(savingsAnnual / data['MonthlyPrice'])}) Months Saving`,
      savingsAnnualReferred: savingsAnnualReferred + ` (${Math.floor(savingsAnnual / data['ReferredMonthlyPrice'])}) Months Saving`,

      yearlyTotalMonthlyDiscountedPrice, yearlyReferredMonthlyDiscountedPrice,
    })
  })

  return list
}
const Pricing = {
  "IN": {
    currencySymbol: "₹",
    MonthlyPrice: 899,
    MonthlyDiscountedPrice: 699,
    ReferredMonthlyPrice: 2500,
    ReferredMonthlyDiscountedPrice: 1900,
  },
  "US": {
    currencySymbol: "$",
    // MonthlyPrice: 35,
    // MonthlyDiscountedPrice: 28,
    // TODO: Change Referral price
    MonthlyPrice: 79,
    MonthlyDiscountedPrice: 69,
    ReferredMonthlyPrice: 31.5,
    ReferredMonthlyDiscountedPrice: 25,
  },
  "BD": {
    currencySymbol: "৳",
    MonthlyPrice: 3600,
    MonthlyDiscountedPrice: 2800,
    ReferredMonthlyPrice: 3200,
    ReferredMonthlyDiscountedPrice: 2600,
  },
  "PK": {
    currencySymbol: '₨',
    MonthlyPrice: 9600,
    MonthlyDiscountedPrice: 7800,
    ReferredMonthlyPrice: 8800,
    ReferredMonthlyDiscountedPrice: 6800,
  },
  "GB": {
    currencySymbol: "£",
    MonthlyPrice: 28,
    MonthlyDiscountedPrice: 22,
    ReferredMonthlyPrice: 25,
    ReferredMonthlyDiscountedPrice: 20
  },
  "PH": {
    currencySymbol: "₱",
    MonthlyPrice: 1800,
    MonthlyDiscountedPrice: 1400,
    ReferredMonthlyPrice: 1600,
    ReferredMonthlyDiscountedPrice: 1200,
  },
  "NG": {
    currencySymbol: "₦",
    MonthlyPrice: 16000,
    MonthlyDiscountedPrice: 12000,
    ReferredMonthlyPrice: 14000,
    ReferredMonthlyDiscountedPrice: 11000,
  },
  "CN": {
    currencySymbol: "¥",
    MonthlyPrice: 240,
    MonthlyDiscountedPrice: 180,
    ReferredMonthlyPrice: 200,
    ReferredMonthlyDiscountedPrice: 160,
  },
}
export const PricingList = objectToList(Pricing)

function Section1Child({ country }) {
  const { referred_by, referred_by_first_name } = useAuth()

  const data = Pricing[country] ? Pricing[country] : Pricing["US"]
  const is_referred = isNotEmpty(referred_by)

  let MonthlyPrice = is_referred ? data["ReferredMonthlyPrice"] : data["MonthlyPrice"]
  let MonthlyDiscountedPrice = is_referred ? data["ReferredMonthlyDiscountedPrice"] : data["MonthlyDiscountedPrice"]


  const [isYearly, setIsYearly] = useState(true)
  const { modal, showModal } = usePricingContactUs()

  return (<>
    {modal}

    <div className="p-responsive container-xl text-center mt-7 mt-md-8 mt-lg-9 mb-5 mb-lg-9">
      <H1Text content="Get the Winning Sales Platform." />
      <div className="mt-4 mb-n5">
        <h2 className="h6-mktg mb-3">How often do you want to pay?</h2>

        <div className="d-inline-block text-center">
          <div className="d-flex flex-items-center rounded-3 color-bg-subtle p-1">
            <input type="radio" name="billing_cycle" className="radio-toggle-switch" defaultValue="monthly" id="cycle_monthly" hidden />
            <label onClick={() => { setIsYearly(false) }} htmlFor="cycle_monthly" className="d-block text-normal rounded-3 color-border-accent-emphasis color-fg-muted px-3 py-2 mr-1 cursor-pointer">
              Monthly
            </label>
            <input type="radio" name="billing_cycle" className="radio-toggle-switch" defaultValue="yearly" id="cycle_yearly" defaultChecked hidden />
            <label onClick={() => { setIsYearly(true) }} htmlFor="cycle_yearly" className="d-block text-normal rounded-3 color-border-accent-emphasis color-fg-muted px-3 py-2 mr-1 cursor-pointer">
              Yearly
              <span className="IssueLabel pl-1">
                <svg aria-hidden="true" height={16} viewBox="0 0 16 16" version="1.1" width={16} data-view-component="true" className="octicon octicon-tag color-fg-sponsors pt-1">
                  <path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
                </svg>
                <span className="text-gradient-purple-coral">Get 2 months free</span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div className="position-relative">
      <div className="d-none d-md-block position-absolute width-full left-0 right-0 z-n1" style={{ top: '40%' }}>
        <img className="width-full height-auto" src="https://github.githubassets.com/images/modules/site/features/launchpad/backgrounds/bg-whats-new.svg" aria-hidden="true" alt="" width={1676} height={1040} />
      </div>
      <div className="p-responsive container-xl text-center max-w-3xl">
        {is_referred && <div className='mt-12 md:mt-0 md:mb-12 '>
          <EuiCallOut title={`A discount of 10% on your payments has been applied for a duration of 24 months because you have signed up using referral link of ${referred_by_first_name}.`} color="success" iconType="user" /></div>}

        <div className="d-lg-flex flex-items-stretch gutter-lg-condensed text-center" data-hpc>
          <div className="col-lg-6 mb-3 mb-lg-0">
            <div className="height-full position-relative rounded-3 px-2 pt-5 pb-2 js-pricing-plan" data-min-seats={1} data-max-seats={4}>
              <div className="d-md-flex flex-column flex-justify-between height-full rounded-3 color-shadow-extra-large color-bg-default">
                <div className="px-3 pt-4 pb-3">
                  <h2 className="mb-2 h5-mktg">Free</h2>
                  <p className="color-fg-muted lh-condensed mb-2">The basic plan</p>
                  <div hidden className="js-monthly-cost tooltipped-n tooltipped-multiline tooltipped-no-delay " aria-label="Prices in local currency will change as the exchange rate fluctuates and are provided as a convenience. The actual charge will be USD $0 per user/month." data-plan="free">
                    <h3 className="mb-0">
                      <span className="d-flex flex-justify-center flex-items-center">
                        <span className="d-flex flex-items-center f0-mktg text-normal text-mono mr-2">
                          <sup className="f3 color-fg-muted v-align-middle mr-1">{data["currencySymbol"]}</sup>
                          <span className="js-computed-value" data-plan="free">0</span>
                        </span>
                        <span className="text-normal text-mono f4 color-fg-muted js-pricing-cost-suffix js-monthly-suffix">per user/month</span>
                      </span>
                    </h3>
                  </div>
                  <div className="js-yearly-cost tooltipped-n tooltipped-multiline tooltipped-no-delay " aria-label="Prices in local currency will change as the exchange rate fluctuates and are provided as a convenience. The actual charge will be USD $0 per user/month." data-plan="free">
                    <h3 className="mb-0">
                      <div className="d-flex flex-lg-column flex-lg-wrap flex-xl-nowrap flex-justify-center flex-items-center">
                        <div className="d-flex flex-lg-row flex-lg-wrap flex-justify-center flex-items-center">
                          <span className="d-flex flex-items-center f0-mktg text-normal text-mono mr-2 no-wrap">
                            <sup className="f3 color-fg-muted v-align-middle mr-1">{data["currencySymbol"]}</sup>
                            <span className="js-computed-value" data-plan="free">0</span>
                          </span>
                        </div>
                        <span className="text-normal text-center text-mono f6-mktg color-fg-muted">
                          <span>
                            per month
                          </span>
                        </span>
                      </div>
                    </h3>
                  </div>
                  <div className="mt-2">
                    <Link href={Links.signUp} passHref>
                      <a className="btn-mktg d-block btn-muted-mktg" >
                        Get Started
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="d-lg-block flex-auto text-left rounded-bottom-3 color-bg-subtle px-3 py-2 js-compare-features-item" style={{ display: 'none' }}>
                  <ul className="list-style-none">
                    <li className="position-relative">
                      <details className="Box-row pricing-card-accordion details-reset p-0 d-flex color-fg-muted">
                        <summary className="Details-element">
                          <div className="py-2 d-flex user-select-none">
                            <div className="pricing-card-accordion-state col-1 flex-shrink-0 color-fg-muted">
                            </div>
                            <div className="d-flex flex-column flex-items-baseline">
                              <div className="flex-auto d-flex text-bold">
                                3 Page View
                              </div>
                            </div>
                          </div>
                        </summary>
                      </details>
                    </li>
                    <li className="position-relative">
                      <details className="Box-row pricing-card-accordion details-reset p-0 d-flex color-fg-muted">
                        <summary className="Details-element">
                          <div className="py-2 d-flex user-select-none">
                            <div className="pricing-card-accordion-state col-1 flex-shrink-0 color-fg-muted">
                            </div>
                            <div className="d-flex flex-column flex-items-baseline">
                              <div className="flex-auto d-flex text-bold">
                                75 Email Credits
                              </div>

                            </div>

                          </div>
                        </summary>
                      </details>
                    </li>

                    <li className="position-relative">
                      <details className="Box-row pricing-card-accordion details-reset p-0 d-flex color-fg-muted">
                        <summary className="Details-element">
                          <div className="py-2 d-flex user-select-none">
                            <div className="pricing-card-accordion-state col-1 flex-shrink-0 color-fg-muted">
                            </div>
                            <div className="d-flex flex-column flex-items-baseline">
                              <div className="flex-auto text-bold">
                                75 Company Phone Credits
                              </div>
                            </div>
                          </div>
                        </summary>
                      </details>
                    </li>
                    <li className="position-relative">
                      <details className="Box-row pricing-card-accordion details-reset p-0 d-flex color-fg-muted">
                        <summary className="Details-element">
                          <div className="py-2 d-flex user-select-none">
                            <div className="pricing-card-accordion-state col-1 flex-shrink-0 color-fg-muted">
                            </div>
                            <div className="d-flex flex-column flex-items-baseline">
                              <div className="flex-auto text-bold">
                                75 Export Credits                                </div>
                            </div>
                          </div>
                        </summary>
                      </details>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-3 mb-lg-0">
            <div className="height-full position-relative rounded-3 px-2 pt-5 pb-2 js-pricing-plan pricing-recommended-plan" data-min-seats={5} data-max-seats={10}>
              <p className="position-absolute left-0 right-0 h5 text-center text-uppercase color-text-white js-recommended-plan-caption" style={{ top: '6px' }}>Most popular</p>
              <div className="d-md-flex flex-column flex-justify-between height-full rounded-3 color-shadow-extra-large color-bg-default">
                <div className="px-3 pt-4 pb-3">
                  <h2 className="mb-2 h5-mktg">Pro</h2>
                  <p className="color-fg-muted lh-condensed">The Pro Plan</p>
                  <div className="js-yearly-cost tooltipped-n tooltipped-multiline tooltipped-no-delay " aria-label="Prices in local currency will change as the exchange rate fluctuates and are provided as a convenience. The actual charge will be USD $4 per user/month." data-plan="business">
                    <h3 className="mb-0">
                      <div className="d-flex flex-lg-column flex-lg-wrap flex-xl-nowrap flex-justify-center flex-items-center">
                        <div className="d-flex flex-lg-row flex-lg-wrap flex-justify-center flex-items-center">
                          {isYearly ? <><span className="d-flex js-yearly-cost flex-items-center f1-mktg color-fg-subtle text-mono mr-2 no-wrap">
                            <sup className="f4 color-fg-subtle v-align-middle mr-1">{data["currencySymbol"]}</sup>
                            <span className="diagonal_line_through" data-plan="business">{MonthlyPrice}</span>
                          </span>
                            <span className="d-flex flex-items-center f0-mktg text-normal text-mono mr-2 no-wrap">
                              <sup className="f3 color-fg-muted v-align-middle mr-1">{data["currencySymbol"]}</sup>
                              <span className="js-computed-value" data-plan="business">{MonthlyDiscountedPrice}</span>
                            </span></> : <>
                            <span className="d-flex flex-items-center f0-mktg text-normal text-mono mr-2 no-wrap">
                              <sup className="f3 color-fg-muted v-align-middle mr-1">{data["currencySymbol"]}</sup>
                              <span className="js-computed-value" data-plan="business">{MonthlyPrice}</span>
                            </span></>}

                        </div>

                        <span className="text-normal text-center text-mono f6-mktg color-fg-muted">
                          <span>
                            per month
                          </span>
                        </span>
                      </div>
                    </h3>
                  </div>
                  <div className="mt-2">
                    <details className="select-menu details-reset details-overlay">
                      <summary onClick={showModal} className="d-block btn-mktg bg-cta" role="button">
                        Contact Us
                      </summary>
                    </details>
                  </div>
                </div>
                <ul className="d-lg-block flex-auto list-style-none text-left rounded-bottom-3 color-bg-subtle px-3 py-2 js-compare-features-item" style={{ display: 'none' }}>
                  <li className="position-relative">
                    <details className="Box-row pricing-card-accordion details-reset p-0 d-flex color-fg-muted">
                      <summary className="Details-element">
                        <div className="py-2 d-flex user-select-none">
                          <div className="pricing-card-accordion-state col-1 flex-shrink-0 color-fg-muted">
                          </div>
                          <div className="d-flex flex-column flex-items-baseline">
                            <div className="flex-auto text-bold">
                              ⚡ 100 Page Views
                            </div>
                          </div>
                        </div>
                      </summary>
                    </details>
                  </li>
                  <li className="position-relative">
                    <details className="Box-row pricing-card-accordion details-reset p-0 d-flex color-fg-muted">
                      <summary className="Details-element">
                        <div className="py-2 d-flex user-select-none">
                          <div className="pricing-card-accordion-state col-1 flex-shrink-0 color-fg-muted">
                          </div>
                          <div className="d-flex flex-column flex-items-baseline">
                            <div className="flex-auto text-bold">
                              ⚡ 2000 Email Credits
                            </div>
                          </div>
                          <PricingInfo content={"We limit your credit usage to 1 million credits to prevent abuse."} />
                        </div>
                      </summary>
                    </details>
                  </li>
                  <li className="position-relative">
                    <details className="Box-row pricing-card-accordion details-reset p-0 d-flex color-fg-muted">
                      <summary className="Details-element">
                        <div className="py-2 d-flex user-select-none">
                          <div className="pricing-card-accordion-state col-1 flex-shrink-0 color-fg-muted">
                          </div>
                          <div className="d-flex flex-column flex-items-baseline">
                            <div className="flex-auto text-bold">
                              ⚡ 2000 Company Phone Credits
                            </div>
                          </div>
                          <PricingInfo content={"We limit your credit usage to 1 million credits to prevent abuse."} />

                        </div>
                      </summary>
                    </details>
                  </li>
                  <li className="position-relative">
                    <details className="Box-row pricing-card-accordion details-reset p-0 d-flex color-fg-muted">
                      <summary className="Details-element">
                        <div className="py-2 d-flex user-select-none">
                          <div className="pricing-card-accordion-state col-1 flex-shrink-0 color-fg-muted">
                          </div>
                          <div className="d-flex flex-column flex-items-baseline">
                            <div className="flex-auto text-bold">
                              ⚡ 2000 Export Credits
                            </div>
                          </div>
                          <PricingInfo content={"We limit your credit usage to 1 million credits to prevent abuse."} />
                        </div>
                      </summary>
                    </details>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></>)

}


function Section1({ country }) {

  return (<>
    <div className="font-mktg">
      <div className='pricing-page-css'>
        <Section1Child country={country} />
      </div>

      <WhatsappUs />
      <div className='landing'>
        <FaqWrapper>
          <FAQ items={pricingFaqItems} />
        </FaqWrapper>
      </div>
    </div>
  </>)
}
const Content = ({ country }) => {
  return (
    <div className="flex page-inner-content flex-col justify-between">
      <div className="mb-auto">
        <Section1 country={country} />

      </div>

    </div>
  )
}

function Page({ is_authenticated, country }) {
  const Component = is_authenticated ? AuthedLanding : UnAuthedLanding

  return (
    <>
      <Seo title="Pricing" isPricing hasChat />

      <Component>
        <Content country={country} />
      </Component>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
  req,
}) => {
  function getIp() {
    const forwarded = req.headers["x-forwarded-for"] ?? req.headers["X-Forwarded-For"] ?? req.headers["X-FORWARDED-FOR"] ?? req.connection.remoteAddress
    const ip = forwarded
    return ip
  }

  const token = getIp()

  const { data } = await AxiosInstance.get(
    `/ipinfo/?ip=${token}`
  )

  return {
    props: data,
  }
}

export default Page
