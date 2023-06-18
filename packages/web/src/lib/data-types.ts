export interface ErrorResponse {
  message: string
}

export interface CheckSuccessResponse {
  name: string
  success: boolean
  message: string
}

export interface ArticlePrimaryDataProps {
  id: string
  articles: ArticleDataProps[]
  createdAt: string
  updatedAt: string
}

export interface ArticleDataProps {
  id: string
  language: LanguageTypeData
  title: string
  content: string
  excerpt: string
  slug: string
  metaTitle: string
  metaDescription: string
  authors: UserDataProps[]
  editors: UserDataProps[]
  topics: TopicDataProps[]
  comments?: ArticleCommentDataProps[]
  featuredImage: MediaDataProps
  status: PostStatusData
  articlePrimary: ArticlePrimaryDataProps
  createdAt: string
  updatedAt: string
}

export type ArticleSitemapDataProps = Pick<
  ArticleDataProps,
  "slug" | "updatedAt"
>
export type DownloadSitemapDataProps = Pick<
  DownloadDataProps,
  "slug" | "updatedAt"
>
export interface TopicPrimaryDataProps {
  id: string
  topics: TopicDataProps[]
  createdAt: string
  updatedAt: string
}

export interface TopicDataProps {
  id: string
  language: LanguageTypeData
  title: string
  slug: string
  description: string
  metaTitle: string
  metaDescription: string
  type: TopicTypeData
  featuredImage?: MediaDataProps
  articles?: ArticleDataProps[]
  downloads?: DownloadDataProps[]
  topicPrimary: TopicPrimaryDataProps
  createdAt: string
  updatedAt: string
  _count: {
    articles?: number
    download?: number
  }
}

export type TopicSitemapDataProps = Pick<TopicDataProps, "slug" | "updatedAt">

export interface MediaDataProps {
  map: Map<string, number>
  id: string
  name: string
  url: string
  type: string
  description: string
  alt: string
  author: UserDataProps
  articles?: ArticleDataProps[]
  topics?: TopicDataProps
  downloads: DownloadDataProps[]
  downloadFiles: DownloadFileDataProps[]
  users?: UserDataProps[]
  createdAt: string
  updatedAt: string
}

export interface UserDataProps {
  id: string
  email: string
  username: string
  name: string
  about: string
  phoneNumber: string
  profilePicture: MediaDataProps
  metaTitle: string
  metaDescription: string
  role: UserDataRole
  articleAuthors: ArticleDataProps[]
  articleEditors: ArticleDataProps[]
  downloadAuthors: DownloadDataProps[]
  downloadFileAuthors: DownloadFileDataProps[]
  medias?: MediaDataProps
  articleComments?: ArticleCommentDataProps[]
  downloadComments?: DownloadCommentDataProps[]
  topUpReviews?: TopUpReviewDataProps[]
  _count: {
    articles?: number
    downloads?: number
    downloadFiles?: number
  }
  createdAt: string
  updatedAt: string
}

export interface WpCommentDataProps {
  id: string
  content: string
  wpPostSlug: string
  article: ArticleDataProps
  createdAt: string
  updatedAt: string
}

export interface PriceListPrePaidProps {
  slug: string
  thumbnail: string
  cover: string
  product_name: string
  category: string
  brand: string
  type: string
  seller_name: string
  price: number
  buyer_sku_code: string
  buyer_product_status: boolean
  seller_product_status: boolean
  unlimited_stock: boolean
  stock: number
  multi: boolean
  start_cut_off: string
  end_cut_off: string
  desc: string
}

export interface StatusPostPaidTopUpProps {
  ref_id: string
  customer_no: string
  buyer_sku_code: string
  message: string
  status: string
  rc: string
  sn: string
  buyer_last_saldo: number
  price: number

  customer_name: string

  admin: number

  selling_price: number
  desc: {
    tarif: string
    daya: number
    lembar_tagihan: number
    detail: {
      periode: string
      nilai_tagihan: string
      admin: string
      denda: string
      meter_awal: string
      meter_akhir: string
    }[]
  }
}

export interface TransactionDataProps {
  fee_amount: number
  account_id: string
  invoice_id: string
  sku: string
  reference: string
  merchant_ref: string | null
  payment_selection_type: string
  payment_method: string
  payment_name: string
  customer_name: string
  customer_email: string
  customer_phone: string
  callback_url: string | null
  return_url: string | null
  amount: number
  fee_merchant: number
  fee_customer: number
  total_fee: number
  amount_received: number
  pay_code: string | null
  pay_url: string
  checkout_url: string
  order_items: {
    sku: string
    name: string
    price: number
    quantity: number
    subtotal: number
  }[]

  status: string
  note: string | null
  created_at: number
  expired_at: number
  paid_at: number
}
export interface TopupProductProps {
  total_amount: number
  fee_amount: number
  totalFee?: number
  id: string
  sku: string
  account_id: string
  server: string
  refId: string
  note: string
  name: string
  voucher?: VoucherDataProps | null
  brands: string
  amount: number
  merchant_ref: string
}
export interface PaymentMethodsProps {
  fee_merchant: { flat: number | null; percent: number | null }
  name: string
  fee_customer: { flat: number | null; percent: number | null }
  group: string
  description: string
  icon_url: string
  code: string
  totalFee?: number
}

export interface StatusPrePaidTopUpProps {
  ref_id: string
  customer_no: string
  buyer_sku_code: string
  message: string
  status: string
  rc: string
  sn: string
  buyer_last_saldo: number
  price: number
}
export interface PriceListPostPaidProps {
  slug: string
  thumbnail: string
  cover: string
  product_name: string
  category: string
  brand: string
  seller_name: string
  admin: number
  commission: number
  buyer_sku_code: string
  buyer_product_status: true
  seller_product_status: true
  desc: string
}

export interface ArticleCommentDataProps {
  id: string
  content: string
  article: ArticleDataProps
  author: UserDataProps
  createdAt: string
  updatedAt: string
}

export interface BannerProps {
  index: number
  url: string
  active: boolean
}

export interface DownloadCommentDataProps {
  id: string
  content: string
  download: DownloadCommentDataProps
  author: UserDataProps
  createdAt: string
  updatedAt: string
}

export interface TopUpReviewDataProps {
  id: string
  content: string
  brand: string
  author: UserDataProps
  ratings: TopUpRatingDataProps[]
  createdAt: string
  updatedAt: string
}

export interface TopUpRatingDataProps {
  id: string
  rating: number
  brand: string
  author: UserDataProps
  reviews: TopUpReviewDataProps[]
  createdAt: string
  updatedAt: string
}

export interface TopUpTransactionDataProps {
  id: string
  invoiceId: string
  amount: number
  sku: string
  accountId: string
  customerName?: string
  customerEmail?: string
  customerPhone: string
  voucherCode?: string
  discountAmount?: number
  feeAmount: number
  totalAmount: number
  note?: string
  paymentProvider: PaymentProviderData
  paymentMethod: string
  PaymentStatusData: PaymentStatusData
  status: TopUpStatusData
  topUpProvider: TopUpProviderData
  createdAt: string
  updatedAt: string
}

export interface TopUpPriceListDataProps {
  id: string
  key: string
  value: string
  createdAt: string
  updatedAt: string
}

export interface TransactionCounterDataProps {
  id: string
  brand: string
  transactions: number
  createdAt: string
  updatedAt: string
}

export interface AdDataProps {
  length: number
  id: string
  title: string
  content: string
  position: AdPositionData
  type: AdTypeData
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface SettingDataProps {
  id: string
  key: string
  value: string
  createdAt: string
  updatedAt: string
}

export interface SettingsSiteProps {
  [x: string]: { value: string; key: string }
}

export interface DownloadPrimaryDataProps {
  id: string
  downloads: DownloadDataProps[]
  createdAt: string
  updatedAt: string
}

export interface DownloadDataProps {
  id: string
  title: string
  language: LanguageTypeData
  content: string
  excerpt: string
  slug: string
  metaTitle: string
  metaDescription: string
  developer: string
  operatingSystem: string
  license: string
  officialWeb: string
  schemaType: DownloadSchemaData
  type: DownloadTypeData
  topics: TopicDataProps[]
  status: PostStatusData
  featuredImage?: MediaDataProps
  downloadFiles: DownloadFileDataProps[]
  downloadComments: DownloadCommentDataProps[]
  authors: UserDataProps[]
  createdAt: string
  updatedAt: string
}

export interface DownloadFileDataProps {
  id: string
  title: string
  slug: string
  metaTitle: string
  metaDescription: string
  featuredImage?: MediaDataProps
  version: string
  downloadLink: string
  fileSize: string
  currency: string
  price: number
  status: PostStatusData
  authors: UserDataProps[]
  downloads: DownloadDataProps[]
  createdAt: string
  updatedAt: string
}

export interface VoucherDataProps {
  id: string
  name: string
  voucherCode: string
  discountPercentage: number
  discountMax: number
  VoucherAmount: number
  description: string
  expiration: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface ViewCounterDataProps {
  id: string
  slug: string
  views: number
  createdAt: string
  updatedAt: string
}

export type UserDataRole = "USER" | "PRO_USER" | "AUTHOR" | "ADMIN"

export type PostStatusData = "PUBLISHED" | "DRAFT" | "REJECTED" | "IN_REVIEW"

export type TopicTypeData =
  | "ALL"
  | "ARTICLE"
  | "REVIEW"
  | "TUTORIAL"
  | "GAME"
  | "TV"
  | "MOVIE"
  | "DOWNLOAD"

export type AdPositionData =
  | "HOME_BELOW_HEADER"
  | "ARTICLE_BELOW_HEADER"
  | "TOPIC_BELOW_HEADER"
  | "DOWNLOAD_BELOW_HEADER"
  | "SINGLE_ARTICLE_ABOVE_CONTENT"
  | "SINGLE_ARTICLE_INLINE_CONTENT"
  | "SINGLE_ARTICLE_BELOW_CONTENT"
  | "SINGLE_ARTICLE_POP_UP"
  | "SINGLE_DOWNLOAD_ABOVE_CONTENT"
  | "SINGLE_DOWNLOAD_INLINE_CONTENT"
  | "SINGLE_DOWNLOAD_BELOW_CONTENT"
  | "SINGLE_DOWNLOAD_POP_UP"
  | "DOWNLOADING_PAGE"

export type AdTypeData = "PLAIN_AD" | "ADSENSE"

export type DownloadSchemaData =
  | "DownloadApp"
  | "BusinessApp"
  | "MultimediaApp"
  | "MobileApp"
  | "WebApp"
  | "SocialNetworkingApp"
  | "TravelApp"
  | "ShoppingApp"
  | "SportsApp"
  | "LifeStyleApp"
  | "DesignApp"
  | "DeveloperApp"
  | "DriverApp"
  | "EducationalApp"
  | "HealthApp"
  | "FinanceApp"
  | "SecurityApp"
  | "BrowserApp"
  | "CommunicationApp"
  | "HomeApp"
  | "UtilitiesApp"
  | "RefereceApp"
  | "GameApp"

export type DownloadTypeData = "app" | "game"

export type PaymentStatusData =
  | "UNPAID"
  | "PAID"
  | "FAILED"
  | "EXPIRED"
  | "ERROR"
  | "REFUNDED"

export type TopUpProviderData = "DIGIFLAZZ" | "APIGAMES"
export type PaymentProviderData = "DUITKU" | "MIDTRANS" | "TRIPAY"
export type TopUpStatusData = "PROCESSING" | "SUCCESS" | "FAILED" | "ERROR"

export type LanguageTypeData = "id" | "en"
