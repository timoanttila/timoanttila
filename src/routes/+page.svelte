<script lang="ts">
  import Icon from '@iconify/svelte'
  import { meta, siteTitle, siteUrl, width } from '$lib/store'

  $meta = {
    description: 'Timo Anttila is a self-taught passionate developer, who loves solving problems and learning new ways to deliver solutions. Full Stack Web Developer and entrepreneur.',
    title: siteTitle,
    metaTitle: `${siteTitle} | Change starts with a dream`,
    canonical: siteUrl,
  }
</script>

<svelte:head>
  <link href="https://github.com/timoanttila/timoanttila/commits/master.atom" rel="me" title="Newest commits to the project" type="application/atom+xml" />
  <link href="https://tuspe.com/" rel="me" title="My company Tuspe Design Oy" type="text/html" />
</svelte:head>

<div id="front" class="h-screen lg:gap-10 lg:grid lg:grid-cols-5 lg:items-center mx-auto overflow-y-auto px-6 py-12">
  <div class="lg:col-span-2 overflow-hidden z-20">
    {#if $width}
      {#if $width >= 1024}
        <img src="/images/timoanttila-homabay-23-672.webp" height="972" width="672" alt="Web developer Timo Anttila" class="block h-[972px] max-h-[90vh] max-w-full object-cover object-top rounded-2xl w-[672px]" decoding="async" />
      {:else}
        <img src="/images/timoanttila-homabay-23-250.webp" height="250" width="250" alt="Web developer Timo Anttila" class="block bg-sidebar h-auto max-w-full mx-auto p-2 rounded-full" decoding="async" />
      {/if}
    {/if}
  </div>

  <div class="lg:col-span-3 lg:py-0 py-10">
    <div class="max-w-screen-sm mx-auto">
      <h1 class="front-title m-0 text-title">I'm Timo Anttila.</h1>
      <h2 class="front-title mb-6 mt-0">Web Developer</h2>

      <div class="content leading-normal text-xl">
        <p>Full-stack web developer who is passionate about designing and developing intuitive user experiences that enhance people's lives. I find joy in crafting digital wonders from the depths of my imagination, relishing the art of problem-solving, and ever-in pursuit of ingenious routes to deliver solutions.</p>
        <p>I strive to better myself each day, aspiring to be a worthy husband to my wonderful wife and exploring ways to employ AIs to serve my needs.</p>
        <p>Life becomes more meaningful when you realizes that you will never get the same moment twice.</p>
        <div class="mt-10">
          <a href="/about" class="btn-icon-link" title="What is happening in my life right now?">
            <div class="content">
              <span>About me</span>
              <Icon icon="mdi:arrow-right-thick" />
            </div>
          </a>

          <a href="/timoanttila-cv.pdf" class="btn-icon-link" title="CV of Full-Stack Web Developer Timo Anttila">
            <div class="content">
              <span>Download CV</span>
              <Icon icon="mdi:pencil-ruler" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  {#if $width && $width >= 1024}
    <div id="photo-bg" class="fixed h-full left-0 top-0 w-[30vw] z-10"></div>
  {/if}
</div>

<style scoped>
  h1 {
    font-size: clamp(2.8rem, 3.2em, 6vw);
  }

  h2 {
    font-size: clamp(1.8em, 2.8em, 6vw);
  }
</style>
