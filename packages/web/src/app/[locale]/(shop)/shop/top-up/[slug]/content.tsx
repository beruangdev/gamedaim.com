"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import env from "env"

import {
  AddTopUpServerForm,
  AddVoucherTopUp,
  SelectPaymentForm,
  SelectPriceForm,
} from "@/components/Form"
import { InfoIdTopUp, ThumbnailTopUp } from "@/components/Image"
import { Modal } from "@/components/Modal"
import { Button } from "@/components/UI/Button"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"
import { BannerTopup } from "@/components/Banner"

import { methodsEWallet, methodsMart, methodsVA } from "@/data/payment-methods"

import {
  PaymentMethodsProps,
  PriceListPrePaidProps,
  SettingsSiteProps,
  VoucherDataProps,
} from "@/lib/data-types"
import {
  addMarginTopUp,
  changePriceToIDR,
  filterPaymentsByPrice,
  getBrandDetails,
  getServerTopUp,
  getTotalPrice,
  removeCharsBeforeNumberTopUpPrice,
  slugify,
} from "@/utils/helper"
import useCart from "@/hooks/use-cart"
import { postTripayTransactionClosed } from "@/lib/api/server/payment"
import { postTopUpTransactions } from "@/lib/api/server/top-up"
import { TopUpCommentForm } from "@/components/UI/Form/TopUpCommentForm"

interface FormData {
  buyer_sku_code: string
  customer_phone: string
  customer_name: string
  customer_email: string
  note?: string
}

interface TopUpPageProps {
  products: PriceListPrePaidProps[] | null | undefined
  topUp: PriceListPrePaidProps | null | undefined
  settingsSite: SettingsSiteProps | null
  channel:
    | {
        eWallet: PaymentMethodsProps[] | undefined
        virtualAccount: PaymentMethodsProps[] | undefined
        convenienceShop: PaymentMethodsProps[] | undefined
      }
    | null
    | undefined
}

export function TopUpProductContent(props: TopUpPageProps) {
  const { settingsSite, products, topUp, channel } = props

  const cleanedText = topUp && topUp.product_name.replace(/\d+(\.\d+)?/g, "")

  return (
    <div className="mx-auto flex w-full flex-col space-y-4 px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      <div>
        <BannerTopup
          url={`/shop/topup/${topUp?.slug}`}
          brand={topUp?.brand as string}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-2">
        <div className="order-2 w-full lg:order-1 lg:w-2/3">
          {products && topUp ? (
            <FormTopUp
              products={products}
              topUp={topUp}
              channel={channel}
              margin={settingsSite?.margin || "15"}
              emailTopUp={settingsSite?.emailShop || ""}
              merchanTopUp={settingsSite?.siteTitle || ""}
            />
          ) : (
            <div className="text-center">
              <h1>Product not found</h1>
            </div>
          )}
        </div>
        <div className="order-1 mb-4 w-full lg:order-2 lg:w-1/3">
          <div className="sticky top-[70px] w-full rounded border p-4">
            {topUp && (
              <>
                <div className="mb-2 flex gap-2">
                  <div>
                    <ThumbnailTopUp
                      className="relative h-[75px] w-[75px]"
                      url={slugify(topUp.brand)}
                    />
                  </div>
                  <div>
                    <h3 className="line-clamp-2 text-xl font-semibold">
                      {topUp.brand}
                    </h3>
                  </div>
                </div>
                <div>
                  <p>
                    Top Up {cleanedText} resmi legal 100% harga paling murah.
                    Cara top up {topUp.brand} termurah :
                  </p>
                  <ol className="list-decimal px-4">
                    <li>Masukkan ID (SERVER)</li>
                    <li>Pilih Nominal</li>
                    <li>Pilih Pembayaran</li>
                    <li>Tulis nama, email, dan nomor WhatsApp yg benar</li>
                    <li>Klik Order Now &amp; lakukan Pembayaran</li>
                    <li>Tunggu 1 detik pesanan masuk otomatis ke akun Anda</li>
                  </ol>
                  <p className="text-bold text-shop text-center text-lg">
                    Top Up Buka 24 Jam
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <hr className="border-t" />
      <div className="mx-auto flex w-full flex-col space-y-4 px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <TopUpCommentForm brand={topUp?.brand ?? ""} />
      </div>
    </div>
  )
}

interface FormTopUpProps {
  products: PriceListPrePaidProps[]
  topUp: PriceListPrePaidProps
  channel?: {
    eWallet: PaymentMethodsProps[] | undefined
    virtualAccount: PaymentMethodsProps[] | undefined
    convenienceShop: PaymentMethodsProps[] | undefined
  } | null
  margin: string | null

  emailTopUp: string
  merchanTopUp: string
}
const FormTopUp = (props: FormTopUpProps) => {
  const { products, topUp, channel, margin, emailTopUp, merchanTopUp } = props

  const router = useRouter()
  const [, addItemToCart] = useCart()
  const [showListEWallet, setShowListEWallet] = React.useState<boolean>(false)
  const [showListVA, setShowListVA] = React.useState<boolean>(false)
  const [selectedPriceName, setSelectedPriceName] = React.useState<string>("")
  const [selectedPaymentName, setSelectedPaymentName] =
    React.useState<string>("")
  const [showListMart, setShowListMart] = React.useState<boolean>(false)
  const [topUpServer, setTopUpServer] = React.useState<string>("")
  const [totalPrice, setTotalPrice] = React.useState<number>(0)
  const [fixedPrice, setFixedPrice] = React.useState<number>(0)
  const [voucherTopUp, setVoucherTopUp] =
    React.useState<VoucherDataProps | null>(null)
  const [amount, setAmount] = React.useState<PriceListPrePaidProps | null>()
  const [openModalTopUp, setOpenModalTopUp] = React.useState(false)
  const totalmargin = margin !== null ? parseInt(margin) : 15
  const [payment, setPayment] = React.useState<PaymentMethodsProps | null>()
  const [queryAccountId, setQueryAccountId] = React.useState("")
  const [loadingModal, setLoadingModal] = React.useState(false)
  const [openInfo, setOpenInfo] = React.useState(false)

  React.useEffect(() => {
    const savedQuery = localStorage.getItem(`queryAccountId-${topUp?.brand}`)
    if (savedQuery) {
      setQueryAccountId(savedQuery)
    }
  }, [topUp?.brand])

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value
      setQueryAccountId(inputValue)
      localStorage.setItem(`queryAccountId-${topUp?.brand}`, inputValue)
    },
    [topUp?.brand],
  )

  const { isTopUpServer } = React.useMemo(
    () => getServerTopUp(topUp.brand),
    [topUp?.brand],
  )

  const handleToggleList = React.useCallback(
    (
      listStateSetter: React.Dispatch<React.SetStateAction<boolean>>,
      otherListStateSetters: React.Dispatch<React.SetStateAction<boolean>>[],
    ) => {
      if (amount && amount.price) {
        listStateSetter(true)
        otherListStateSetters.forEach((setter) => setter(false))
      } else {
        toast({
          variant: "danger",
          description: "Silahkan pilih nominal terlebih dahulu",
        })
      }
    },
    [amount],
  )

  const handleEWalletClick = React.useCallback(() => {
    handleToggleList(setShowListEWallet, [setShowListVA, setShowListMart])
  }, [handleToggleList])

  const handleVAClick = React.useCallback(() => {
    handleToggleList(setShowListVA, [setShowListEWallet, setShowListMart])
  }, [handleToggleList])

  const handleMartClick = React.useCallback(() => {
    handleToggleList(setShowListMart, [setShowListEWallet, setShowListVA])
  }, [handleToggleList])

  const handleSelectMethod = React.useCallback(
    (data: PaymentMethodsProps, price: number) => {
      setPayment(data)
      setTotalPrice(price)
    },
    [],
  )

  const handleSelectPrice = React.useCallback(
    (data: PriceListPrePaidProps, price: number) => {
      setAmount({ ...data, price: price })
    },
    [],
  )

  const handleOpenModalTopUp = React.useCallback(() => {
    if (isTopUpServer && !topUpServer) {
      toast({ variant: "danger", description: "Silahkan Pilih Server" })
    } else if (!queryAccountId) {
      toast({ variant: "danger", description: "Silahkan Masukkan ID" })
    } else if (amount && !amount.brand) {
      toast({
        variant: "danger",
        description: "Silahkan Pilih Metode Pembayaran",
      })
    } else if (payment && !payment.code) {
      toast({ variant: "danger", description: "Silahkan Pilih Nominal" })
    } else if (amount && payment) {
      setOpenModalTopUp(true)
    }
  }, [amount, isTopUpServer, payment, queryAccountId, topUpServer])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      customer_name: `${merchanTopUp ? merchanTopUp : env.SITE_TITLE} Top Up`,
      customer_email: `${emailTopUp ? emailTopUp : "topup@" + env.DOMAIN}`,
    },
  })

  const onSubmit: SubmitHandler<FormData> = React.useCallback(
    async (data) => {
      setLoadingModal(true)
      if (!queryAccountId) {
        toast({ variant: "danger", description: "Silahkan Masukkan ID" })
      } else if (amount && !amount.brand) {
        toast({
          variant: "danger",
          description: "Silahkan Pilih Metode Pembayaran",
        })
      } else if (payment && !payment.code) {
        toast({ variant: "danger", description: "Silahkan Pilih Nominal" })
      } else if (amount && payment) {
        try {
          const { accountId } = getBrandDetails(
            topUp.brand,
            queryAccountId,
            topUpServer,
          )
          const totalAmount = fixedPrice > 0 ? fixedPrice : totalPrice
          const { data: tripayRes } = await postTripayTransactionClosed({
            ...data,
            payment_method: payment.code,
            amount: totalAmount,
            payment_provider: "tripay",
            account_id: accountId,
            voucher_code: "no voucher",
            discount_amount: 0,
            fee_amount: totalAmount && totalAmount - amount.price,
            total_amount: totalAmount,
            sku: amount.buyer_sku_code,
            order_items: [
              {
                sku: amount.buyer_sku_code,
                name: amount.product_name,
                price: totalAmount,
                quantity: 1,
                subtotal: 1,
                product_url: "no product_url",
                image_url: "no image_url",
              },
            ],
            callback_url: env.API,
            return_url: `${env.SITE_URL}/shop/top-up/transaction`,
            expired_time: 0,
          })

          if (tripayRes && tripayRes.success) {
            const dataId = {
              invoiceId: tripayRes.data.merchant_ref as string,
              sku: amount.buyer_sku_code,
              merchantRef: tripayRes.data.reference,
              server: "",
              productName: amount.product_name,
              customerName: data.customer_name,
              customerEmail: data.customer_email,
              customerPhone: data.customer_phone,
              voucherCode: voucherTopUp?.voucherCode || "",
              discountAmount: fixedPrice > 0 ? totalPrice - fixedPrice : 0,
              paymentMethod: payment.code,
              paymentProvider: "TRIPAY",
              status: "PROCESSING",
              paymentStatus: tripayRes.data.status,
              topUpProvider: "DIGIFLAZZ",
              brands: topUp.brand,
              amount: totalAmount,
              feeAmount: totalAmount && totalAmount - amount.price,
              totalAmount: totalAmount,
              accountId: accountId,
              note: data.note as string,
              voucher: fixedPrice > 0 ? voucherTopUp : null,
            }
            const { data: postData } = await postTopUpTransactions(dataId)

            addItemToCart(dataId)
            if (postData) {
              router.push(
                "/shop/top-up/transaction?tripay_reference=" +
                  tripayRes.data.reference,
              )
            }
          }
        } catch (error) {
          console.log(error)
          toast({ variant: "danger", description: "Something wrong" })
        }
      }
      setLoadingModal(false)
    },
    [
      queryAccountId,
      amount,
      payment,
      topUp.brand,
      topUpServer,
      fixedPrice,
      totalPrice,
      voucherTopUp,
      addItemToCart,
      router,
    ],
  )

  return (
    <>
      <form
        className="mb-[60px] flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-2 rounded border p-4">
          <div>
            <h1 className="line-clamp-2 text-xl font-semibold">
              Masukkan Data Akun
            </h1>
          </div>
          <div className="flex gap-2">
            <FormControl>
              <FormLabel>
                {topUp.category === "E-Money"
                  ? "Nomor E-Wallet"
                  : topUp.category === "Pulsa"
                  ? "Nomor HP"
                  : "ID"}
              </FormLabel>
              <Input
                type={
                  topUp.category === "E-Money"
                    ? "number"
                    : topUp.category === "Pulsa"
                    ? "number"
                    : "text"
                }
                value={queryAccountId}
                onChange={handleInputChange}
                placeholder={`Enter ${
                  topUp.category === "E-Money"
                    ? "Nomor E-Wallet"
                    : topUp.category === "Pulsa"
                    ? "Nomor HP"
                    : "ID"
                }`}
              />
            </FormControl>
            {isTopUpServer && (
              <AddTopUpServerForm
                brand={topUp.brand}
                addTopUpServer={setTopUpServer}
              />
            )}
          </div>
          {topUp.category === "Games" && topUp.brand !== "GARENA" && (
            <div>
              <Modal
                content={
                  <InfoIdTopUp
                    className="relative h-[250px] w-full max-w-[600px]"
                    url={slugify(topUp.brand)}
                  />
                }
                trigger={
                  <Button
                    aria-label="Petunjuk"
                    onClick={() => setOpenInfo(true)}
                    className="bg-shop hover:bg-shop/70 rounded-full"
                  >
                    <Icon.Help aria-label="Petunjuk" className="mr-2" />
                    Petunjuk
                  </Button>
                }
                title={"Info"}
                onOpenChange={setOpenInfo}
                open={openInfo}
              />
            </div>
          )}
        </div>
        <div className="rounded border p-4">
          <div>
            <h1 className="line-clamp-2 text-xl font-semibold">
              Pilih Nominal
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {products.map((price: PriceListPrePaidProps) => {
              const priceWithMargin = addMarginTopUp(price.price, totalmargin)
              const name = removeCharsBeforeNumberTopUpPrice(price.product_name)
              const priceIdr = changePriceToIDR(priceWithMargin)
              return (
                <SelectPriceForm
                  label={name}
                  key={price.product_name}
                  price={priceIdr}
                  active={selectedPriceName}
                  brand={topUp.brand}
                  name="buyer_sku_code"
                  onSelect={() => {
                    handleSelectPrice(price, priceWithMargin)
                    setSelectedPriceName(name)
                  }}
                />
              )
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded border p-4">
          <div>
            <h1 className="line-clamp-2 text-xl font-semibold">
              Pilih Pembayaran
            </h1>
          </div>
          {amount &&
            channel &&
            channel.eWallet &&
            methodsEWallet.some((method) => method.maxamount > amount?.price) &&
            channel.eWallet.length > 0 && (
              <div className="rounded border p-2">
                <div
                  className="mb-2 w-full cursor-pointer p-2"
                  onClick={handleEWalletClick}
                >
                  <h2 className="line-clamp-2 text-xl font-semibold">
                    E-Wallet
                  </h2>
                </div>
                <div
                  className={`grid-cols-1 gap-4 transition-all md:grid-cols-2 lg:grid-cols-3 ${
                    showListEWallet ? "grid" : "hidden"
                  }`}
                >
                  {channel.eWallet.map((method: PaymentMethodsProps) => {
                    const { totalPayment, totalFee } = getTotalPrice(
                      amount.price,
                      method.fee_customer.flat,
                      method.fee_customer.percent,
                    )
                    const filterpayment = filterPaymentsByPrice(
                      methodsEWallet,
                      method.code,
                      amount.price,
                    )
                    const priceIdr = changePriceToIDR(totalPayment)
                    if (filterpayment)
                      return (
                        <SelectPaymentForm
                          key={method.name}
                          name="payment-methods"
                          title={method.name}
                          description={method.description}
                          image={method.icon_url}
                          onSelect={() => {
                            handleSelectMethod(
                              { ...method, totalFee: totalFee },
                              totalPayment,
                            )
                            setSelectedPaymentName(method.name)
                          }}
                          amount={priceIdr}
                          active={selectedPaymentName}
                        />
                      )
                  })}
                </div>
              </div>
            )}
          {amount &&
            channel &&
            channel.virtualAccount &&
            methodsVA.some((method) => method.minamount < amount.price) &&
            methodsVA.some((method) => method.maxamount > amount.price) &&
            channel.virtualAccount.length > 0 && (
              <div className="rounded border p-2">
                <div
                  className="mb-2 w-full cursor-pointer p-2"
                  onClick={handleVAClick}
                >
                  <h2 className="line-clamp-2 text-xl font-semibold">
                    Virtual Account
                  </h2>
                </div>
                <div
                  className={`grid-cols-1 gap-4 transition-all md:grid-cols-2 lg:grid-cols-3 ${
                    showListVA ? "grid" : "hidden"
                  }`}
                >
                  {channel.virtualAccount.map((method: PaymentMethodsProps) => {
                    const { totalPayment, totalFee } = getTotalPrice(
                      amount.price,
                      method.fee_customer.flat,
                      method.fee_customer.percent,
                    )
                    const filterpayment = filterPaymentsByPrice(
                      methodsVA,
                      method.code,
                      amount.price,
                    )
                    const priceIdr = changePriceToIDR(totalPayment)
                    if (filterpayment)
                      return (
                        <SelectPaymentForm
                          key={method.name}
                          name="payment-methods"
                          title={method.name}
                          description={method.description}
                          image={method.icon_url}
                          onSelect={() => {
                            handleSelectMethod(
                              { ...method, totalFee: totalFee },
                              totalPayment,
                            )
                            setSelectedPaymentName(method.name)
                          }}
                          amount={priceIdr}
                          active={selectedPaymentName}
                        />
                      )
                  })}
                </div>
              </div>
            )}
          {amount &&
            channel &&
            channel.convenienceShop &&
            methodsMart.some((method) => method.minamount < amount.price) &&
            methodsMart.some((method) => method.maxamount > amount.price) &&
            channel.convenienceShop.length > 0 && (
              <div className="rounded border p-2">
                <div
                  className="mb-2 w-full cursor-pointer p-2"
                  onClick={handleMartClick}
                >
                  <h2 className="line-clamp-2 text-xl font-semibold">
                    Convenience Shop
                  </h2>
                </div>
                <div
                  className={`grid-cols-1 gap-4 transition-all md:grid-cols-2 lg:grid-cols-3 ${
                    showListMart ? "grid" : "hidden"
                  }`}
                >
                  {channel.convenienceShop.map(
                    (method: PaymentMethodsProps) => {
                      const { totalPayment, totalFee } = getTotalPrice(
                        amount.price,
                        method.fee_customer.flat,
                        method.fee_customer.percent,
                      )

                      const filterpayment = filterPaymentsByPrice(
                        methodsMart,
                        method.code,
                        amount.price,
                      )
                      const priceIdr = changePriceToIDR(totalPayment)
                      if (filterpayment)
                        return (
                          <SelectPaymentForm
                            key={method.name}
                            name="payment-methods"
                            title={method.name}
                            description={method.description}
                            image={method.icon_url}
                            onSelect={() => {
                              handleSelectMethod(
                                { ...method, totalFee: totalFee },
                                totalPayment,
                              )
                              setSelectedPaymentName(method.name)
                            }}
                            amount={priceIdr}
                            active={selectedPaymentName}
                          />
                        )
                    },
                  )}
                </div>
              </div>
            )}
        </div>
        <div className="flex gap-2 rounded border p-4">
          <FormControl invalid={Boolean(errors.customer_phone)}>
            <FormLabel>No Whatsapp</FormLabel>
            <Input
              type="tel"
              {...register("customer_phone", {
                required: "Nomor HP harus diisi",
                pattern: {
                  value: /^0\d{8,19}$/,
                  message: "Nomor HP tidak valid",
                },
              })}
              placeholder="08123xxxxxxxx"
            />
            {errors?.customer_phone && (
              <FormErrorMessage>
                {errors.customer_phone.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </div>
        <div className="flex gap-2 rounded border p-4">
          <FormControl invalid={Boolean(errors.note)}>
            <FormLabel>Catatan</FormLabel>
            <Textarea
              {...register("note")}
              placeholder="Masukkan Catatan (Optional)"
            />
            {errors?.note && (
              <FormErrorMessage>{errors.note.message}</FormErrorMessage>
            )}
          </FormControl>
        </div>
        {totalPrice > 0 && (
          <div className="flex gap-2 rounded border p-4">
            <AddVoucherTopUp
              normalPrice={totalPrice}
              AddVoucherData={setVoucherTopUp}
              AddDiscount={setFixedPrice}
            />
          </div>
        )}
      </form>
      <Modal
        content={
          <>
            <div>
              <div>
                <div className="bg-success mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                  <Icon.Check />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-background text-lg font-semibold leading-6">
                    Create Order
                  </h3>
                  <p className="pt-4">
                    Make sure your account data and the product you choose are
                    valid and appropriate.
                  </p>
                  <div className="mt-2">
                    <div className="my-4 grid grid-cols-3 gap-4 rounded-md p-4 text-left">
                      <div>ID</div>
                      <div className="col-span-2">{`: ${queryAccountId}`}</div>
                      <div>Item</div>
                      <div className="col-span-2">{`: ${
                        amount && amount.product_name
                      }`}</div>
                      <div>Product</div>
                      <div className="col-span-2">{`: ${topUp.brand}`}</div>
                      <div>Payment</div>
                      <div className="col-span-2">{`: ${
                        payment && payment.name
                      }`}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-between sm:mt-6">
                <Button
                  aria-label="Cancel"
                  onClick={() => setOpenModalTopUp(false)}
                >
                  Cancel
                </Button>
                <Button
                  loading={loadingModal}
                  aria-label="Order Sekarang"
                  onClick={handleSubmit(onSubmit)}
                  className="bg-shop hover:bg-shop/70"
                >
                  Order Sekarang
                </Button>
              </div>
            </div>
          </>
        }
        trigger={
          <Button
            aria-label="Order Sekarang"
            onClick={handleSubmit(handleOpenModalTopUp)}
            className="bg-shop hover:bg-shop/70"
          >
            Order Sekarang
          </Button>
        }
        title={"Create Order"}
        onOpenChange={setOpenModalTopUp}
        open={openModalTopUp}
      />
    </>
  )
}
