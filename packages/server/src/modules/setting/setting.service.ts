import db from "@/utils/db"
import { CreateSettingInput } from "./setting.schema"

export async function createOrUpdateSetting(data: CreateSettingInput) {
  const { key, value } = data
  return await db.setting.upsert({
    where: { key: key },
    update: { value: value },
    create: {
      key: key,
      value: value,
    },
  })
}

export async function getSettings() {
  return await db.setting.findMany({
    orderBy: {
      createdAt: "asc",
    },
  })
}

export async function getSettingByKey(settingKey: string) {
  return await db.setting.findUnique({
    where: { key: settingKey },
  })
}
