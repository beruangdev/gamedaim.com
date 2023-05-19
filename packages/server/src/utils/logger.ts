import env from "../env"

export interface LoggerOption {
  development: {
    transport: {
      target: string
      options: {
        translateTime: string
        ignore: string
      }
    }
  }
  production: boolean
  test: boolean
}

export const loggerOption: LoggerOption = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: env.NODE_ENV === "production" ? true : false,
  test: env.NODE_ENV === "production" ? false : true,
}
