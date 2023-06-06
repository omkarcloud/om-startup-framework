import Config from '../utils/config';
import Links from '../utils/data/links';

const EXTERNAL_DATA_URL = 'https://www.yourdomain.com/blog/api/posts/';


function generateSiteMap(posts) {
    const primaryLinks = [Links.home, Links.blog,  Links.pricing, Links.affiliates]
    const secondaryLinks = [Links.contactUs, Links.signIn, Links.forgotPassword, Links.signUp, Links.terms, Links.privacy,]

    
    function wrapInPath(ls) {
        return ls.map(x => ({ path: x }))
    }
    const links = [...wrapInPath(primaryLinks), ...posts, ...wrapInPath(secondaryLinks)]

  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${
        links.map(
          url => `
      <url>
          <loc>https://${Config.DOMAIN_NAME}${url.path}</loc>
      </url>
    `)
        .join('')}
<sitemap>
  <loc>https://${Config.DOMAIN_NAME}/bose/sitemap.xml</loc>
</sitemap>
<sitemap>
  <loc>https://${Config.DOMAIN_NAME}/docker/sitemap.xml</loc>
</sitemap>
<sitemap>
  <loc>https://${Config.DOMAIN_NAME}/chatgpt/sitemap.xml</loc>
</sitemap>
</urlset> 
  `.trim();
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
