import Head from 'next/head'

export default function Seo({
  title = 'yourcompanyname The Ultimate Lead Generation Solution',
  description = 'yourdomain.com is a lead generation software that helps sales people reach out to the right prospects, close more deals, and increase revenue at scale.',
  isLanding = false,
  isPricing = false,
  isAffiliate = false,
  addLandingCss = false,
  hasChat = false
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://repository-images.githubusercontent.com/233832487/cddf0ff5-a35f-4380-8912-1c9f365366a8"
      />
      <meta
        property="og:url"
        content="https://www.yourdomain.com/images/twitter-card.png"
      />
      {isLanding && <link rel="stylesheet" href={`${''}/css/landing.css`} />}

      {(isPricing || addLandingCss) && <link rel="stylesheet" href={`${''}/css/landing.css`} />}
      {isPricing && <link rel="stylesheet" href={`${''}/css/pricing.css`} />}


      {isAffiliate &&

        <>
          <link rel="stylesheet" href={`${''}/css/affiliate.css`} />
          <link rel="stylesheet" id="elementor-icons-css"
            href="https://elementor.com/marketing/wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.min.css?ver=5.18.0"
            type="text/css" media="all" />
          <link rel="stylesheet" id="elementor-frontend-css"
            href="https://elementor.com/marketing/wp-content/plugins/elementor/assets/css/frontend-lite.min.css?ver=3.11.4"
            type="text/css" media="all" />
          <link rel="stylesheet" id="swiper-css"
            href="https://elementor.com/marketing/wp-content/plugins/elementor/assets/lib/swiper/css/swiper.min.css?ver=5.3.6"
            type="text/css" media="all" />
          <link rel="stylesheet" id="elementor-post-52406-css"
            href="https://elementor.com/marketing/wp-content/uploads/elementor/css/post-52406.css?ver=1679504211"
            type="text/css" media="all" />
          <link rel="stylesheet" id="elementor-pro-css"
            href="https://elementor.com/marketing/wp-content/plugins/elementor-pro/assets/css/frontend-lite.min.css?ver=3.11.5"
            type="text/css" media="all" />
          <link rel="stylesheet" id="font-awesome-5-all-css"
            href="https://elementor.com/marketing/wp-content/plugins/elementor/assets/lib/font-awesome/css/all.min.css?ver=3.11.4"
            type="text/css" media="all" />
          <link rel="stylesheet" id="font-awesome-4-shim-css"
            href="https://elementor.com/marketing/wp-content/plugins/elementor/assets/lib/font-awesome/css/v4-shims.min.css?ver=3.11.4"
            type="text/css" media="all" />
          <link rel="stylesheet" id="elementor-global-css"
            href="https://elementor.com/marketing/wp-content/uploads/elementor/css/global.css?ver=1679504212"
            type="text/css" media="all" />
          <link rel="stylesheet" id="elementor-post-23855-css"
            href="https://elementor.com/marketing/wp-content/uploads/elementor/css/post-23855.css?ver=1679504556"
            type="text/css" media="all" />
          <link rel="stylesheet" id="elementor-post-71706-css"
            href="https://elementor.com/marketing/wp-content/uploads/elementor/css/post-71706.css?ver=1679504212"
            type="text/css" media="all" />
          <link rel="stylesheet" id="elementor-post-16853-css"
            href="https://elementor.com/marketing/wp-content/uploads/elementor/css/post-16853.css?ver=1679504212"
            type="text/css" media="all" />
          <link rel="stylesheet" id="elementor-site-style-child-css"
            href="https://elementor.com/marketing/wp-content/themes/elementor-website/assets/css/style.css?ver=1.1.5"
            type="text/css" media="all" />
          <link rel="stylesheet" id="google-fonts-1-css"
            href="https://fonts.googleapis.com/css?family=DM+Sans%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&amp;display=swap&amp;ver=5.8.3"
            type="text/css" media="all" />   </>
      }
    </Head>
  )
}