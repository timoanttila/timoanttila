import type {PageLoad} from './$types'

export const load: PageLoad = async ({fetch, params}) => {
  const slug = params['slug'] // retrieve the "slug" param

  return {
    slug
  }
}
