export interface Article extends ArticleList {
  content: string
  image: {
    alt: string
    id: string
    slug: string
  }
  next: Tag
  prev: Tag
}

interface ArticleList extends Tag {
  articleTags: {
    tagId: string
    tag: {
      slug: string
      title: string
    }
  }[]
  createdAt: string
  description: string
  updatedAt: string
}

export interface Query {
  data: ArticleList[]
  query: {
    pageNumber: number
    pageSize: number
    totalCount: number
    totalPages: number
  }
}

export interface Tag {
  id: string
  slug: string
  title: string
}
