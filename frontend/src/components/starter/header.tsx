import Image from 'next/image'
import Link from 'next/link'
import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiListGroup,
  EuiHeader,
  EuiHeaderSectionItemButton,
  EuiTitle,
  useEuiTheme,
  useGeneratedHtmlId,
  EuiIcon,
  EuiHeaderLink,
  EuiButton,
  EuiListGroupItem,
} from '@elastic/eui'
import { imageLoader } from '../../lib/loader'
import { headerStyles } from './header.styles'
// @ts-ignore
import Logo from '../../../public/images/logo-eui.svg'
import GiveFeedback from '../Feedback'
import { useState } from 'react'
import Links from '../../utils/data/links'
import useInquiryContactUs from '../modals/useInquiryContactUs'
import { useAuth } from '../auth/context'
function HeaderLogo({ white = false }) {
  const { euiTheme } = useEuiTheme()

  const styles = headerStyles(euiTheme)

  return (
    <Link className="" key="logo-eui" href="/" passHref>
      <a css={styles.logo}>
        <Image width={24} height={24} src={Logo} alt="" loader={imageLoader} />
        <EuiTitle size="xxs" css={styles.title}>
          <span style={white ? { color: '#ffffff' } : undefined}>yourcompanyname</span>
        </EuiTitle>
      </a>
    </Link>
  )
}


export const LandingPageHeader = ({ is_authenticated = false }) => {
  const Pricing = (
    <EuiHeaderLink href={Links.pricing} className="">{'Pricing'}</EuiHeaderLink>
  )
  const { modal, showModal } = useInquiryContactUs()

  const links = is_authenticated
    ? []
    : [
      <Link href={Links.signIn} passHref>
        <EuiHeaderLink>{'Sign  In'}</EuiHeaderLink>
      </Link>,
      <Link href={Links.signUp} passHref>
        <EuiButton fill style={{ minWidth: 80 }} size="s" color="primary">
          Start Free
        </EuiButton>
      </Link>,
    ]
  return (
    <>
      {modal}

      <EuiHeader
        role='navigation'
        position="fixed"
        sections={[
          {
            items: [
              <HeaderLogo />,


              <EuiHeaderLink className="hidden sm:block" href={Links.blog}>
                {'Blog'}
              </EuiHeaderLink>,
              <EuiHeaderLink className="hidden sm:block" href={Links.affiliates}>
                {'Affiliate Program'}
              </EuiHeaderLink>,
              Pricing,
            ],
            borders: 'none',
          },
          {
            items: [
              <EuiHeaderLink onClick={showModal} className="hidden sm:block">
                {'Contact Us'}
              </EuiHeaderLink>
              ,
              ...links,
            ],
            borders: 'none',
          },
        ]}
      />
    </>
  )
}

const Header = () => {
  const guideHeaderCollapsibleNavId = useGeneratedHtmlId({
    prefix: 'guideHeaderCollapsibleNav',
  })
  const { modal: contactModal, showModal: showContactModal } = useInquiryContactUs()

  const { is_admin } = useAuth()


  const [navIsOpen, setNavIsOpen] = useState(false)

  const collapsibleNav = (
    <EuiCollapsibleNav
      id={guideHeaderCollapsibleNavId}
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={false}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}>
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}>
      <EuiFlexItem className="eui-yScroll">
        <EuiCollapsibleNavGroup className="h-full child-h-full" background="none">
          <EuiListGroup
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s">
            <Link href={Links.home} passHref>
              <EuiListGroupItem label="Home" />
            </Link>

            <Link href={Links.referralProgram} passHref>
              <EuiListGroupItem label="Referral Program" />
            </Link>
            <EuiListGroupItem onClick={showContactModal} label="Contact Us" />


            <EuiListGroupItem href={Links.blog} label="Blog" />

            {is_admin && <>
              <Link href={Links.users} passHref>
                <EuiListGroupItem label="Users" />
              </Link>
              <Link href={Links.shortUrls} passHref>
                <EuiListGroupItem label="Url Shortner" />
              </Link>
              <Link href={Links.allPricing} passHref>
                <EuiListGroupItem label="All Pricing" />
              </Link>
              <Link href={Links.stats} passHref>
                <EuiListGroupItem label="Statistics" />
              </Link>
              <Link href={Links.actions} passHref>
                <EuiListGroupItem label="Actions" />
              </Link>
            </>
            }

          </EuiListGroup>
          <EuiListGroup
            className='mb-12'
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s">
            <EuiListGroupItem href={Links.pricing} label="Pricing" />
            <EuiListGroupItem href={Links.signOut} label="Sign Out" />
          </EuiListGroup>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  )

  return (
    <>{contactModal}
      <EuiHeader
        role='navigation'
        position="fixed"
        theme="dark"
        sections={[
          {
            items: [
              collapsibleNav,
              <div className="w-6" />,
              <HeaderLogo white />,
            ],
            borders: 'none',
          },
          {
            items: [<GiveFeedback key="feedback" />],
            borders: 'none',
          },
        ]}
      />
    </>
  )
}


export default Header
