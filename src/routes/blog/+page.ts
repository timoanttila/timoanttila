import dayjs from 'dayjs'
import type {PageLoad} from './$types'

export const load: PageLoad = async () => {
  const allPostFiles = import.meta.glob('./*.md')
  const iterablePostFiles = Object.keys(allPostFiles).map(path => ({path, resolver: allPostFiles[path]}))

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ({path, resolver}) => {
      const module = (await resolver()) as any
      const {metadata} = module // Access metadata directly
      return {...metadata, slug: path.slice(2, -3)}
    })
  )
  return {articles: allPosts.filter(post => !post.noList).sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())}
}
