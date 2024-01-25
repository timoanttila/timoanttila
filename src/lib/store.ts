import {writable} from 'svelte/store'

interface Meta {
  canonical: string
  created?: string
  description: string
  image?: string
  ldjson?: string
  metaTitle?: string
  noindex?: boolean
  title: string
  type?: string
  updated?: string
}

export const colorScheme = writable<string>('dark')
export const fontSize = writable<number>(18)
export const meta = writable<Meta | null>(null)
export const width = writable<number | null>(null)

export const siteTitle = 'Timo Anttila'
export const siteUrl = 'https://timoanttila.com/'
export const defaultImage = `${siteUrl}images/social-timoanttila.webp`
export const defaultImageAlt = 'Web Developer Timo Anttila'

export const slugify = (value: string): string => {
  return value.toLowerCase().replace(/[^a-z0-9-]/gi, '')
}
