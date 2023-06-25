import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const voucherInput = {
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1),
  voucherCode: z.string({
    required_error: "Voucher Code is required",
    invalid_type_error: "Voucher Code must be a string",
  }),
  discountPercentage: z.number({
    required_error: "Discount Percentage is required",
    invalid_type_error: "Discount Percentage must be a number",
  }),
  discountMax: z.number({
    required_error: "Discount Max is required",
    invalid_type_error: "Discount Max must be a number",
  }),
  voucherAmount: z.number({
    required_error: "Voucher amount is required",
    invalid_type_error: "Voucher amount must be a number",
  }),
  description: z
    .string({
      invalid_type_error: "Voucher amount must be a number",
    })
    .optional(),
  expiration: z
    .string({
      invalid_type_error: "Expiration must be a string",
    })
    .datetime()
    .optional(),
  active: z.boolean({
    invalid_type_error: "Active must be a boolean",
  }),
}

const updateVoucherInput = {
  ...voucherInput,
}

const voucherGenerated = {
  ...voucherInput,
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}

const createVoucherSchema = z.object({
  ...voucherInput,
})

const updateVoucherSchema = z.object({
  ...updateVoucherInput,
})

const voucherResponseSchema = z.object({
  ...voucherInput,
  ...voucherGenerated,
  voucherCode: z.string(),
})

const vouchersResponseSchema = z.array(voucherResponseSchema)

export type CreateVoucherInput = z.infer<typeof createVoucherSchema>
export type UpdateVoucherInput = z.infer<typeof updateVoucherSchema>

const models = {
  voucherResponseSchema,
  vouchersResponseSchema,
  createVoucherSchema,
  updateVoucherSchema,
}

export const { schemas: voucherSchemas, $ref } = buildJsonSchemas(models, {
  $id: "VoucherSchema",
})
