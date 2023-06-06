import { EuiButton, EuiCard, EuiIcon, EuiText } from '@elastic/eui'
import Seo from '../components/Seo'
import AuthedDashboard from '../layouts/AuthedDashboard'
import Toast from '@omkar111111/components/Toast'
import { NewFaqWrapper, NewFAQ } from '../components/Faq'
import { HowItWorksContent, affiliateDashboardFaqItems } from '../utils/data/faq'


function Card({ children }) {
    return (
        <div className="euiPanel euiPanel--plain euiPanel--paddingMedium euiCard euiCard--centerAligned eui-1yzwxdg-euiPanel-grow-m-m-plain-hasShadow">
            <div className="euiCard__content text-left">
                {children}
            </div>
        </div>
    )
}
function Content({ pending_amount, paid_amount, referral_link_clicks, referral_code, referred_users_count }) {
    const link = "https://www.yourdomain.com/?j=" + referral_code

    return (

        <div className='max-w-screen-lg			mt-6 px-6    m-auto'>
            <div className="flex gap-6">
                <div className="flex-1"    >
                    <div className="flex gap-6">
                        <div className="flex-1">

                            <Card>
                                <EuiText color="subdued">
                                    <h6>Pending Amount</h6>
                                </EuiText>

                                {/* <div className=''>
                                    Pending Amount
                                </div> */}
                                <div className='font-bold text-4xl'>
                                    ${pending_amount}
                                </div>
                            </Card>
                        </div>
                        <div className="flex-1">
                            <Card>

                                <EuiText color="subdued">
                                    <h6>Amount Paid {'    '} </h6>
                                </EuiText>
                                <div className='font-bold text-4xl'>
                                    ${paid_amount}
                                </div>
                            </Card>
                        </div>
                        <div className="flex-1">                            <Card>


                            <EuiText color="subdued">
                                <h6>Link Clicks</h6>
                            </EuiText>
                            <div className='font-bold text-4xl'>
                                {referral_link_clicks}
                            </div>
                        </Card>
                        </div>
                        <div className="flex-1">
                            <Card>
                                <EuiText color="subdued">
                                    <h6>Referred Users</h6>
                                </EuiText>
                                <div className='font-bold text-4xl'>
                                    {referred_users_count}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <Card>
                        <EuiText color="subdued">
                            <h6>Your Referral Link</h6>
                        </EuiText>

                        <button onClick={() => {
                            navigator.clipboard.writeText(link)
                            Toast.success("Referral link was successfully copied!")
                        }} className='flex gap-4 items-center '>

                            <div>
                                <EuiIcon className='' type="copy" />
                            </div>

                            <div><div className='font-bold text-2xl'>

                                {link}
                            </div>


                            </div>
                        </button>
                    </Card>

                </div>


            </div>
            <div className="flex mt-6 gap-6">
                <div className="flex-1">
                    <Card>

                        <EuiText color="subdued">
                            <h6>
                                How It Works    </h6>
                        </EuiText>
                        <div className='text-m font-medium	'>
                            <HowItWorksContent />
                        </div>

                    </Card>


                </div>
                <div className="flex-1">                    <Card>



                    <EuiText color="subdued">
                        <h6>Training</h6>
                    </EuiText>
                    <div className='mt-4 space-x-4'>
                        <EuiButton href='https://www.youtube.com/watch?v=fOag-dNhg2Y' target='_blank' fill>Watch Training Video [Hindi]</EuiButton>
                        <EuiButton href='https://www.yourdomain.com/blog/omkar-affiliate-programme/' target='_blank'>Read Training Guide</EuiButton>
                    </div>
                </Card></div>
            </div>
            <div className='mt-12'>
                <NewFaqWrapper>
                    <NewFAQ items={affiliateDashboardFaqItems} />
                </NewFaqWrapper>
            </div>

            <div className='my-6 text-center'>
                <EuiButton href='https://www.youtube.com/watch?v=fOag-dNhg2Y' target='_blank' fill>Watch Training Video</EuiButton>
            </div>

        </div>
    )
}


function Page(props) {
    return (
        <>
            <Seo hasChat title="Referral Program" description='Join yourcompanyname Affiliate Program to earn by referring yourcompanyname.' />
            <AuthedDashboard>
                {/* Triger Emotion Css */}
                <EuiCard className='hidden' description="dd" title="dd" />
                <Content {...props} />
            </AuthedDashboard>
        </>
    )
}

export default Page
