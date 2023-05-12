/* eslint-disable @typescript-eslint/no-explicit-any */
export {}

declare global {
  interface Window {
    adsbygoogle: any
    gtag: any
    dataLayer: any
  }

  interface Env {
    [key: string]: string | undefined
  }

  /* eslint-disable no-unused-vars */
  declare module NodeJS {
    interface Process extends NodeJS.Process {
      browser?: string
    }
  }
}
