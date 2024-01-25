export async function load() {
  try {
    const post = await import('./websites.md')

    return {
      ...post.metadata,
      slug: 'websites',
      content: post.default
    }
  } catch (error) {
    console.error('An error occurred while loading the post:', error)
    throw error
  }
}
