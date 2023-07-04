import { getProtocol } from "@/utils/protocol"

interface EnvProps {
  [key: string]: string
}

const env: EnvProps = {
  NODE_ENV: process.env.NODE_ENV || "development",
  API: process.env.NEXT_PUBLIC_API || "http://localhost:8000",
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000",
  EN_SUBDOMAIN: process.env.NEXT_PUBLIC_EN_SUBDOMAIN || "global.localhost:3000",
  SITE_URL: getProtocol() + process.env.NEXT_PUBLIC_DOMAIN,
  EN_SITE_URL: getProtocol() + process.env.NEXT_PUBLIC_EN_SUBDOMAIN,
  ADSENSE_CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID as string,
  SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE as string,
  SITE_COLOR: process.env.NEXT_PUBLIC_SITE_COLOR as string,
  SITE_LANGUAGE: process.env.NEXT_PUBLIC_SITE_LANGUAGE as string,
  ADDRESS: process.env.NEXT_PUBLIC_ADDRESS as string,
  EMAIL: process.env.NEXT_PUBLIC_EMAIL as string,
  SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL as string,
  WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER as string,
  ABOUT: process.env.NEXT_PUBLIC_ABOUT as string,
  TWITTER_USERNAME: process.env.NEXT_PUBLIC_TWITTER_USERNAME as string,
  FACEBOOK_USERNAME: process.env.NEXT_PUBLIC_FACEBOOK_USERNAME as string,
  INSTAGRAM_USERNAME: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME as string,
  LINKEDIN_USERNAME: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME as string,
  FACEBOOK_ID: process.env.NEXT_PUBLIC_FACEBOOK_ID as string,
  YOUTUBE_CHANNEL: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL as string,
  LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL as string,
  LOGO_WIDTH: process.env.NEXT_PUBLIC_LOGO_WIDTH as string,
  LOGO_HEIGHT: process.env.NEXT_PUBLIC_LOGO_HEIGHT as string,
  LOGO_OG_URL: process.env.NEXT_PUBLIC_LOGO_OG_URL as string,
  LOGO_OG_WIDTH: process.env.NEXT_PUBLIC_LOGO_OG_WIDTH as string,
  LOGO_OG_HEIGHT: process.env.NEXT_PUBLIC_LOGO_OG_HEIGHT as string,
  WP_API_URL: process.env.NEXT_PUBLIC_WP_API_URL as string,
  MENU_PRIMARY: process.env.NEXT_PUBLIC_MENU_PRIMARY as string,
  MENU_FOOTER: process.env.NEXT_PUBLIC_MENU_FOOTER as string,
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN as string,
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
  GOOGLE_OAUTH_ENDPOINT: process.env
    .NEXT_PUBLIC_GOOGLE_OAUTH_ENDPOINT as string,
  GOOGLE_REDIRECT: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT as string,
  FACEBOOK_CLIENT_ID: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID as string,
  FACEBOOK_CLIENT_SECRET: process.env
    .NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET as string,
  FACEBOOK_REDIRECT: process.env.NEXT_PUBLIC_FACEBOOK_OAUTH_REDIRECT as string,
}

export default env
