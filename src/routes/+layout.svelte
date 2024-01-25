<script lang="ts">
  import { colorScheme, defaultImage, fontSize, meta, width } from '$lib/store'
  import Header from '$lib/Header.svelte'
  import '$lib/app.css'
</script>

<svelte:window bind:innerWidth={$width} />

<svelte:head>
  {#if $meta?.title}
    <title>{$meta.metaTitle ?? $meta.title}</title>
    <meta property="og:title" content={$meta.title} />
    <meta name="description" property="og:description" content={$meta.description} />
    <meta name="canonical" property="og:url" content={$meta.canonical} />
    <meta property="og:image" content={$meta.image ?? defaultImage} />
    <meta property="og:type" content={$meta.type ?? 'website'} />
    {#if $meta.created}
      <meta content={$meta.created} name="pubdate" property="og:pubdate" />
      <meta content={$meta.created} property="article:published_time" />
      <meta content={$meta.updated} name="revised" property="article:modified_time" />
    {/if}
    {#if $meta.ldjson}
      {@html $meta.ldjson}
    {/if}
    {#if $meta?.noindex}
      <meta name="robots" content="noindex,nofollow" />
    {/if}
  {/if}
</svelte:head>

<a class="hidden" href="#content">Jump to the content</a>
<a class="hidden" href="#menu">Jump to the navigation</a>
<a class="hidden" href="#buttons">Jump to the sidebar buttons</a>

<div class={`relative w-screen overflow-x-hidden bg-body ${$colorScheme}`} style={`font-size:${$fontSize}px`}>
  <Header />

  <main class="block h-screen overflow-x-hidden overflow-y-auto mr-12">
    <slot />
  </main>
</div>
