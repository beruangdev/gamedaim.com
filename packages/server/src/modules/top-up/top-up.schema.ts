import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"
const PAYMENT_PROVIDER_TYPE = ["TRIPAY", "MIDTRANS", "DUITKU"] as const

const TOPUP_DIGFLAZZ_TRANSACTION_TYPE = [
  "inq-pasca",
  "pay-pasca",
  "status-pasca",
] as const

const TOP_UP_TRIPAY_CLOSED_PAYMENT_CODE_TYPE = [
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

const TOP_UP_TRIPAY_OPEN_PAYMENT_CODE_TYPE = [
  "BNIVAOP",
  "HANAVAOP",
  "DANAMONOP",
  "CIMBVAOP",
  "BRIVAOP",
  "QRISOP",
  "QRISCOP",
  "BSIVAOP",
] as const

const topUpDigiflazzDepositInput = {
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .min(2),
  bank: z
    .string({
      required_error: "Bank is required",
      invalid_type_error: "Bank must be a string",
    })
    .min(2),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2),
}

const topUpDigiflazzTransactionInput = {
  sku: z
    .string({
      required_error: "Sku is required",
      invalid_type_error: "Sku must be a string",
    })
    .min(2),
  customerNo: z
    .string({
      required_error: "Customer Nomer is required",
      invalid_type_error: "Customer Nomer must be a string",
    })
    .min(2),
  refId: z
    .string({
      required_error: "Ref ID is required",
      invalid_type_error: "Ref ID must be a string",
    })
    .min(2),
  testing: z.boolean({
    invalid_type_error: "Testing must be a boolean",
  }),
  msg: z
    .string({
      required_error: "Message is required",
      invalid_type_error: "Message must be a string",
    })
    .min(2),
  cmd: z
    .enum(TOPUP_DIGFLAZZ_TRANSACTION_TYPE, {
      invalid_type_error:
        "your transaction type doesnt exist on available option.",
    })
    .optional(),
}

const topUpDigiflazzPlnCheckInput = {
  customerNo: z
    .string({
      required_error: "Customer Nomer is required",
      invalid_type_error: "Customer Nomer must be a string",
    })
    .min(2),
}

const topUpTripayPaymentInstructionInput = {
  code: z.enum(TOP_UP_TRIPAY_CLOSED_PAYMENT_CODE_TYPE, {
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

const topUpTripayFeeCalculatorInput = {
  amount: z.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  code: z
    .enum(TOP_UP_TRIPAY_CLOSED_PAYMENT_CODE_TYPE, {
      invalid_type_error:
        "your payment code type doesnt exist on available option.",
    })
    .optional(),
}

const topUpTripayTransationsInput = {
  page: z.number({
    required_error: "Page is required",
    invalid_type_error: "Page must be a number",
  }),
  per_page: z.number({
    required_error: "Per Page is required",
    invalid_type_error: "Per Page must be a number",
  }),
}

const topUpTripayOrderItemsInput = z.object(
  {
    sku: z.string({
      required_error: "SKU is required",
      invalid_type_error: "SKU must be a string",
    }),
    name: z.string({
      required_error: "Product Name is required",
      invalid_type_error: "Product Name must be a string",
    }),
    customerNo: z
      .string({
        required_error: "Customer Number is required",
        invalid_type_error: "Customer Number must be a string",
      })
      .optional(),
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

const topUpTripayCreateClosedTransactionInput = {
  invoice_id: z
    .string({
      invalid_type_error: "Merchant Ref must be a string",
    })
    .optional(),
  amount: z.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  payment_provider: z.enum(PAYMENT_PROVIDER_TYPE, {
    required_error: "Payment Provider is required",
    invalid_type_error: "Payment Provider must be a string",
  }),
  payment_method: z.enum(TOP_UP_TRIPAY_CLOSED_PAYMENT_CODE_TYPE, {
    required_error: "Method is required",
    invalid_type_error:
      "your payment code type doesnt exist on available option.",
  }),
  sku: z.string({
    required_error: "SKU is required",
    invalid_type_error: "SKU must be a string",
  }),
  account_id: z.string({
    required_error: "Account Id is required",
    invalid_type_error: "Account Id must be a string",
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
  voucher_code: z
    .string({
      invalid_type_error: "Voucher Code must be a string",
    })
    .optional(),
  discount_amount: z
    .number({
      invalid_type_error: "Discount Amount must be a number",
    })
    .optional(),
  fee_amount: z.number({
    required_error: "Fee Amount is required",
    invalid_type_error: "Fee Amount must be a number",
  }),
  total_amount: z.number({
    required_error: "Total Amount is required",
    invalid_type_error: "Total Amount must be a number",
  }),
  order_items: z.array(topUpTripayOrderItemsInput, {
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
  note: z
    .string({
      invalid_type_error: "Note must be a string",
    })
    .optional(),
}

const topUpTripayUpdateClosedTransactionInput = {
  ...topUpTripayCreateClosedTransactionInput,
  status: z.enum(["PROCESSING", "SUCCESS", "FAILED", "ERROR"] as const, {
    required_error: "Status is required",
    invalid_type_error: "Status must be a string",
  }),
}

const topUpTripayCreateOpenTransactionInput = {
  method: z.enum(TOP_UP_TRIPAY_OPEN_PAYMENT_CODE_TYPE, {
    required_error: "Method is required",
    invalid_type_error:
      "your payment code type doesnt exist on available option.",
  }),
  merchant_ref: z
    .string({
      invalid_type_error: "Merchant Ref must be a string",
    })
    .optional(),
  customer_name: z.string({
    required_error: "Customer Name is required",
    invalid_type_error: "Customer Name must be a string",
  }),
}
const topUpTripayPaymentCallbackInput = {
  reference: z.string({
    required_error: "Reference is required",
    invalid_type_error: "Reference must be a string",
  }),
  merchant_ref: z
    .string({
      invalid_type_error: "Merchant Ref must be a string",
    })
    .optional(),
  payment_method: z.string({
    required_error: "Payment Method is required",
    invalid_type_error: "Payment Method must be a string",
  }),
  payment_method_code: z.string({
    required_error: "Payment Method Code is required",
    invalid_type_error: "Payment Method Code must be a string",
  }),
  total_amount: z.number({
    required_error: "Total amount is required",
    invalid_type_error: "Total amount must be a number",
  }),
  fee_merchant: z.number({
    required_error: "Fee Merchant amount is required",
    invalid_type_error: "Fee Merchant amount must be a number",
  }),
  fee_customer: z.number({
    required_error: "Fee Customer amount is required",
    invalid_type_error: "Fee Customer amount must be a number",
  }),
  total_fee: z.number({
    required_error: "Total Fee amount is required",
    invalid_type_error: "Total Fee amount must be a number",
  }),
  //FIX: convert to enum
  is_closed_payment: z.number({
    required_error: "Is Closed Payment is required",
    invalid_type_error: "Is Closed Payment must be a number",
  }),
  //FIX: convert to enum
  status: z.string({
    required_error: "Status is required",
    invalid_type_error: "Status must be a string",
  }),
  paid_at: z
    .number({
      invalid_type_error: "Paid At must be a number",
    })
    .optional(),
  note: z
    .string({
      invalid_type_error: "Note must be a string",
    })
    .optional(),
}

const savePriceListInput = {
  key: z
    .string({
      required_error: "Key is required",
      invalid_type_error: "Key must be a string",
    })
    .min(1),
  value: z
    .string({
      required_error: "Value is required",
      invalid_type_error: "Value must be a string",
    })
    .min(1),
}

const topUpDigiflazzCreateDepositSchema = z.object({
  ...topUpDigiflazzDepositInput,
})

const topUpDigiflazzCreateTransactionSchema = z.object({
  ...topUpDigiflazzTransactionInput,
})

const topUpDigiflazzCreatePlnCheckSchema = z.object({
  ...topUpDigiflazzPlnCheckInput,
})

const topUpTripayPaymentInstructionSchema = z.object({
  ...topUpTripayPaymentInstructionInput,
})

const topUpTripayFeeCalculatorSchema = z.object({
  ...topUpTripayFeeCalculatorInput,
})

const topUpTripayTransactionsSchema = z.object({
  ...topUpTripayTransationsInput,
})

const topUpTripayCreateClosedTransactionSchema = z.object({
  ...topUpTripayCreateClosedTransactionInput,
})

const topUpTripayUpdateClosedTransactionSchema = z.object({
  ...topUpTripayUpdateClosedTransactionInput,
})

const topUpTripayCreateOpenTransactionSchema = z.object({
  ...topUpTripayCreateOpenTransactionInput,
})

const savePriceListSchema = z.object({
  ...savePriceListInput,
})

const topUpTripayPaymentCallbackSchema = z.object({
  ...topUpTripayPaymentCallbackInput,
})

export type SavePriceListInput = z.infer<typeof savePriceListSchema>

export type TopUpDigiflazzCreateDepositInput = z.infer<
  typeof topUpDigiflazzCreateDepositSchema
>
export type TopUpDigiflazzCreateTransactionInput = z.infer<
  typeof topUpDigiflazzCreateTransactionSchema
>
export type TopUpDigiflazzCratePlnCheckInput = z.infer<
  typeof topUpDigiflazzCreatePlnCheckSchema
>

export type TopUpTripayPaymentInstructionInput = z.infer<
  typeof topUpTripayPaymentInstructionSchema
>
export type TopUpTripayFeeCalculatorInput = z.infer<
  typeof topUpTripayFeeCalculatorSchema
>
export type TopUpTripayTransctionsInput = z.infer<
  typeof topUpTripayTransactionsSchema
>
export type TopUpTripayCreateClosedTransactionInput = z.infer<
  typeof topUpTripayCreateClosedTransactionSchema
>
export type TopUpTripayUpdateClosedTransactionInput = z.infer<
  typeof topUpTripayUpdateClosedTransactionSchema
>
export type TopUpTripayCreateOpenTransactionInput = z.infer<
  typeof topUpTripayCreateOpenTransactionSchema
>
export type TopUpTripayPaymentCallbackInput = z.infer<
  typeof topUpTripayPaymentCallbackSchema
>

const models = {
  topUpDigiflazzCreateDepositSchema,
  topUpDigiflazzCreateTransactionSchema,
  topUpDigiflazzCreatePlnCheckSchema,
  savePriceListSchema,
  topUpTripayPaymentInstructionSchema,
  topUpTripayFeeCalculatorSchema,
  topUpTripayTransactionsSchema,
  topUpTripayCreateClosedTransactionSchema,
  topUpTripayUpdateClosedTransactionSchema,
  topUpTripayCreateOpenTransactionSchema,
  topUpTripayPaymentCallbackSchema,
}

export const { schemas: topUpSchemas, $ref } = buildJsonSchemas(models, {
  $id: "TopUpSchema",
})
