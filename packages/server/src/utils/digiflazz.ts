import createDigiflazzConfig from "digiflazz-sdk"

import env from "env"

export const digiflazz = createDigiflazzConfig({
  username: env.DIGIFLAZZ_USERNAME,
  key:
    env.NODE_ENV === "development"
      ? env.DIGIFLAZZ_API_KEY_DEV
      : env.DIGIFLAZZ_API_KEY_PROD,
})
