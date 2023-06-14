import env from "env"

export const getGoogleURL = (from: string): string => {
  const rootUrl: string = `https://accounts.google.com/o/oauth2/v2/auth`
  const options: Record<string, string> = {
    redirect_uri: env.GOOGLE_REDIRECT,
    client_id: env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  }
  const qs: URLSearchParams = new URLSearchParams(options)
  const redirect_url = `${rootUrl}?${qs.toString()}`
  return redirect_url
}
export const getFacebookURL = (from: string): string => {
  const rootUrl: string = `https://www.facebook.com/v17.0/dialog/oauth`

  const options: Record<string, string> = {
    client_id: env.FACEBOOK_CLIENT_ID,
    redirect_uri: env.FACEBOOK_REDIRECT,
    scope: ["email", "public_profile"].join(","), // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
    from: from,
  }
  const qs: URLSearchParams = new URLSearchParams(options)
  const redirect_url = `${rootUrl}?${qs.toString()}`
  return redirect_url
}
