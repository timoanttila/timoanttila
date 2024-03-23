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
export const cacheTime = {'cache-control': 'max-age=2629800, stale-while-revalidate=86400'}

/**
 * Converts a string to a slug by removing non-alphanumeric characters.
 * @param value The input string to be slugified.
 * @returns The slugified string.
 */
export const slugify = (value: any): string => {
  if (!value) return ''
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9.@-]/gi, '')
}
