<script lang="ts">
  import Icon from '$lib/Icon.svelte'
  import {colorScheme, defaultImage, fontSize, metaData, siteUrl, width} from '$lib/store'
  import '$lib/app.css'

  let {children} = $props()

  const menu = [
    {name: 'Home', link: '/', icon: 'home', aria: 'A brief description of me.'},
    {
      name: 'About',
      link: '/about',
      icon: 'account',
      size: 28,
      aria: 'What is happening in my life right now and what is important to me.'
    },
    {
      name: 'Articles',
      link: '/blog',
      icon: 'list',
      aria: 'A collection of articles about web development, programming, and life.'
    },
    {
      name: 'Web Developer',
      link: 'https://tuspe.com/en/websites',
      icon: 'company',
      size: 34,
      aria: 'Creating beautiful and responsive websites for small businesses.'
    }
  ]

  const social = [
    {name: 'LinkedIn', link: 'https://www.linkedin.com/in/anttilatimo/', icon: 'linkedin'},
    {name: 'GitHub', link: 'https://github.com/timoanttila', icon: 'github'},
    {name: 'Contact me on WhatsApp', link: 'https://wa.me/358453111786', icon: 'whatsapp'},
    {name: 'Download CV', link: '/timoanttila-cv.pdf', icon: 'cv', viewBox: '0 0 448 512'}
  ]

  const colors = [
    {name: 'violet', color: '422e43'},
    {name: 'dark', color: '121212'},
    {name: 'white', color: 'fff'}
  ]

  let accessibilityOpen = $state(false),
    menuOpen = $state(false)

  const changeFontSize = (value: number = 18) => {
    if (value > 28) {
      value = 28
    } else if (value < 14) {
      value = 14
    }

    $fontSize = value
  }
</script>

<svelte:window bind:innerWidth={$width} />

<svelte:head>
  {#if $metaData?.title}
    <title>{$metaData.metaTitle ?? $metaData.title}</title>
    <meta property="og:title" content={$metaData.title} />
    <meta name="description" property="og:description" content={$metaData.description} />
    <meta name="canonical" property="og:url" content={$metaData.canonical} />
    <meta property="og:image" content={$metaData.image ? `${siteUrl}images/${$metaData.image}` : defaultImage} />
    <meta property="og:type" content={$metaData.type ?? 'website'} />
    {#if $metaData.created}
      <meta content={$metaData.created} name="pubdate" property="og:pubdate" />
      <meta content={$metaData.created} property="article:published_time" />
    {/if}
    {#if $metaData.updated}
      <meta content={$metaData.updated} name="revised" property="article:modified_time" />
    {/if}
    {#if $metaData.ldjson}
      {@html $metaData.ldjson}
    {/if}
    {#if $metaData?.noindex}
      <meta name="robots" content="noindex,nofollow" />
    {/if}
  {/if}
</svelte:head>

<a class="hidden" href="#content">Jump to the content</a>
<a class="hidden" href="#menu">Jump to the navigation</a>
<a class="hidden" href="#buttons">Jump to the sidebar buttons</a>

<div class={`relative w-screen overflow-x-hidden bg-body ${$colorScheme}`} style={`font-size:${$fontSize}px`}>
  <header class="bg-body fixed flex h-screen items-center right-0 top-0 z-50" class:w-12={!menuOpen} class:w-screen={menuOpen}>
    <nav id="menu" class="font-poppins mx-auto text-2xl text-center" class:hidden={!menuOpen}>
      <ul class="m-0 p-0 w-full">
        {#each menu as item}
          <li class="block">
            <a onclick={() => (menuOpen = false)} class="block no-underline p-6 text-menu uppercase" href={item.link} aria-label={item.aria}>
              {item.name}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <div id="buttons" class="absolute bg-sidebar h-screen right-0 top-0 w-12">
      <div class="mb-6 w-full">
        <button onclick={() => (menuOpen = !menuOpen)} class="btn-square" aria-label="Open / close the main navigation" aria-controls="menu" aria-expanded={menuOpen} aria-haspopup="true">
          <Icon icon="menu" />
        </button>

        <button onclick={() => (accessibilityOpen = !accessibilityOpen)} class="btn-square" aria-label="Accessibility options" aria-controls="accessibility" aria-expanded={accessibilityOpen} aria-haspopup="true">
          <Icon icon="human" size={32} />
        </button>

        <div id="accessibility" class:hidden={!accessibilityOpen} class="absolute bg-sidebar p-2 right-14 rounded-full top-10 w-16">
          <button onclick={() => changeFontSize($fontSize + 1)} class="btn-square text-center" class:cursor-not-allowed={$fontSize >= 28} aria-label={`Increase the font size of the site. Current font size is ${$fontSize}px.`} disabled={$fontSize >= 28}>
            <Icon icon="font-up" />
          </button>

          <button onclick={() => changeFontSize($fontSize - 1)} class="btn-square mb-4 text-center" class:cursor-not-allowed={$fontSize <= 14} aria-label={`Decrease the font size of the site. Current font size is ${$fontSize}px.`} disabled={$fontSize <= 14}>
            <Icon icon="font-down" />
          </button>

          {#each colors as color}
            <button onclick={() => colorScheme.set(color.name)} class="btn-square text-center" aria-label={`Change theme color to ${color.name}`}>
              <span class="border border-solid border-text border-opacity-80 h-8 mx-auto rounded-full w-8" style={`background-color:#${color.color}`}>
                <span class="hidden">Color scheme: {color.name}</span>
              </span>
            </button>
          {/each}
        </div>
      </div>

      <nav class="block w-full">
        <ul class="m-0 p-0 w-full">
          {#each menu as item}
            <li class="block">
              <a class="btn-square" href={item.link} aria-label={item.name}>
                <Icon icon={item.icon} size={item.size ?? 36} title={item.name} />
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <ul class="absolute bottom-0 left-0 m-0 p-0 w-full">
        {#each social as item}
          <li class="block">
            <a class="btn-square external" href={item.link} aria-label={item.name} target="_blank" rel="me">
              <Icon icon={item.icon} title={item.name} viewBox={item.viewBox ?? '0 0 24 24'} />
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </header>

  <main class="block h-screen overflow-x-hidden overflow-y-auto mr-12">
    {@render children?.()}
  </main>
</div>
