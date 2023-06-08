import env from "../env"
import db from "../src/utils/db"
import { hashPassword } from "../src/utils/password"

async function main() {
  const hashedPassword = hashPassword(env.DEFAULT_ADMIN_PASSWORD)

  const admin = await db.user.upsert({
    where: { email: env.DEFAULT_ADMIN_EMAIL },
    update: {
      role: "ADMIN",
    },
    create: {
      email: env.DEFAULT_ADMIN_EMAIL,
      username: "admin",
      name: "Admin",
      role: "ADMIN",
      password: hashedPassword,
    },
  })

  const domain = await db.setting.upsert({
    where: { key: "siteDomain" },
    update: {},
    create: {
      key: "siteDomain",
      value: "gamedaim.com",
    },
  })

  const email = await db.setting.upsert({
    where: { key: "email" },
    update: {},
    create: {
      key: "email",
      value: "info@gamedaim.com",
    },
  })

  const supportEmail = await db.setting.upsert({
    where: { key: "supportEmail" },
    update: {},
    create: {
      key: "supportEmail",
      value: "support@gamedaim.com",
    },
  })

  const siteTitle = await db.setting.upsert({
    where: { key: "siteTitle" },
    update: {},
    create: {
      key: "siteTitle",
      value: "Gamedaim",
    },
  })

  const siteTagline = await db.setting.upsert({
    where: { key: "siteTagline" },
    update: {},
    create: {
      key: "siteTagline",
      value: "Everlasting Gaming Knowledge",
    },
  })

  const siteMetaTitle = await db.setting.upsert({
    where: { key: "siteMetaTitle" },
    update: {},
    create: {
      key: "siteMetaTitle",
      value: "Gamedaim | Everlasting Gaming Knowledge",
    },
  })

  const siteDescription = await db.setting.upsert({
    where: { key: "siteDescription" },
    update: {},
    create: {
      key: "siteDescription",
      value:
        "Gamedaim.com adalah Portal Berita Game Platform PC, Xbox, Playstation, Nintendo, Android, iOS, dan VR. berita Esports Terbaru",
    },
  })

  const siteMetaDescription = await db.setting.upsert({
    where: { key: "siteMetaDescription" },
    update: {},
    create: {
      key: "siteMetaDescription",
      value:
        "Gamedaim.com adalah Portal Berita Game Platform PC, Xbox, Playstation, Nintendo, Android, iOS, dan VR. berita Esports Terbaru",
    },
  })

  const facebookUsername = await db.setting.upsert({
    where: { key: "facebookUsername" },
    update: {},
    create: {
      key: "facebookUsername",
      value: "gamedaim",
    },
  })

  const twitterUsername = await db.setting.upsert({
    where: { key: "twitterUsername" },
    update: {},
    create: {
      key: "twitterUsername",
      value: "gamedaim",
    },
  })

  const instagramUsername = await db.setting.upsert({
    where: { key: "instagramUsername" },
    update: {},
    create: {
      key: "instagramUsername",
      value: "gamedaim",
    },
  })

  const pinterestUsername = await db.setting.upsert({
    where: { key: "pinterestUsername" },
    update: {},
    create: {
      key: "pinterestUsername",
      value: "gamedaim",
    },
  })

  const youtubeChannel = await db.setting.upsert({
    where: { key: "youtubeChannel" },
    update: {},
    create: {
      key: "youtubeChannel",
      value: "UCBWMNCeDFfyYddZDtNHH2Vw",
    },
  })

  console.log(
    admin,
    domain,
    email,
    supportEmail,
    siteTitle,
    siteTagline,
    siteDescription,
    siteMetaTitle,
    siteMetaDescription,
    facebookUsername,
    twitterUsername,
    instagramUsername,
    pinterestUsername,
    youtubeChannel,
  )
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
