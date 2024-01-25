import adapter from '@sveltejs/adapter-cloudflare'
import {mdsvex} from 'mdsvex'
const vitePreprocess = import('@sveltejs/vite-plugin-svelte').then(m => m.vitePreprocess())

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md']
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex(mdsvexOptions),
    {
      script: async options => (await vitePreprocess).script(options),
      style: async options => (await vitePreprocess).style(options)
    }
  ],
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    })
  }
}

export default config
