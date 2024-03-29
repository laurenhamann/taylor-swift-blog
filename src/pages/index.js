import * as React from "react"
import { Link } from "gatsby"
import "../sass/styles.scss"
import Bio from "../components/bio"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import useBlogs from "../hooks/use-blogs"
import useMetadata from "../hooks/use-metadata"

const BlogIndex = ({ location }) => {
  const posts = useBlogs()
  const site = useMetadata()
  const title = site.site.siteMetadata.title
  if (posts.length === 0) {
    return (
      <Layout location={location} title={title}>
        <Bio />
        <p>
          I am writing at this very moment. Refresh constantly and eventually
          something will appear.
        </p>
      </Layout>
    )
  }
  let arrayOne = []
  posts.map(a => {
    if (a.description === "home") {
      const album = a.album
      let image = getImage(a.image)
      arrayOne.push({
        album: album,
        src: image,
      })
    }
  })

  return (
    <Layout location={location} title={title}>
      <ol className="main-list" style={{ listStyle: `none` }}>
        {arrayOne.map(post => {
          let values = Object.values(post)
          const slug = `/${values[0]}/`
          return (
            <li key={values[0]}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <div className="album">
                    <Link to={slug} itemProp="url">
                      <GatsbyImage
                        image={values[1]}
                        alt=""
                        className="home-cover"
                      />
                    </Link>
                  </div>
                </header>
              </article>
            </li>
          )
        })}
      </ol>
      <Bio />
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />
