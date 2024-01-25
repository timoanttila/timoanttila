<script lang="ts">
  import { defaultImage, meta, siteTitle, siteUrl } from '$lib/store'
  export let data

  const canonical = `${siteUrl}${data.slug}`

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
        name: data.title,
        item: canonical,
      },
    ],
  }

  const ldjson = `<script type="application/ld+json">${JSON.stringify(ldjsonBreadcrumbs)}${'<'}/script>`

  $meta = {
    canonical,
    description: data.description,
    image: defaultImage,
    ldjson,
    metaTitle: `${data.title} | ${siteTitle}`,
    title: data.title,
    type: 'article',
  }

  const references = [
    {
      title: 'FC KTP',
      link: 'https://fcktp.fi/',
      image: 'nuxt-fcktp',
      alt: '',
    },
    {
      title: 'Foam Party',
      link: 'https://foamparty.fi/',
      image: 'processwire-foamparty',
      alt: '',
    },
    {
      title: 'Borrowed Cookbook',
      link: 'https://borrowedcookbook.com/',
      image: 'svelte-borrowedcookbook',
      alt: '',
    },
    {
      title: 'Jalavilla',
      link: 'https://jalavilla.com/',
      image: 'processwire-jalavilla',
      alt: '',
    },
    {
      title: 'Hyvänolon Kauneuskeskus Ruusunen',
      link: 'https://ruusunen.info/',
      image: 'processwire-ruusunen',
      alt: '',
    },
    {
      title: 'Ratsukko',
      link: 'https://ratsukko.com/',
      image: 'processwire-ratsukko',
      alt: '',
    },
    {
      title: 'MyRatsukko',
      link: 'https://ratsukko.fi/',
      image: 'svelte-ratsukko',
      alt: '',
    },
    {
      title: 'LaKu Stall',
      link: 'https://lakustall.com/',
      image: 'processwire-lakustall',
      alt: '',
    },
    {
      title: 'Kestopigmentoinnit',
      link: 'https://www.kestopigmentoinnit.fi/',
      image: 'processwire-kestopigmentoinnit',
      alt: '',
    },
  ]
</script>

<div class="mb-10 overflow-y-auto">
  <div class="xl:max-w-screen-lg xl:mx-auto xl:px-4 xl:mt-10">
    <img class="block h-auto xl:rounded-2xl shadow-lg w-full" src={`/images/${data.image}-920.webp`} srcset={`/images/${data.image}-360.webp 360w, /images/${data.image}-768.webp 768w, /images/${data.image}-920.webp 920w`} sizes="(max-width: 450px) 360px, (max-width: 768px) 768px, 920px" alt={data.imageAlt ?? data.title} width="920" height="450" decoding="async" />
  </div>

  <article id="content" class="max-w-screen-lg mx-auto px-4">
    <h1 class="mb-4 mt-8 text-3xl md:text-5xl text-center text-title">{data.title}</h1>
    <svelte:component this={data.content} />

    <div class="gap-4 grid xs:grid-cols-2 md:grid-cols-3">
      {#each references as reference}
        <a href={reference.link}>
          <img class="bg-white block h-auto p-1 rounded-xl shadow-lg w-full" src={`/references/${reference.image}-320.webp`} alt={reference.title} height="200" width="320" decoding="async" loading="lazy" />
        </a>
      {/each}
    </div>
  </article>
</div>
