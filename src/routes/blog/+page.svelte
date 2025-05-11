<script lang="ts">
  import dayjs from 'dayjs'
  import {metaData, siteTitle, siteUrl, width} from '$lib/store'

  export let data: {articles: any[]}

  const title = 'Tutorials'
  const description = 'Easy to read tutorials / guides for web developers and server admins. The articles are based on my own experiences and information that I have found on the internet.'

  const canonical = `${siteUrl}blog`

  const ldjsonBreadcrumbs = {
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
        name: 'Tutorials',
        item: canonical
      }
    ]
  }

  const ldjson = `<script type="application/ld+json">${JSON.stringify(ldjsonBreadcrumbs)}${'<'}/script>`

  $metaData = {
    canonical,
    description,
    image: `${siteUrl}images/social-laptop.webp`,
    ldjson,
    metaTitle: `${title} | ${siteTitle}`,
    title
  }
</script>

<div id="content" class="max-w-screen-sm mx-auto mt-10 px-6 text-center">
  <h1 class="m-0 mb-2 text-title">{title}</h1>
  <p class="m-0 text-2xl">{description}</p>
</div>

<ul id="articles" class="gap-6 grid md:grid-cols-2 xl:grid-cols-3 max-w-screen-2xl mx-auto my-10 px-4 py-0" title={`List of articles I have written (${data.articles.length})`}>
  {#each data.articles as post, index}
    <li id={`post-${index}`} class="gap-4 grid" aria-labelledby={`title-${index}`} aria-describedby={`description-${index}`}>
      {#if $width && $width > 768}
        <div class="published text-center">
          <div class="border border-solid font-bold mb-2 p-2 rounded-lg">
            <div class="text-3xl">{dayjs(post.createdAt).format('DD')}</div>
            <div class="text-xl">{dayjs(post.createdAt).format('MMM')}</div>
          </div>
          <div>{dayjs(post.createdAt).format('YYYY')}</div>
        </div>
      {/if}

      <div class="info">
        <h2 class="m-0 text-2xl">
          <a id={`title-${index}`} class="block hover:underline no-underline" href={`/blog/${post.slug}`}>{post.title}</a>
        </h2>
        <time datetime={dayjs(post.createdAt).format('YYYY-MM-DDTHH:mm:ssZ[Z]')} class:hidden={$width && $width > 768}>{dayjs(post.createdAt).format('DD.MM.YYYY')}</time>
        <div id={`description-${index}`} class="description mt-2">{post.description}</div>
      </div>
    </li>
  {/each}
</ul>
