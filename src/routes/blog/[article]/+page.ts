import {slugify} from '$lib/store'

export async function load({params}) {
  const post = await import(`../${slugify(params.article)}.md`)

  return {
    ...post.metadata,
    slug: params.article,
    content: post.default
  }
}
