/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)
const albumView = path.resolve(`./src/templates/album-blog.js`)
const SearchPostTemplate = path.resolve("./src/templates/search-post.js")
const SongList = path.resolve("./src/templates/song-list.js")
const BlogIndex = path.resolve("./src/templates/index-hub.js")
const CatIndex = path.resolve("./src/templates/cat-index.js")
/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          frontmatter {
            album
            title
            category
            description
            type
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
      const album =
        post.frontmatter.album === null ? "none" : post.frontmatter.album
      const cat =
        post.frontmatter.category === null ? "none" : post.frontmatter.category
      console.log(cat)

      const type =
        post.frontmatter.type === null ? "none" : post.frontmatter.type

      const description = post.frontmatter.description === "home" ? true : false

      if (description) {
        console.log(description, post.fields.slug)
        createPage({
          path: `/${album}`,
          component: BlogIndex,
          context: {
            id: post.id,
          },
        })
      } else if (post.frontmatter.description === "category") {
        createPage({
          path: post.fields.slug,
          component: CatIndex,
          context: {
            id: post.id,
          },
        })
      } else if (type === "overview") {
        createPage({
          path: post.fields.slug,
          component: albumView,
          context: {
            id: post.id,
          },
        })
      } else {
        createPage({
          path: post.fields.slug,
          component: blogPost,
          context: {
            id: post.id,
            previousPostId,
            nextPostId,
          },
        })
      }

      createPage({
        path: `/results${post.fields.slug}`,
        component: SearchPostTemplate,
        context: {
          id: post.id,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
      album: String
      category: String
    }

    type Fields {
      slug: String
    }
  `)
}
