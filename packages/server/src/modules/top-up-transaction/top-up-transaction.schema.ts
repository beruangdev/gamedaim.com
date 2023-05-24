import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const PAYMENT_PROVIDER_TYPE = ["TRIPAY", "MIDTRANS", "DUITKU"] as const
const TOP_UP_PROVIDER_TYPE = ["DIGIFLAZZ", "APIGAMES"] as const
const TOP_UP_STATUS_TYPE = ["PROCESSING", "SUCCESS", "FAILED", "ERROR"] as const
const TOPUP_PAYMENT_STATUS_TYPE = [
  "UNPAID",
  "PAID",
  "FAILED",
  "EXPIRED",
  "ERROR",
  "REFUNDED",
] as const

const topUpTransactionInput = {
  amount: z.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  invoiceId: z.string({
    required_error: "Invoice Id is required",
    invalid_type_error: "Invoice Id must be a string",
  }),
  sku: z.string({
    required_error: "Sku is required",
    invalid_type_error: "Sku must be a string",
  }),
  accountId: z.string({
    required_error: "Account Id is required",
    invalid_type_error: "Account Id must be a string",
  }),
  customerName: z.string({
    required_error: "Customer Name is required",
    invalid_type_error: "Customer Name must be a string",
  }),
  customerEmail: z.string({
    required_error: "Customer Email is required",
    invalid_type_error: "Customer Email must be a string",
  }),
  customerPhone: z.string({
    required_error: "Customer Phone Number is required",
    invalid_type_error: "Customer Phone Number must be a string",
  }),
  voucherCode: z
    .string({
      invalid_type_error: "Voucher Code must be a string",
    })
    .optional(),
  discountAmount: z
    .number({
      invalid_type_error: "Discount Amount must be a number",
    })
    .optional(),
  feeAmount: z.number({
    required_error: "Fee Amount is required",
    invalid_type_error: "Fee Amount must be a number",
  }),
  totalAmount: z.number({
    required_error: "Total Amount is required",
    invalid_type_error: "Total Amount must be a number",
  }),
  note: z
    .string({
      invalid_type_error: "Voucher Code must be a string",
    })
    .optional(),
  topUpProvider: z.enum(TOP_UP_PROVIDER_TYPE, {
    required_error: "Top Up Provider is required",
    invalid_type_error:
      "your top up status type doesnt exist on available option.",
  }),
  paymentMethod: z.string({
    required_error: "Payment Method is required",
    invalid_type_error: "Payment Method must be a string",
  }),
  paymentProvider: z.enum(PAYMENT_PROVIDER_TYPE, {
    required_error: "Payment Provider is required",
    invalid_type_error:
      "your payment provider type doesnt exist on available option.",
  }),
}

const topUpTransactionStatusInput = {
  status: z.enum(TOP_UP_STATUS_TYPE, {
    required_error: "Top Up status is required",
    invalid_type_error:
      "your top up payment status type doesnt exist on available option.",
  }),
  paymentStatus: z.enum(TOPUP_PAYMENT_STATUS_TYPE, {
    required_error: "Top Up Payment Status is required",
    invalid_type_error:
      "your top up payment status type doesnt exist on available option.",
  }),
}

const createTopUpTransactionSchema = z.object({
  ...topUpTransactionInput,
  ...topUpTransactionStatusInput,
})

const updateTopUpTransactionSchema = z.object({
  ...topUpTransactionInput,
  ...topUpTransactionStatusInput,
})

const updateTopUpTransactionStatusSchema = z.object({
  ...topUpTransactionStatusInput,
})

export type CreateTopUpTransactionInput = z.infer<
  typeof createTopUpTransactionSchema
>
export type UpdateTopUpTransactionInput = z.infer<
  typeof updateTopUpTransactionSchema
>
export type UpdateTopUpTransactionStatusInput = z.infer<
  typeof updateTopUpTransactionStatusSchema
>

const models = {
  createTopUpTransactionSchema,
  updateTopUpTransactionSchema,
  updateTopUpTransactionStatusSchema,
}

export const { schemas: topUpTransactionSchemas, $ref } = buildJsonSchemas(
  models,
  {
    $id: "TopUpTransactionSchema",
  },
)
