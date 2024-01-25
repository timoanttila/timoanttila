import {redirect} from '@sveltejs/kit'
import {slugify} from '$lib/store'

export const GET = async ({params}) => {
  throw redirect(301, `/blog/${slugify(params.article)}`)
}
