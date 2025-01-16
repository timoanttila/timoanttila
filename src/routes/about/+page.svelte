<script lang="ts">
  import dayjs from 'dayjs'
  import {defaultImage, meta, siteTitle, siteUrl, width} from '$lib/store'
  let {data} = $props()

  const canonical = `${siteUrl}about`,
    ldjsonArticle = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      image: defaultImage,
      author: {
        '@type': 'Person',
        name: siteTitle,
        url: siteUrl
      },
      wordcount: 447,
      url: canonical,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical
      },
      datePublished: data.createdAt,
      dateCreated: data.createdAt,
      dateModified: data.updatedAt,
      description: data.description
    },
    ldjsonBreadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: data.title,
          item: canonical
        }
      ]
    },
    ldjson = `<script type="application/ld+json">${JSON.stringify(ldjsonArticle)}${JSON.stringify(ldjsonBreadcrumbs)}${'<'}/script>`,
    imageAlt = 'Timo & Rosemary - Together forever'

  $meta = {
    canonical,
    created: data.createdAt,
    description: data.description,
    image: defaultImage,
    ldjson,
    metaTitle: `${siteTitle} | ${data.title}`,
    title: data.title,
    type: 'article',
    updated: data.updatedAt
  }

  const Component = $derived(data.content)
</script>

<div class="h-screen lg:gap-10 lg:grid lg:grid-cols-5 lg:items-center mx-auto overflow-hidden">
  <div class="lg:col-span-2 pl-10 z-20">
    {#if $width && $width >= 1024}
      <img src="/images/timo-rose-homabay-23-672.webp" height="972" width="672" alt={imageAlt} class="block h-auto max-h-[90vh] object-cover object-top rounded-2xl w-full" decoding="async" />
    {/if}
  </div>

  <div class="h-screen lg:col-span-3 overflow-y-auto">
    <article class="max-w-screen-lg mx-auto lg:pr-10 px-4 py-10">
      {#if $width && $width < 1024}
        <img src="/images/timo-rose-homabay-23-250.webp" height="250" width="250" alt={imageAlt} class="block bg-sidebar h-auto max-w-full mb-10 mx-auto p-2 rounded-full" decoding="async" />
      {/if}

      <h1 class="m-0 max-w-screen-sm mb-4 text-title">{data.title}</h1>
      <p class="m-0 text-2xl">{data.description}</p>
      <p>Updated: <time datetime={data.updatedAt}>{dayjs(data.updatedAt).format('MMMM D, YYYY')}</time></p>
      <div class="content leading-normal">
        {#if data.content}
          <Component />
        {/if}
      </div>
    </article>
  </div>

  {#if $width && $width >= 1024}
    <div id="photo-bg" class="fixed h-full left-0 top-0 w-[30vw] z-10"></div>
  {/if}
</div>
