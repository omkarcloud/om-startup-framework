import Seo from '../components/Seo'
import {
    EuiButton,
    EuiText,
} from '@elastic/eui'
import CenterContent from '../components/CenterContent'
import ContentWrapper from '../components/starter/wrapper'
import { H1Text } from "../components/H1Text"
import Link from 'next/link'
import Links from '../utils/data/links'
import useDemoModal from '../components/modals/useDemoModal'

const Content = ({ }) => {
    const { modal, showModal } = useDemoModal()

    return (
        <div className="text-center">
            {modal}
            <H1Text content="Get Started With yourcompanyname" />
            <EuiText className='mt-12 text-xl'>yourcompanyname helps you to connect with the <b>right prospects, close more deals, and grow your revenue at scale</b></EuiText>
            <CenterContent className='space-x-4 mt-12'>
                <Link href={Links.signUp} passHref><EuiButton className='cta-button' >Get started free</EuiButton></Link>
                <EuiButton onClick={showModal} className='cta-button' fill>{'Get a Demo'}</EuiButton>
            </CenterContent>
        </div>
    )
}

const Page = props => {
    return (
        <>
            <Seo title="Get Started" />
            <ContentWrapper>
                <CenterContent className="h-screen">
                    <Content {...props} />
                </CenterContent>
            </ContentWrapper>
        </>
    )
}

export default Page
