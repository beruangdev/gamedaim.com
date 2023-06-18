"use client"
import React from "react"
import { BannerTopup } from "@/components/Banner"
import { Modal } from "@/components/Modal"
import { Button } from "@/components/UI/Button"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { useCurrentUser } from "@/hooks/use-current-user"
import {
  PaymentMethodsProps,
  PriceListPrePaidProps,
  SettingDataProps,
  VoucherDataProps,
} from "@/lib/data-types"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "@/components/UI/Toast"
import { useForm, SubmitHandler } from "react-hook-form"
import { http } from "@/lib/http"
import {
  getBrandDetails,
  getServerTopUp,
  removeCharsBeforeNumberTopUpPrice,
  slugify,
} from "@/utils/helper"
import useCartStore from "@/hooks/use-cart"
import env from "env"
import { AddTopUpServerForm } from "@/components/UI/Form/AddTopUpServerForm"
import { InfoIdTopUp, ThumbnailTopUp } from "@/components/Picture"
import {
  addMarginTopUp,
  changePriceToIDR,
  filterPaymentsByPrice,
  getTotalPrice,
} from "@/utils/get-total-price"
import { SelectPrice } from "@/components/UI/Form/SelectPrice"
import { methodsEWallet, methodsMart, methodsVA } from "@/data/payment-methods"
import { PaymentMethod } from "@/components/PaymentMethod"
import { Textarea } from "@/components/UI/Textarea"
import { AddVoucherTopUp } from "@/components/UI/Form/AddVoucherTopUpForm"
import { TopUpCommentForm } from "@/components/UI/Form/TopUpCommentForm"

interface ShopPageContentProps {
  prePaidBrands: PriceListPrePaidProps[]
  slug: string
  settingsSite: {
    siteTitle: SettingDataProps | null
    siteTagline: SettingDataProps | null
    siteDescription: SettingDataProps | null
    siteMetaTitle: SettingDataProps | null
    siteMetaDescription: SettingDataProps | null
    siteDomain: SettingDataProps | null
    siteEmailShop: SettingDataProps | null
  }
  topUp: PriceListPrePaidProps | undefined
  products: PriceListPrePaidProps[]
  channel: {
    eWallet: PaymentMethodsProps[]
    virtualAccount: PaymentMethodsProps[]
    convenienceShop: PaymentMethodsProps[]
  } | null
  margin: {
    value: string
  } | null
}

interface FormTopUpProps {
  products: PriceListPrePaidProps[]
  topUp: PriceListPrePaidProps | undefined
  channel: {
    eWallet: PaymentMethodsProps[]
    virtualAccount: PaymentMethodsProps[]
    convenienceShop: PaymentMethodsProps[]
  } | null
  margin: {
    value: string
  } | null
  emailTopUp: string | undefined
  merchanTopUp: string | undefined
}
const FormTopUp = (props: FormTopUpProps) => {
  const { products, topUp, channel, margin, emailTopUp, merchanTopUp } = props

  const router = useRouter()
  const addToCart = useCartStore((state) => state.addToCart)
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
  const totalmargin = margin !== null ? parseInt(margin.value) : 15
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
    () => getServerTopUp(topUp?.brand ?? ""),
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
      toast({
        variant: "danger",
        description: "Silahkan Pilih Server",
      })
    } else if (!queryAccountId) {
      toast({
        variant: "danger",
        description: "Silahkan Masukkan ID",
      })
    } else if (amount && !amount.brand) {
      toast({
        variant: "danger",
        description: "Silahkan Pilih Metode Pembayaran",
      })
    } else if (payment && !payment.code) {
      toast({
        variant: "danger",
        description: "Silahkan Pilih Nominal",
      })
    } else if (amount && payment) {
      setOpenModalTopUp(true)
    }
  }, [amount, isTopUpServer, payment, queryAccountId, topUpServer])

  interface FormData {
    customer_name: string
    customer_email: string
    customer_phone?: string
    note?: string
  }

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
        toast({
          variant: "danger",
          description: "Silahkan Masukkan ID",
        })
      } else if (amount && !amount.brand) {
        toast({
          variant: "danger",
          description: "Silahkan Pilih Metode Pembayaran",
        })
      } else if (payment && !payment.code) {
        toast({
          variant: "danger",
          description: "Silahkan Pilih Nominal",
        })
      } else if (amount && payment) {
        try {
          const { accountId } = getBrandDetails(
            topUp?.brand ?? "",
            queryAccountId,
            topUpServer,
          )
          const totalAmount = fixedPrice > 0 ? fixedPrice : totalPrice

          interface TripayResponseData {
            success: boolean
            data: {
              merchant_ref: string
              reference: string
            }
          }

          interface TripayResponse {
            data: TripayResponseData
          }

          const [tripayResponse] = await http<TripayResponse>("POST", {
            url: "/top-up/tripay/transaction/create/closed",
            data: {
              payment_method: payment.code,
              amount: totalAmount,
              payment_provider: "tripay",
              customer_name: data.customer_name,
              customer_email: data.customer_email,
              customer_phone: data.customer_phone,
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
              note: data.note,
              callback_url: env.API,
              return_url: `https://${env.DOMAIN}/shop/topup/transaction`,
              expired_time: 0,
            },
          })

          if (tripayResponse) {
            const dataId = {
              id: tripayResponse.data.data.merchant_ref,
              sku: amount.buyer_sku_code,
              merchant_ref: tripayResponse.data.data.merchant_ref,
              refId: tripayResponse.data.data.reference,
              server: "",
              name: data.customer_name,
              brands: topUp?.brand ?? "",
              amount: totalAmount,
              fee_amount: totalAmount && totalAmount - amount.price,
              total_amount: totalAmount,
              account_id: accountId,
              note: data.note as string,
              voucher: fixedPrice > 0 ? voucherTopUp : null,
            }

            addToCart(dataId)
            router.push(
              "/shop/topup/transaction?tripay_reference=" +
                tripayResponse.data.data.reference,
            )
          }
        } catch (error) {
          console.log(error)
        }
      }
      setLoadingModal(false)
    },
    [
      queryAccountId,
      amount,
      payment,
      topUp?.brand,
      topUpServer,
      fixedPrice,
      totalPrice,
      voucherTopUp,
      addToCart,
      router,
    ],
  )

  return (
    <>
      <form
        className="mb-3 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-2 rounded border p-4">
          <div>
            <p>Masukkan Data Akun</p>
          </div>
          <div className="flex gap-2">
            <FormControl>
              <FormLabel>
                {topUp?.category === "E-Money"
                  ? "Nomor E-Wallet"
                  : topUp?.category === "Pulsa"
                  ? "Nomor HP"
                  : "ID"}
              </FormLabel>
              <Input
                type={
                  topUp?.category === "E-Money"
                    ? "number"
                    : topUp?.category === "Pulsa"
                    ? "number"
                    : "text"
                }
                value={queryAccountId}
                onChange={handleInputChange}
                placeholder={`Enter ${
                  topUp?.category === "E-Money"
                    ? "Nomor E-Wallet"
                    : topUp?.category === "Pulsa"
                    ? "Nomor HP"
                    : "ID"
                }`}
              />
            </FormControl>
            {isTopUpServer && (
              <AddTopUpServerForm
                brand={topUp?.brand ?? ""}
                addTopUpServer={setTopUpServer}
              />
            )}
          </div>
          {topUp?.category === "Games" && topUp?.brand !== "GARENA" && (
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
                    onClick={() => setOpenInfo(!openInfo)}
                    className="rounded-full bg-[#F39C12]"
                  >
                    <Icon.Help aria-label="Petunjuk" className="mr-2" />
                    Petunjuk
                  </Button>
                }
                title="Petunjuk"
                open={openInfo}
                onOpenChange={(eopen) => {
                  setOpenInfo(eopen)
                }}
                className="w-500px" // Tambahkan kelas CSS tambahan di sini
              />
            </div>
          )}
        </div>
        <div className="rounded border p-4">
          <div>
            <p>Pilih Nominal</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {products.map((price: PriceListPrePaidProps) => {
              const priceWithMargin = addMarginTopUp(price.price, totalmargin)
              const name = removeCharsBeforeNumberTopUpPrice(price.product_name)
              const priceIdr = changePriceToIDR(priceWithMargin)
              return (
                <SelectPrice
                  label={name}
                  key={price.product_name}
                  price={priceIdr}
                  active={selectedPriceName}
                  brand={topUp?.brand ?? ""}
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
            <p>Pilih Pembayaran</p>
          </div>
          {amount &&
            channel &&
            methodsEWallet.some((method) => method.maxamount > amount?.price) &&
            channel.eWallet.length > 0 && (
              <div className="rounded border p-2">
                <div
                  className="mb-2 w-full cursor-pointer p-2"
                  onClick={handleEWalletClick}
                >
                  <p>E-Wallet</p>
                </div>
                <div
                  className={`grid-cols-2 gap-4 transition-all md:grid-cols-3 ${
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
                        <PaymentMethod
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
            methodsVA.some((method) => method.minamount < amount.price) &&
            methodsVA.some((method) => method.maxamount > amount.price) &&
            channel.virtualAccount.length > 0 && (
              <div className="rounded border p-2">
                <div
                  className="mb-2 w-full cursor-pointer p-2"
                  onClick={handleVAClick}
                >
                  <p>Virtual Account</p>
                </div>
                <div
                  className={`grid-cols-2 gap-4 transition-all md:grid-cols-3  ${
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
                        <PaymentMethod
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
            methodsMart.some((method) => method.minamount < amount.price) &&
            methodsMart.some((method) => method.maxamount > amount.price) &&
            channel.convenienceShop.length > 0 && (
              <div className="rounded border p-2">
                <div
                  className="mb-2 w-full cursor-pointer p-2"
                  onClick={handleMartClick}
                >
                  <p>Convenience Shop</p>
                </div>
                <div
                  className={`grid-cols-2 gap-4 transition-all md:grid-cols-3  ${
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
                          <PaymentMethod
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
        <Button
          aria-label="Order Sekarang"
          onClick={handleSubmit(handleOpenModalTopUp)}
          className="bg-[#F39C12]"
        >
          Order Sekarang
        </Button>
      </form>
      <Modal
        title="Order Sekarang"
        content={
          <>
            <div>
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6 text-emerald-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    ></path>
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-semibold leading-6 text-white">
                    Create Order
                  </h3>
                  <p className="pt-4">
                    Make sure your account data and the product you choose are
                    valid and appropriate.
                  </p>
                  <div className="mt-2">
                    <div className="bg-murky-700 my-4 grid grid-cols-3 gap-4 rounded-md p-4 text-left">
                      <div>ID</div>
                      <div className="col-span-2">{`: ${queryAccountId}`}</div>
                      <div>Item</div>
                      <div className="col-span-2">{`: ${
                        amount && amount.product_name
                      }`}</div>
                      <div>Product</div>
                      <div className="col-span-2">{`: ${topUp?.brand}`}</div>
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
                  className="bg-[#F39C12]"
                >
                  Order Sekarang
                </Button>
              </div>
            </div>
          </>
        }
        open={openModalTopUp}
        onOpenChange={(open) => {
          setOpenModalTopUp(open)
        }}
      />
    </>
  )
}

export default function ShopShowPageContent({
  settingsSite,
  topUp,
  products,
  channel,
  margin,
}: ShopPageContentProps) {
  const { user } = useCurrentUser()
  const cleanedText = topUp?.product_name.replace(/\d+(\.\d+)?/g, "")

  return (
    <div className="mx-auto flex w-full flex-col space-y-4 px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      <div>
        <BannerTopup
          url={`/shop/topup/${topUp?.slug}`}
          brand={topUp?.brand ?? ""}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-2">
        <div className="order-2 w-full lg:order-1 lg:w-2/3">
          <FormTopUp
            products={products}
            topUp={topUp}
            channel={channel}
            margin={margin}
            emailTopUp={settingsSite.siteEmailShop?.value}
            merchanTopUp={settingsSite.siteTitle?.value}
          />
        </div>
        <div className="order-1 w-full lg:order-2 lg:w-1/3">
          <div className="sticky top-[70px] w-full rounded border p-4">
            <div className="mb-2 flex gap-2">
              <div>
                <ThumbnailTopUp
                  className="relative h-[75px] w-[75px]"
                  url={slugify(topUp?.brand ?? "")}
                />
              </div>
              <div>
                <p>{topUp?.brand}</p>
              </div>
            </div>
            <div>
              <p>
                Top Up {cleanedText} resmi legal 100% harga paling murah. Cara
                top up {topUp?.brand} termurah :
              </p>
              <ol className="dark:text-theme-200 list-decimal px-4">
                <li>Masukkan ID (SERVER)</li>
                <li>Pilih Nominal</li>
                <li>Pilih Pembayaran</li>
                <li>Tulis nama, email, dan nomor WhatsApp yg benar</li>
                <li>Klik Order Now &amp; lakukan Pembayaran</li>
                <li>Tunggu 1 detik pesanan masuk otomatis ke akun Anda</li>
              </ol>
              <p className="text-bold text-center text-lg text-[#F39C12]">
                Top Up Buka 24 Jam
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-theme-100 dark:border-theme-700 border-t" />
      {user?.id ? (
        <>
          <div className="mx-auto flex w-full flex-col space-y-4 px-0 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
            <TopUpCommentForm brand={topUp?.brand ?? ""} />
          </div>
        </>
      ) : (
        <NextLink href="/auth/login">
          <Button type="button">
            <Icon.Login className="-ml-1 mr-2 h-4 w-4" /> Login for review
          </Button>
        </NextLink>
      )}
    </div>
  )
}
