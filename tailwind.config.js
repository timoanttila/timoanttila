/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  corePlugins: {
    color: false,
    fontFamily: false,
    preflight: false
  },
  theme: {
    extend: {
      screens: {
        xs: '414px'
      }
    }
  }
}
