import { LanguageTypeData } from "./data-types"

export interface WpAvatarDataProps {
  url: string
}

export interface WpAuthorsDataProps {
  node: WpAuthorsDataProps
  name: string
  description?: string
  seo: WpSeoProps
  slug: string
  bio: string
  avatar: WpAvatarDataProps
  og: WpOgDataProps
  title: string
  uri: string
}

export interface WpFeaturedImageDataProps {
  node: WpFeaturedImageDataProps
  id: string
  sourceUrl: string
  altText: string
  caption: string
  srcSet: string
  sizes: string
}

export interface WpCategoriesDataProps {
  language: {
    slug: LanguageTypeData
  }
  title: string
  seo: WpSeoProps
  id: string
  name: string
  children: {
    nodes: {
      slug: string
      name: string
      taxonomyName: string
    }[]
  }
  slug: string
  parent?: { node: { id: string } }
  description?: string
  og: WpOgDataProps
}

export interface SeoWPProps {
  title: string
  excerpt: string
  description: string
  slug: string
  category: WpCategoriesDataProps
  authorName: string
  authorUrl: string
  authorImg: string
  categories: WpCategoriesDataProps[]
  featuredImageUrl: string
  featuredImageAlt: string
  featuredImageCaption: string
  date: string
  modified: string
  tags: WpTagsDataProps[]
}
export interface WpTagsDataProps {
  language: { slug: LanguageTypeData }
  title: string
  seo: WpSeoProps

  id: string
  name: string
  slug: string
  description?: string
  og: WpOgDataProps
}
export interface WpTagsEdgesDataProps {
  edges: { node: WpTagsDataProps }[]
}
export interface WpCategoriesEdgesDataProps {
  edges: { node: WpCategoriesDataProps }[]
}
export interface WpSinglePostDataProps {
  language: {
    slug: LanguageTypeData
  }
  id: string
  postId: number
  article: string
  title: string
  metaTitle: string
  description: string
  slug: string
  excerpt: string
  date: string
  seo: WpSeoProps
  published: string
  modified: string
  content: string
  featuredImage: WpFeaturedImageDataProps
  categories: WpCategoriesDataProps[]
  tags: WpTagsDataProps[]
  author: WpAuthorsDataProps
  authorUrl: string
  authorImg: string
  authorName: string
  featuredImageCaption: string
  featuredImageUrl: string
  featuredImageAlt: string
  uri: string
}
export interface WpInfinitePostsProps {
  pageInfo: WPPageInfoProps
  posts: WpSinglePostDataProps[]
}
export interface WpSeoProps {
  title: string
  jsonLd: { raw: string }
  description: string
}
export interface WpPopularPosts {
  slug: string
  views: number
  date: string
  post: WpSinglePostDataProps
}

export interface WpArticleDataProps {
  publishedTime: string
  modifiedTime: string
}

export interface WpPostsDataProps {
  slug: string
  post: WpSinglePostDataProps
}

export interface WpSiteDataProps {
  description: string
  language: string
  title: string
}

export interface WpOgDataProps {
  title: string
  description: string
  imageUrl: string
  imageSecureUrl: string
  imageWidth: string
  imageHeight: string
  url: string
  type: string
}

export interface WpTwitterDataProps {
  title: string
  ImageUrl: string
  altText: string
}

export interface WPPageInfoProps {
  hasNextPage: boolean
  endCursor: string
  offsetPagination: { total: number }
}

export interface WpMapPostDataProps {
  id: string
  postId: number
  article: string
  title: string
  metaTitle: string
  description: string
  slug: string
  excerpt: string
  date: string
  seo: WpSeoProps
  published: string
  modified: string
  content: string
  featuredImage: WpFeaturedImageDataProps
  categories: WpCategoriesEdgesDataProps
  tags: WpTagsEdgesDataProps
  author: WpAuthorsDataProps
  authorUrl: string
  authorImg: string
  authorName: string
  featuredImageCaption: string
  featuredImageUrl: string
  featuredImageAlt: string
  uri: string
}

export interface WpResAllPostsProps {
  data: {
    posts: {
      pageInfo: WPPageInfoProps
      edges: { node: WpMapPostDataProps }[]
    }
  }
}

export interface WpResPostProps {
  data: {
    post: WpMapPostDataProps
  }
}

export interface WpResPostsByTagProps {
  data: {
    tag: {
      posts: {
        pageInfo: WPPageInfoProps
        edges: { node: WpMapPostDataProps }[]
      }
    }
  }
}

export interface WpResGetAllTagsProps {
  tags: {
    edges: {
      node: WpTagsDataProps
    }[]
  }
}

export interface WpMenusProps {
  url: string
  label: string
}

export interface WpResMenusProps {
  menu: {
    menuItems: { edges: { node: { url: string; label: string } }[] }
  }
}
