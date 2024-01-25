<script lang="ts">
  import Icon from '@iconify/svelte'
  import { colorScheme, fontSize } from '$lib/store'

  const menu = [
    { name: 'Home', link: '/', icon: 'home', aria: 'A brief description of me.' },
    {
      name: 'About',
      link: '/about',
      icon: 'account',
      aria: 'What is happening in my life right now and what is important to me.',
    },
    {
      name: 'Articles',
      link: '/blog',
      icon: 'post-outline',
      aria: 'A collection of articles about web development, programming, and life.',
    },
    {
      name: 'Web Developer',
      link: '/websites',
      icon: 'code-tags',
      aria: 'Creating beautiful and responsive websites for small businesses.',
    },
  ]

  const social = [
    { name: 'Contact me on WhatsApp', link: 'https://wa.me/358453111786', icon: 'mdi:whatsapp' },
    { name: 'Download CV', link: '/timoanttila-cv.pdf', icon: 'pepicons-pencil:cv' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/anttilatimo/', icon: 'mdi:linkedin' },
    { name: 'Reddit', link: 'https://www.reddit.com/user/timoanttila', icon: 'mdi:reddit' },
    { name: 'GitHub', link: 'https://github.com/timoanttila', icon: 'mdi:github' },
    { name: 'Instagram', link: 'https://www.instagram.com/_timoanttila/', icon: 'mdi:instagram' },
  ]

  const colors = [
    { name: 'violet', color: '422e43' },
    { name: 'dark', color: '121212' },
    { name: 'white', color: 'fff' },
  ]

  let menuOpen = false,
    accessibilityOpen = false

  const changeFontSize = (value: number = 18) => {
    if (value > 28) {
      value = 28
    } else if (value < 14) {
      value = 14
    }

    $fontSize = value
  }
</script>

<header class="bg-body fixed flex h-screen items-center right-0 top-0 z-50" class:w-12={!menuOpen} class:w-screen={menuOpen}>
  <nav id="menu" class="font-poppins mx-auto text-2xl text-center" class:hidden={!menuOpen}>
    <ul class="m-0 p-0 w-full">
      {#each menu as item}
        <li class="block">
          <a on:click={() => (menuOpen = false)} class="block no-underline p-6 text-menu uppercase" href={item.link} aria-label={item.aria}>
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <div id="buttons" class="absolute bg-sidebar h-screen right-0 top-0 w-12">
    <div class="mb-6 w-full">
      <button on:click={() => (menuOpen = !menuOpen)} class="btn-square" aria-label="Open / close the main navigation" aria-controls="menu" aria-expanded={menuOpen} aria-haspopup="true">
        <Icon icon="mdi:menu" aria-hidden="true" />
      </button>

      <button on:click={() => (accessibilityOpen = !accessibilityOpen)} class="btn-square" aria-label="Accessibility options" aria-controls="accessibility" aria-expanded={accessibilityOpen} aria-haspopup="true">
        <Icon icon="mdi:human" aria-hidden="true" />
      </button>

      <div id="accessibility" class:hidden={!accessibilityOpen} class="absolute bg-sidebar p-2 right-14 rounded-full top-10 w-16">
        <button on:click={() => changeFontSize($fontSize + 1)} class="btn-square text-center" class:cursor-not-allowed={$fontSize >= 28} aria-label={`Increase the font size of the site. Current font size is ${$fontSize}px.`} disabled={$fontSize >= 28}>
          <Icon icon="mdi:format-font-size-increase" />
        </button>

        <button on:click={() => changeFontSize($fontSize - 1)} class="btn-square mb-4 text-center" class:cursor-not-allowed={$fontSize <= 14} aria-label={`Decrease the font size of the site. Current font size is ${$fontSize}px.`} disabled={$fontSize <= 14}>
          <Icon icon="mdi:format-font-size-decrease" />
        </button>

        {#each colors as color}
          <button on:click={() => colorScheme.set(color.name)} class="btn-square text-center" aria-label={`Change theme color to ${color.name}`}>
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
              <Icon icon={`mdi:${item.icon}`} aria-hidden="true" />
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <ul class="absolute bottom-0 left-0 m-0 p-0 w-full">
      {#each social as item}
        <li class="block">
          <a class="btn-square external" href={item.link} aria-label={item.name} target="_blank" rel="me">
            <Icon icon={item.icon} aria-hidden="true" />
          </a>
        </li>
      {/each}
    </ul>
  </div>
</header>
