import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const MENU_LOCATION = [
  "SIDEBAR_ALL",
  "SIDEBAR_ALL_ID",
  "SIDEBAR_ALL_EN",
  "SIDEBAR_SHOP_ALL",
  "SIDEBAR_SHOP_EN",
  "SIDEBAR_SHOP_ID",
  "FOOTER_ALL",
  "FOOTER_ID",
  "FOOTER_EN",
  "FOOTER_SHOP_ALL",
  "FOOTER_SHOP_ID",
  "FOOTER_SHOP_EN",
] as const

const menuInput = {
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1),
  link: z
    .string({
      required_error: "Link is required",
      invalid_type_error: "Link must be a string",
    })
    .min(2),
  location: z.enum(MENU_LOCATION, {
    invalid_type_error: "your menu location doesnt exist on available option.",
  }),
  order: z
    .number({
      invalid_type_error: "Order must be a number",
    })
    .optional(),
  icon: z
    .string({
      invalid_type_error: "Icon must be a string",
    })
    .optional(),
  active: z
    .boolean({
      invalid_type_error: "Active must be a boolean",
    })
    .optional(),
}

const updateMenuInput = {
  ...menuInput,
}

const menuGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}

const createMenuSchema = z.object({
  ...menuInput,
})

const updateMenuSchema = z.object({
  ...updateMenuInput,
})

const menuResponseSchema = z.object({
  ...menuInput,
  ...menuGenerated,
})

const menusResponseSchema = z.array(menuResponseSchema)

export type CreateMenuInput = z.infer<typeof createMenuSchema>
export type UpdateMenuInput = z.infer<typeof updateMenuSchema>

const models = {
  menuResponseSchema,
  menusResponseSchema,
  createMenuSchema,
  updateMenuSchema,
}

export const { schemas: menuSchemas, $ref } = buildJsonSchemas(models, {
  $id: "MenuSchema",
})
