export async function load() {
  try {
    const post = await import('./about.md')

    return {
      ...post.metadata,
      content: post.default
    }
  } catch (error) {
    console.error('An error occurred while loading the post:', error)
    throw error
  }
}
