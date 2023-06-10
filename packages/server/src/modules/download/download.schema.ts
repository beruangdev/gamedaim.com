import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const DOWNLOAD_LANGUAGE = ["id", "en"] as const

const DOWNLOAD_SCHEMA_JSON = [
  "DownloadApp",
  "BusinessApp",
  "MultimediaApp",
  "MobileApp",
  "WebApp",
  "SocialNetworkingApp",
  "TravelApp",
  "ShoppingApp",
  "SportsApp",
  "LifeStyleApp",
  "DesignApp",
  "DeveloperApp",
  "DriverApp",
  "EducationalApp",
  "HealthApp",
  "FinanceApp",
  "SecurityApp",
  "BrowserApp",
  "CommunicationApp",
  "HomeApp",
  "UtilitiesApp",
  "RefereceApp",
  "GameApp",
] as const

const downloadInput = {
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(2),
  language: z
    .enum(DOWNLOAD_LANGUAGE, {
      invalid_type_error: "only id and en are accepted",
    })
    .optional(),
  content: z
    .string({
      invalid_type_error: "Content must be a string",
    })
    .min(10),
  excerpt: z
    .string({
      invalid_type_error: "Content must be a string",
    })
    .optional(),
  metaTitle: z
    .string({
      invalid_type_error: "Meta Title must be a string",
    })
    .optional(),
  metaDescription: z
    .string({
      invalid_type_error: "Meta Description must be a string",
    })
    .optional(),
  downloadFileIds: z
    .string({
      required_error: "Download File Id is required",
      invalid_type_error: "Download File Id must be a string",
    })
    .array(),
  featuredImageId: z.string({
    required_error: "Featured Image is required",
    invalid_type_error: "Featured Image must be a string",
  }),
  developer: z
    .string({
      required_error: "Developer is required",
      invalid_type_error: "Developer must be a string",
    })
    .min(1),
  operatingSystem: z
    .string({
      required_error: "Operation System is required",
      invalid_type_error: "Operation System must be a string",
    })
    .min(1),
  license: z
    .string({
      required_error: "License is required",
      invalid_type_error: "License must be a string",
    })
    .min(1),
  officialWeb: z
    .string({
      required_error: "Official Web is required",
      invalid_type_error: "Official Web must be a string",
    })
    .min(1),
  schemaType: z.enum(DOWNLOAD_SCHEMA_JSON, {
    required_error: "Schema Type is required",
    invalid_type_error: "Schema Type must be a string",
  }),
  type: z.enum(["app", "game"], {
    required_error: "Download Type is required",
    invalid_type_error: "your game type doesnt exist on available option.",
  }),
  topicIds: z
    .string({
      required_error: "Topic Id is required",
      invalid_type_error: "Topic Id must be a string",
    })
    .array(),
  authorIds: z
    .string({
      required_error: "Author Id is required",
      invalid_type_error: "Author Id must be a string",
    })
    .array(),
}

const downloadWithPrimaryInput = {
  ...downloadInput,
  downloadPrimaryId: z.string({
    required_error: "Download Primary ID is required",
    invalid_type_error: "Download Primary ID must be a string",
  }),
}

const updateDownloadInput = {
  ...downloadInput,
  slug: z
    .string({
      required_error: "Slug is required",
      invalid_type_error: "Slug must be a string",
    })
    .regex(new RegExp(/^[a-zA-Z0-9_-]*$/), {
      message: "Slug should be character a-z, A-Z, number, - and _",
    }),
}

const downloadGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}

const createDownloadSchema = z.object({
  ...downloadWithPrimaryInput,
})

const createDownloadPrimarySchema = z.object({
  ...downloadInput,
})

const updateDownloadSchema = z.object({
  ...updateDownloadInput,
})

const downloadResponseSchema = z.object({
  ...downloadGenerated,
})

const downloadsResponseSchema = z.array(downloadResponseSchema)

export type CreateDownloadInput = z.infer<typeof createDownloadSchema>
export type CreateDownloadPrimaryInput = z.infer<
  typeof createDownloadPrimarySchema
>

export type UpdateDownloadInput = z.infer<typeof updateDownloadSchema>

const models = {
  downloadResponseSchema,
  downloadsResponseSchema,
  createDownloadSchema,
  createDownloadPrimarySchema,
  updateDownloadSchema,
}

export const { schemas: downloadSchemas, $ref } = buildJsonSchemas(models, {
  $id: "DownloadSchema",
})
