export enum UserDataRole {
  "USER" = "USER",
  "AUTHOR" = "AUTHOR",
  "ADMIN" = "ADMIN",
}

export enum ArticleStatusData {
  "PUBLISHED" = "PUBLISHED",
  "DRAFT" = "DRAFT",
  "REJECTED" = "REJECTED",
  "IN_REVIEW" = "IN_REVIEW",
}

export enum ArticleTypeData {
  "DEFAULT" = "DEFAULT",
  "LIST" = "LIST",
  "HOWTO" = "HOWTO",
  "REVIEW" = "REVIEW",
}

export enum AdPositionData {
  "HOME_BELOW_HEADER" = "HOME_BELOW_HEADER",
  "ARTICLE_BELOW_HEADER" = "ARTICLE_BELOW_HEADER",
  "TOPIC_BELOW_HEADER" = "TOPIC_BELOW_HEADER",
  "SINGLE_ARTICLE_ABOVE" = "SINGLE_ARTICLE_ABOVE",
  "SINGLE_ARTICLE_INLINE" = "SINGLE_ARTICLE_INLINE",
  "SINGLE_ARTICLE_BELOW" = "SINGLE_ARTICLE_BELOW",
  "SINGLE_ARTICLE_POP_UP" = "SINGLE_ARTICLE_POP_UP",
}

export enum AdTypeData {
  "PLAIN_AD" = "PLAIN_AD",
  "ADSENSE" = "ADSENSE",
}

export enum TopicTypeData {
  "ALL" = "ALL",
  "ARTICLE" = "ARTICLE",
  "GAME" = "GAME",
  "MOVIE" = "MOVIE",
  "TV" = "TV",
}

export interface ArticleDataProps {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  meta_title: string
  meta_description: string
  author: UserDataProps
  topics: TopicDataProps
  comments?: CommentDataProps
  featuredImage: MediaDataProps
  status: ArticleStatusData
  type: ArticleTypeData
  createdAt: string
  updatedAt: string
}

export type ArticleSitemapDataProps = Pick<
  ArticleDataProps,
  "slug" | "updatedAt"
>

export interface TopicDataProps {
  id: string
  type: TopicTypeData
  featuredImage?: MediaDataProps
  translations?: TopicTranslationDataProps[]
  articles: ArticleDataProps[]
  createdAt: string
  updatedAt: string
  _count: {
    articles: number
  }
}

export interface TopicTranslationDataProps {
  id: string
  title: string
  slug: string
  description: string
  meta_title: string
  meta_description: string
  createdAt: string
  updatedAt: string
}

export type TopicSitemapDataProps = {
  translations: Pick<TopicTranslationDataProps, "slug" | "updatedAt">
}

export interface MediaDataProps {
  map: Map<string, number>
  id: string
  name: string
  url: string
  type: string
  description: string
  alt: string
  author: MediaDataProps
  topics?: TopicDataProps
  users?: UserDataProps
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
  meta_title: string
  meta_description: string
  role: UserDataRole
  articles: ArticleDataProps[]
  topics?: TopicDataProps
  medias?: MediaDataProps
  comments?: CommentDataProps
  ads?: AdDataProps
  script?: ScriptDataProps
  _count: {
    articles: number
  }
  createdAt: string
  updatedAt: string
}

export interface CommentDataProps {
  id: string
  content: string
  article: ArticleDataProps
  author: UserDataProps
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
  author: UserDataProps
  createdAt: string
  updatedAt: string
}

export interface ScriptDataProps {
  id: string
  title: string
  content: string
  active: boolean
  author: UserDataProps
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

export interface ErrorResponse {
  message: string
}
