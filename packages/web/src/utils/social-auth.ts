// import env from "env"

export const getGoogleURL = (from: string): string => {
  // const rootUrl: string = `https://accounts.google.com/o/oauth2/v2/auth`

  // const options: Record<string, string> = {
  //   redirect_uri: env.GOOGLE_REDIRECT,
  //   client_id: env.GOOGLE_CLIENT_ID,
  //   access_type: "offline",
  //   response_type: "code",
  //   prompt: "consent",
  //   scope: [
  //     "https://www.googleapis.com/auth/userinfo.profile",
  //     "https://www.googleapis.com/auth/userinfo.email",
  //   ].join(" "),
  //   state: from,
  // }

  // const qs: URLSearchParams = new URLSearchParams(options)

  // return `${rootUrl}?${qs.toString()}`
  return from
}
