import { EuiLink } from "@elastic/eui"
import Link from "next/link"
import { Social } from "../../components/Footer"
import useDiscountContactUs from "../../components/modals/useDiscountContactUs"
import Links from "./links"

const _1 = {
  id: "1",
  heading: "What is yourdomain.com?",
  Component: () => <p>yourdomain.com is a lead generation software that helps sales people reach out to the right prospects, close more deals, and increase revenue at scale.</p>,
}
const _2 = {
  id: "2",
  heading: "How yourdomain.com works?",
  Component: () => <p>yourdomain.com uses various publicly available data sources to discover individuals' contact details. Take advantage of our search engine to target the most promising prospects, boost your sales, and increase revenue at scale.</p>
}
const _5 = {
  id: "5",
  heading: "How can yourdomain.com help me?",
  Component: () => <>

    <p>
      yourcompanyname can help sales teams generate leads, close more deals, and grow their revenue.<br />
      Here are some ways it can be useful: <br />
      <b>Sales Lead Generation:</b> If you're looking for sales leads, yourdomain.com can help you find right prospects for your business.<br />
      <b>Contacting Specific Companies:</b> If you have a list of companies you want to contact but don't have the decision-makers' contact information, yourdomain.com's sales software can help you find them.
    </p>
  </>,
}
export const homeFaqItems = [
  _1,
  _2,
  {
    id: "3",
    heading: "What is the pricing of yourdomain.com?",
    Component: () => <p>You can use yourdomain.com for free with up to 100 credits per month, and we offer an Unlimited plan for $28 per month. Check out our <Link href={Links.pricing} passHref><EuiLink className="force-eui-primary" target={'_blank'} >Pricing Page</EuiLink></Link> to learn more about all the features and pricing options.</p>
  },
  {
    id: "4",
    heading: "Is yourdomain.com a legitimate platform?",
    Component: () => <p>Absolutely, experience the truth for yourself by trying yourdomain.com for free. </p>
  },
  _5,

]

export const pricingFaqItems = [
  _1,
  _2,
  {
    id: "11",
    heading: "What payment methods are accepted?",
    Component: () => <p>You have the option to make payment using a credit card, debit card, or a PayPal account.</p>,
  },
  {
    id: "12",
    heading: "What is included in my free plan?",
    Component: () => <p>Your free plan includes <b>100</b> Email Credits, <b>100</b> Company Phone Credits, <b>100</b> Export Credits. </p>
  },
  {
    id: "13",
    heading: "Does you offer discount pricing for startups and nonprofits?",
    Component: () => {
      const { modal, showModal } = useDiscountContactUs()
      return <>{modal}<p>Our yourcompanyname for Startups and yourcompanyname for Nonprofits programs provide a 70% discount on pricing for eligible organizations. Please <EuiLink onClick={showModal} className="force-eui-primary" >Contact Us</EuiLink> to determine your eligibility</p></>
    }
  },
  _5,
  {
    id: "13",
    heading: "What is your refund policy?",
    Component: () => <p>If you're unhappy with your purchase for any reason, email us at <EuiLink href={Social.email} className="force-eui-primary">support@yourdomain.com</EuiLink> within 30 days and we'll refund you in full, no questions asked.</p>,

  }
]

export const shopifyScraperFaqItems = [
  {
    id: '1',
    heading: 'What is yourcompanyname Shopify Scraper?',
    Component: () => (
      <>
        <p>
          yourcompanyname Shopify Scraper is a free tool for scraping Shopify stores. It allows users to extract product information from Shopify stores quickly and easily, without the need for complex coding or web scraping skills.
        </p>
      </>
    ),
  },
  {
    id: '2',
    heading: 'How do I use yourcompanyname Shopify Scraper?',
    Component: () => (
      <>
        <p>Follow these Steps to scrape Shopify Stores using yourcompanyname Shopify Scraper.</p>
        <ol className="list-decimal ">
          <li>Visit the yourcompanyname Shopify Scraper website at <Link href={"https://www.yourdomain.com/shopify-scraper/"} passHref><EuiLink className="force-eui-primary" target={'_blank'} >https://www.yourdomain.com/shopify-scraper/</EuiLink></Link></li>
          <li>Enter the URL of the Shopify store that you want to scrape in the input box provided.</li>
          <li>Select the collection that you want to scrape from the list of available collections.</li>
          <li>Click on the &quot;Download Products&quot; button.</li>
          <li>The products from the selected collection will be scraped and downloaded in a CSV file format.</li>
          <li>Open the CSV file in Excel or Google Sheets to analyze the data. </li>
        </ol>
      </>
    ),
  }
  ,
  {
    id: '3',
    heading: 'Is it legal to scrape Shopify stores?',
    Component: () => (
      <>
        <p>
          Web scraping is legal if you are extracting publicly available data, and products data on Shopify Stores is publicly available. Hence, it is perfectly legal to scrape Shopify Stores.
        </p>
      </>
    ),
  },
  {
    id: '4',
    heading: 'What can I do with the scraped data?',
    Component: () => (
      <>
        <p>
          The scraped data can be analyzed to gain insights on market trends, competitor strategies, and pricing strategies. This information can be used to optimize your own business performance and stay ahead of the competition.
        </p>
      </>
    ),
  },

]


export const HowItWorksContent = () => (
  <>
    <p>You can earn a 50% commission every month for 24 months for every customer you refer to yourcompanyname using your unique link. </p>
    <p>Additionally, the person who uses your link will receive a discount of 10% on their payments for a duration of 24 months.</p>
    <p>For example, if five people purchase the Monthly Unlimited Plan for $35 per month through your referral link, you will earn $87.5 every month, which is 50% of $35 multiplied by 5.</p>
  </>
)
const HowItWorks = {
  id: '1',
  heading: 'How it works?',
  Component: HowItWorksContent,
}

export const affiliateDashboardFaqItems = [
  {
    id: '2',
    heading: 'Why should I join your Affiliate Program?',
    Component: () => (
      <>
        <p>By Partnering with yourcompanyname you get our credibility, social status, and product quality.</p>
        <p>As an affiliate, you do not need to make products, handle payments, or provide customer support. </p>
        <p>All you need to do is get people to visit yourcompanyname using your unique affiliate link, and you earn revenue month after month.</p>
        <p>Some important Reasons to partner with us are </p>
        <ul className="list-disc  pl-12">
          <li><strong>Membership Product:</strong> We have a membership product ensures a steady stream of income every month.</li>
          <li><strong>High Commission:</strong> We offer a 50% commission for 24 months, which is significantly more than the industry standard of 20% to 30%.</li>
          <li><strong>Free Tier:</strong> Our free tier allows you to promote our product without the need to convince anyone to make a purchase. Simply encourage them to try out our product for free.</li>
        </ul>
      </>
    ),
  }
  ,
  {
    id: '3',
    heading: 'How much can I earn as your affiliate?',
    Component: () => (
      <>
        <p>It depends on your level of dedication and effort.        </p>
        <p>A few will earn Thousands of Dollars, some will earn earn hundreds of Dollars and most will not earn anything at all. </p>

      </>
    ),
  },
  {
    id: '3_1',
    heading: 'How much can I earn per Sale?',
    Component: () => (
      <>
        <p>yourcompanyname offers a straightforward pricing plan model, consisting of a free plan and a single unlimited plan priced at $28 per month when purchased annually and $35 per month when purchased on a monthly basis.</p>
        <p>If your referral purchases the monthly plan, you will earn $17.5 per month. Alternatively, if they opt for the yearly plan, you will earn $14 per month.</p>
      </>
    ),
  },
  {
    id: '4',
    heading: 'Is there a minimum payout threshold?',
    Component: () => (
      <>
        <p>
          Unlike many software companies, we don&#39;t hold your money until you reach a minimum payout amount.

        </p>
        <p>
          We will send you the full amount that is available in your account.
        </p>
      </>
    ),
  },

  {
    id: '5',
    heading: 'How do I get paid?',
    Component: () => (
      <>
        <p>We will contact you to request your payout details, we support UPI, Paypal, or direct bank transfer. </p>
        <p>Please note that payments are made on the 1st day of every month and 30 days after the customer has paid since we offer a 30-day refund period. </p>
        <p>Also, You can track your earnings easily through the dashboard.</p>
      </>
    ),
  },


  {
    id: '7',
    heading: 'What happens if person does not use my affiliate link but still signs up later?',
    Component: () => (
      <>
        <p>Once a person clicks on your referral link, our affiliate tracking system gets activated even if it is not their first visit to our site.</p>
        <p>Now in case they sign up later but have clicked on your referral link, then your referral link will be activated :)</p>
        <p>However, if they have already visited us using another affiliate&#39;s link before using your affiliate link, then first affiliate&#39;s link will be activated.</p>
      </>
    ),
  },

  {
    id: '8',
    heading: 'How do I join the affiliate program?',
    Component: () => (
      <>
        <p>    To join our affiliate program, simply follow these steps:</p>
        <ol className="list-decimal pl-12">
          <li>Create an account on yourdomain.com</li>
          <li>Click on the Referral Program option in the navbar</li>
          <li>You will receive a referral link, which you can use to refer others and earn.</li>
        </ol>
      </>
    ),
  },
  {
    id: '21',
    heading: 'What strategies can I use to make sales with yourcompanyname?',
    Component: () => (
      <>
        <p>There are several strategies you can use to get people to try yourcompanyname and earn revenue:</p>
        <ol className="list-decimal pl-12">
          <li>YouTube Strategy: Create videos on topics relevant to lead generation, and add a call to action to visit yourcompanyname using your affiliate link at the end of the video.</li>
          <li>Group Posting Strategy: Join multiple lead generation groups on Facebook and LinkedIn, write engaging posts in all the groups, and send a message to those who comment to use yourcompanyname using your affiliate link.</li>
          <li>DM Strategy: DM people you provide Lead Generation Services to use yourcompanyname.</li>
        </ol>
      </>
    ),
  },
  {
    id: '9',
    heading: 'Do you offer affiliate training?',
    Component: () => (
      <>

        <p>Yes, we have a top notch affiliate training video which teaches you about various strategies to boost your earnings. Watch our training course at <EuiLink target="_blank" href="https://www.youtube.com/watch?v=fOag-dNhg2Y">https://www.youtube.com/watch?v=fOag-dNhg2Y</EuiLink></p>

      </>
    ),
  },
]

export const affiliateMarketingFaqItems = [
  HowItWorks,
  ...affiliateDashboardFaqItems,
]