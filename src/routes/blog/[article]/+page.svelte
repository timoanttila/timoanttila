<script lang="ts">
  import dayjs from 'dayjs'
  import Icon from '@iconify/svelte'
  import { defaultImage, meta, siteUrl, siteTitle } from '$lib/store'

  export let data

  const canonicalBlog = `${siteUrl}blog`
  const canonical = `${canonicalBlog}/${data.slug}`

  const ldjsonArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: data.title,
    image: defaultImage,
    author: {
      '@type': 'Person',
      name: siteTitle,
      url: siteUrl,
    },
    url: canonical,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    datePublished: data.createdAt,
    dateCreated: data.createdAt,
    dateModified: data.updatedAt,
    description: data.description,
  }

  const ldjsonBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tutorials',
        item: canonicalBlog,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.title,
        item: canonical,
      },
    ],
  }

  const ldjson = `<script type="application/ld+json">${JSON.stringify(ldjsonArticle)}${JSON.stringify(ldjsonBreadcrumbs)}${'<'}/script>`

  $meta = {
    canonical,
    created: data.createdAt,
    description: data.description,
    image: defaultImage,
    ldjson,
    metaTitle: `${data.title} | ${siteTitle}`,
    title: data.title,
    type: 'article',
    updated: data.updatedAt,
  }
</script>

<div class="grid justify-end">
  <div class="grid grid-cols-3 right-16 top-0 w-32">
    <div>
      {#if data.prevUrl}
        <a class="btn-square" href={data.prevUrl} aria-label={`Previous article: ${data.prevTitle}`}>
          <Icon icon="mdi:chevron-left" />
        </a>
      {/if}
    </div>
    <div>
      <a aria-label="Stories about projects and life, easy-to-learn tutorials." class="btn-square" href="/blog">
        <Icon icon="mdi:list-box-outline" />
      </a>
    </div>
    <div>
      {#if data.nextUrl}
        <a class="btn-square" href={data.nextUrl} aria-label={`Next article: ${data.nextTitle}`}>
          <Icon icon="mdi:chevron-right" />
        </a>
      {/if}
    </div>
  </div>
</div>

<article id="content" class="block max-w-screen-lg mx-auto mb-10 mt-2 px-4 tutorial">
  <div class="max-w-screen-sm mb-10 mx-auto text-center">
    <h1 class="m-0 mb-2 text-article-title text-title">{data.title}</h1>
    <p class="m-0 text-xl md:text-2xl">{data.description}</p>
    <p>{dayjs(data.createdAt).format('MMMM D, YYYY')}</p>
  </div>

  <svelte:component this={data.content} />
</article>

<style scoped>
  h1 {
    font-size: clamp(1.8em, 2.2em, 6vw);
  }
</style>
