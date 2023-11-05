import * as React from "react"
import useBlogs from "../hooks/use-blogs"
import { Link, graphql } from "gatsby"

import useMetadata from "../hooks/use-metadata"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Aside from "../components/aside"
import PostList from "../components/post-list"
import Hero from "../components/hero"

const AlbumPosts = ({ location, pageContext, data }) => {
  console.log(pageContext.id)
  const site = useMetadata()
  const siteTitle = site.site.siteMetadata.title
  const posts = useBlogs()

  console.log(
    data.markdownRemark.fields.slug,
    data.markdownRemark.frontmatter.title
  )

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }
  const image = data.markdownRemark.frontmatter.hero
  return (
    <Layout location={location} title={siteTitle}>
      <Hero image={image} />
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <section className="album-section">
        <ol style={{ listStyle: `none` }}>
          <PostList
            match={data.markdownRemark.frontmatter.album}
            data={posts}
          />
        </ol>
        <aside className="aside-songs">
          <h2>Song List</h2>
          <Aside match={data.markdownRemark.frontmatter.album} data={posts} />
        </aside>
      </section>
      <Bio />
    </Layout>
  )
}
export default AlbumPosts

export const query = graphql`
  query UseId($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        date
        description
        type
        album
        category
        hero {
          childImageSharp {
            fluid(maxWidth: 2000, pngQuality: 100) {
              base64
              tracedSVG
              srcWebp
              srcSetWebp
              originalImg
              originalName
            }
            gatsbyImageData
          }
        }
        image {
          childImageSharp {
            gatsbyImageData(
              blurredOptions: { width: 150 }
              height: 250
              width: 200
              formats: PNG
            )
          }
        }
      }
      fields {
        slug
      }
    }
  }
`
