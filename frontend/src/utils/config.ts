const env = process.env.NODE_ENV

const Config = {
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID, 
  DOMAIN_NAME: 'www.yourdomain.com', 
  IS_PRODUCTION : env == "production",
}

export default Config
