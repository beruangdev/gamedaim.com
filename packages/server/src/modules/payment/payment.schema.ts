import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const PAYMENT_TRIPAY_CLOSED_PAYMENT_CODE_TYPE = [
  "MYBVA",
  "PERMATAVA",
  "BNIVA",
  "BRIVA",
  "MANDIRIVA",
  "BCAVA",
  "SMSVA",
  "MUAMALATVA",
  "CIMBVA",
  "SAMPOERNAVA",
  "BSIVA",
  "DANAMONVA",
  "ALFAMART",
  "INDOMARET",
  "ALFAMIDI",
  "OVO",
  "QRIS",
  "QRIS2",
  "QRISC",
  "QRISD",
  "SHOPEEPAY",
] as const

const PAYMENT_TRIPAY_OPEN_PAYMENT_CODE_TYPE = [
  "BNIVAOP",
  "HANAVAOP",
  "DANAMONOP",
  "CIMBVAOP",
  "BRIVAOP",
  "QRISOP",
  "QRISCOP",
  "BSIVAOP",
] as const

const paymentTripayPaymentInstructionInput = {
  code: z.enum(PAYMENT_TRIPAY_CLOSED_PAYMENT_CODE_TYPE, {
    invalid_type_error:
      "your payment code type doesnt exist on available option.",
  }),
  pay_code: z
    .string({
      invalid_type_error: "Pay Code must be a string",
    })
    .optional(),
  amount: z
    .number({
      invalid_type_error: "Amount must be a number",
    })
    .optional(),
  allow_html: z
    .boolean({
      invalid_type_error: "Allow HTML must be a boolean",
    })
    .optional(),
}

const paymentTripayFeeCalculatorInput = {
  amount: z.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  code: z
    .enum(PAYMENT_TRIPAY_CLOSED_PAYMENT_CODE_TYPE, {
      invalid_type_error:
        "your payment code type doesnt exist on available option.",
    })
    .optional(),
}

const paymentTripayOrderItemsInput = z.object(
  {
    sku: z.string({
      required_error: "SKU is required",
      invalid_type_error: "SKU must be a string",
    }),
    name: z.string({
      required_error: "Product Name is required",
      invalid_type_error: "Product Name must be a string",
    }),
    price: z.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    }),
    quantity: z.number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    }),
    subtotal: z.number({
      required_error: "Subtotal is required",
      invalid_type_error: "Subtotal must be a number",
    }),
    product_url: z.string({
      required_error: "Product Url is required",
      invalid_type_error: "Product Url must be a string",
    }),
    image_url: z.string({
      required_error: "Image Url is required",
      invalid_type_error: "Image Url must be a string",
    }),
  },
  {
    required_error: "Order Items is required",
    invalid_type_error: "Order Items must be an object",
  },
)

const paymentTripayCreateClosedTransactionInput = {
  amount: z.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  payment_method: z.enum(PAYMENT_TRIPAY_CLOSED_PAYMENT_CODE_TYPE, {
    required_error: "Method is required",
    invalid_type_error:
      "your payment code type doesnt exist on available option.",
  }),
  merchant_ref: z.string({
    required_error: "Merchant Ref is required",
    invalid_type_error: "Merchant Ref must be a string",
  }),
  customer_name: z.string({
    required_error: "Customer Name is required",
    invalid_type_error: "Customer Name must be a string",
  }),
  customer_email: z.string({
    required_error: "Customer Email is required",
    invalid_type_error: "Customer Email must be a string",
  }),
  customer_phone: z.string({
    required_error: "Customer Phone Number is required",
    invalid_type_error: "Customer Phone Number must be a string",
  }),
  order_items: z.array(paymentTripayOrderItemsInput, {
    required_error: "Order Items Required",
    invalid_type_error: "Order Items must be an array",
  }),
  callback_url: z
    .string({
      invalid_type_error: "Callback Url must be a string",
    })
    .optional(),
  return_url: z
    .string({
      invalid_type_error: "Return Url must be a string",
    })
    .optional(),
  expired_time: z
    .number({
      invalid_type_error: "Expired Time must be a number",
    })
    .optional(),
}

const paymentTripayCreateOpenTransactionInput = {
  method: z.enum(PAYMENT_TRIPAY_OPEN_PAYMENT_CODE_TYPE, {
    required_error: "Method is required",
    invalid_type_error:
      "your payment code type doesnt exist on available option.",
  }),
  merchant_ref: z.string({
    required_error: "Merchant Ref is required",
    invalid_type_error: "Merchant Ref must be a string",
  }),
  customer_name: z.string({
    required_error: "Customer Name is required",
    invalid_type_error: "Customer Name must be a string",
  }),
}

// const paymentTripayPaymentCallbackInput = {
//   reference: z.string({
//     required_error: "Reference is required",
//     invalid_type_error: "Reference must be a string",
//   }),
//   merchant_ref: z
//     .string({
//       invalid_type_error: "Merchant Ref must be a string",
//     })
//     .optional(),
//   payment_method: z.string({
//     required_error: "Payment Method is required",
//     invalid_type_error: "Payment Method must be a string",
//   }),
//   payment_method_code: z.string({
//     required_error: "Payment Method Code is required",
//     invalid_type_error: "Payment Method Code must be a string",
//   }),
//   total_amount: z.number({
//     required_error: "Total amount is required",
//     invalid_type_error: "Total amount must be a number",
//   }),
//   fee_merchant: z.number({
//     required_error: "Fee Merchant amount is required",
//     invalid_type_error: "Fee Merchant amount must be a number",
//   }),
//   fee_customer: z.number({
//     required_error: "Fee Customer amount is required",
//     invalid_type_error: "Fee Customer amount must be a number",
//   }),
//   total_fee: z.number({
//     required_error: "Total Fee amount is required",
//     invalid_type_error: "Total Fee amount must be a number",
//   }),
//   //FIX: convert to enum
//   is_closed_payment: z.number({
//     required_error: "Is Closed Payment is required",
//     invalid_type_error: "Is Closed Payment must be a number",
//   }),
//   //FIX: convert to enum
//   status: z.string({
//     required_error: "Status is required",
//     invalid_type_error: "Status must be a string",
//   }),
//   paid_at: z
//     .number({
//       invalid_type_error: "Paid At must be a number",
//     })
//     .optional(),
//   note: z
//     .string({
//       invalid_type_error: "Note must be a string",
//     })
//     .optional(),
// }

const paymentTripayPaymentInstructionSchema = z.object({
  ...paymentTripayPaymentInstructionInput,
})

const paymentTripayFeeCalculatorSchema = z.object({
  ...paymentTripayFeeCalculatorInput,
})

const paymentTripayCreateClosedTransactionSchema = z.object({
  ...paymentTripayCreateClosedTransactionInput,
})

const paymentTripayCreateOpenTransactionSchema = z.object({
  ...paymentTripayCreateOpenTransactionInput,
})

// const paymentTripayPaymentCallbackSchema = z.object({
//   ...paymentTripayPaymentCallbackInput,
// })

export type PaymentTripayPaymentInstructionInput = z.infer<
  typeof paymentTripayPaymentInstructionSchema
>
export type PaymentTripayFeeCalculatorInput = z.infer<
  typeof paymentTripayFeeCalculatorSchema
>
export type PaymentTripayCreateClosedTransactionInput = z.infer<
  typeof paymentTripayCreateClosedTransactionSchema
>
export type PaymentTripayCreateOpenTransactionInput = z.infer<
  typeof paymentTripayCreateOpenTransactionSchema
>
// export type PaymentTripayPaymentCallbackInput = z.infer<
//   typeof paymentTripayPaymentCallbackSchema
// >

const models = {
  paymentTripayPaymentInstructionSchema,
  paymentTripayFeeCalculatorSchema,
  paymentTripayCreateClosedTransactionSchema,
  paymentTripayCreateOpenTransactionSchema,
  // paymentTripayPaymentCallbackSchema,
}

export const { schemas: paymentSchemas, $ref } = buildJsonSchemas(models, {
  $id: "PaymentSchema",
})
