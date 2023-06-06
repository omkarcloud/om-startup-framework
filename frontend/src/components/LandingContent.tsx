import { EuiCard } from '@elastic/eui'

import { EuiTitle, EuiSpacer, EuiButton, EuiIcon } from '@elastic/eui'
import Messages from '../utils/messages'
import Links from '../utils/data/links'
import Link from 'next/link'
import Footer from './Footer'
import { homeFaqItems } from '../utils/data/faq'
import FAQ, { FaqWrapper } from './Faq'
import DashboardContent from './DashboardContent'

function StartFreeOrGetDemo() {
  return <Link href={Links.getStarted} passHref>
    <EuiButton className='bg-cta cta-button' fill>Start Free Or Get Demo </EuiButton>
  </Link>

}


function Landing1() {
  return (
    <div className="container text-center ">
      <EuiSpacer />
      <div className="max-w-5xl mx-auto">
        <div className="video-responsive">
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/MKWdvITREVo`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div>
      <EuiSpacer />
      <div className="">
        <EuiTitle size="l">
          <h1>{Messages.PRODUCT.TAGLINE}</h1>
        </EuiTitle>

        <Link href={Links.signUp} passHref>
          <EuiButton
            fill
            size="m"
            className=" text-center text-7xl py-12 px-16 mt-8 font-bold">
            Start Free
          </EuiButton>
        </Link>
      </div>
    </div>
  )
}

function Section1() {
  return (<>
    <main id="main" className="main">
      <div className="section-header header-homepage wf-section">
        <div className="mycontainer">
          <div className="_12colrow">
            <div className="_12colrow__col col-desk5 col-tab6 col-mob12">
              <div className="col__innerdiv">
                <h1 className="hompage-atf__headline">
                  <span className="linebreak-tab">Swiss Army Knife for </span>{" "}
                  <span className="textstyles--primary">Lead Generation</span>
                  <sup className="homepage-atf-trademark textstyles--primary">
                    ®
                  </sup>
                </h1>
                <p className="hompage-atf__bodycopy">
                  Use yourdomain.com to find verified emails, export records and get company phone of your potential customers. Sign up now and receive <strong>100 free credits</strong> with <strong>no credit card</strong> down to connect with the right prospects, close more deals, and grow your revenue at scale.                </p>
                <StartFreeOrGetDemo />
              </div>
            </div>
            <div className="_12colrow__col col-desk6 col-mob0">
              <div className="col__innerdiv imagediv">
                <img
                  src="/lp-img/illustration.png"
                  loading="eager"
                  width={1459}
                  alt=""
                  className="homepage__atf-image test"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="homepage-topgradientdiv">
        <div className="homepage-topgradient" />
        <div className="section-hompage-data wf-section">
          <div className="homepage-data-bgshapes" />
          <div className="mycontainer textstyles--center">
            <div className="homepage-data__content">
              <h2>
                The Unlimited Search Engine for B2B Leads
              </h2>
              <p>
                Connect with your ideal customers quickly and efficiently using yourdomain.com's search engine, which enables you to build a robust pipeline, shorten your sales cycle, and close more deals at scale. Build a substantial list of decision-makers with our people search engine and accelerate your sales growth.
              </p>
            </div>
            <div
              data-w-id="8967e963-290c-6aa9-c84c-98904e32fb24"
              className="_12colrow justify--center marginb--50px"
            >
              <div className="_12colrow__col col-alignstretch col-desk4 col-tab4 col-mob12 marginb--15px">
                <div className="col__innerdiv height--100">
                  <div
                    data-w-id="36428765-0e97-2ae8-3c34-d9049991f2b2"
                    style={{
                      transform:
                        "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d",
                      opacity: 1,
                    }}
                    className="datasection__datacard cardstyle boxshadow"
                  >
                    <div className="datacard__numbers">200M+</div>
                    <p style={{ textAlign: 'center' }} >Search 200M+ Contacts</p>
                  </div>
                </div>
              </div>
              <div className="_12colrow__col col-alignstretch col-desk4 col-tab4 col-mob12 marginb--15px">
                <div className="col__innerdiv height--100">
                  <div
                    data-w-id="12dccf29-ff13-5e3e-ba46-a81370e6c9bc"
                    style={{
                      transform:
                        "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d",
                      opacity: 1,
                    }}
                    className="datasection__datacard cardstyle boxshadow"
                  >
                    <div className="datacard__numbers">10x</div>
                    <p style={{ textAlign: 'center' }}>ROI on Average</p>
                  </div>
                </div>
              </div>
              <div className="_12colrow__col col-alignstretch col-desk4 col-tab4 col-mob12 marginb--15px">
                <div className="col__innerdiv height--100">
                  <div
                    data-w-id="283d4c18-cda3-337c-c3f3-ec2584b6b455"
                    style={{
                      transform:
                        "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d",
                      opacity: 1,
                    }}
                    className="datasection__datacard cardstyle boxshadow"
                  >
                    <div className="datacard__numbers">500%</div>
                    <p style={{ textAlign: 'center' }}>Increase in Opportunities on Average</p>
                  </div>
                </div>
              </div>
            </div>
            <StartFreeOrGetDemo />
          </div>
        </div>
        <div className="section-features wf-section">
          <div className="mycontainer">
            <div className="_12colrow row-mob--reverse marginb--60px">
              <div className="_12colrow__col col-desk5 col-tab6 col-mob12">
                <div className="col__innerdiv">
                  <div className="textstyles-taglines">
                    Sales Intelligence Software
                  </div>
                  <h2 className="features-prospecting__heading">
                    Connect with the Right Sales Prospects
                  </h2>
                  <p className="marginb--30px">
                    Maximize your selling time and minimize lead-building time with our sales software. Generate precise lead lists, identify the best contacts, and exceed your quota!
                  </p>
                  <StartFreeOrGetDemo />
                </div>
              </div>
              <div
                data-w-id="429a4a0d-a2b0-3c29-bd0e-781bd5b9cbfd"
                className="_12colrow__col col-desk6 col-mob12"
              >
                <div className="col__innerdiv imagediv">
                  <img
                    src="/lp-img/illustration-1.png"
                    alt=""
                    className="homepage-image-contactsearch background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-features wf-section">
          <div className="mycontainer">
            <div className="_12colrow">
              <div
                data-w-id="f89afad1-b432-d90f-29aa-1936cd399dad"
                className="_12colrow__col col-desk6 col-mob12"
              >
                <div className="col__innerdiv imagediv">
                  <img
                    src="/lp-img/illustration-2.png"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="_12colrow__col col-desk5 col-tab6 col-mob12">
                <div className="col__innerdiv">
                  <div className="textstyles-taglines">Highly Accurate Data</div>
                  <h2>
                    No Email Bounces
                  </h2>
                  <p className="marginb--30px">
                    Find Email Addresses of Your Leads with 95% Precision
                  </p>
                  <StartFreeOrGetDemo />                                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="homepage-bottomgradientdiv">
        <div className="homepage-bottomgradient" />
        <div className="section-features wf-section">
          <div className="mycontainer">
            <div className="_12colrow row-mob--reverse marginb--60px">
              <div className="_12colrow__col col-desk5 col-tab6 col-mob12">
                <div className="col__innerdiv">
                  <div className="textstyles-taglines">Direct Reach</div>
                  <h2 className="features-dataenrich__heading">
                    Connect with Your Right Sales Prospects Efficiently
                  </h2>
                  <p className="marginb--30px">
                    Maximize your selling time and minimize lead-building time with our sales software. Generate precise lead lists, identify the best contacts, and exceed your quota!
                  </p>
                  <StartFreeOrGetDemo />                                  </div>
              </div>
              <div
                data-w-id="b5eaadcb-28da-8a73-c928-e156c991466c"
                className="_12colrow__col col-desk6 col-mob12"
              >
                <div className="col__innerdiv imagediv">
                  <img
                    src="/lp-img/illustration-3.png"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-features wf-section">
        <div className="mycontainer">
          <div className="_12colrow">
            <div
              data-w-id="f89afad1-b432-d90f-29aa-1936cd399dad"
              className="_12colrow__col col-desk6 col-mob12"
            >
              <div className="col__innerdiv imagediv">
                <img
                  src="/lp-img/illustration-5.png"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="_12colrow__col col-desk5 col-tab6 col-mob12">
              <div className="col__innerdiv">
                <div className="textstyles-taglines">Support</div>
                <h2>
                  Excellent Support                  </h2>
                <p className="marginb--30px">
                  We prioritize our customers and aim to provide the best possible experience. Our team is available to assist with any questions or concerns you have, including technical issues. Count on us for reliable support and guidance throughout your journey with us
                </p>
                <StartFreeOrGetDemo />                                  </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-homepage-cta wf-section">
        <div className="mycontainer">
          <div className="_12colrow marginb--50px row-mob--reverse">
            <div className="_12colrow__col col-desk5 col-tab6 col-mob12">
              <div className="col__innerdiv">
                <p className="textstyles--h1">How About 100 Credits for Free?</p>
                <p className="marginb--30px">
                  Try yourdomain.com for free now and find your next big opportunity reach out to the right prospects, close more deals, and increase revenue at scale
                </p>
                <StartFreeOrGetDemo />
              </div>
            </div>
            <div className="_12colrow__col col--aligntop col-desk6 col-mob12">

              <div className="col__innerdiv">
                <img
                  src="/lp-img/illustration-4.png"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      <FaqWrapper>
        <FAQ items={homeFaqItems} />
      </FaqWrapper>
    </main>
  </>
  )
}

function Landing2() {
  return (
    <div className="flex page-inner-content flex-col justify-between">
      <div className="mb-auto landing">
        <Section1 />
        {/* <Landing1/> */}
      </div>
      <Footer />
    </div>
  )
}

function LandingContent() {
  return <Landing2 />
}

export default LandingContent
