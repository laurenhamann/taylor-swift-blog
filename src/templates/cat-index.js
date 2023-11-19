import * as React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import useBlogs from "../hooks/use-blogs"
import useMetadata from "../hooks/use-metadata"
import Hero from "../components/hero"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

const CatIndex = ({ location, pageContext, data }) => {
  console.log(pageContext.id)
  const posts = useBlogs()
  const site = useMetadata()
  const siteTitle = site.site.siteMetadata.title
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          I am writing at this very moment. Refresh constantly and eventually
          something will appear.
        </p>
      </Layout>
    )
  } else {
    let arrayOne = []

    posts.map(a => {
      if (
        a.type === "overview" &&
        a.category === data.markdownRemark.frontmatter.category &&
        a.artist === data.markdownRemark.frontmatter.title
      ) {
        const album = a.album
        let image = getImage(a.image)
        console.log(image)
        arrayOne.push({
          album: album,
          src: image,
          slug: a.slug,
        })
      }
    })
    const image = data.markdownRemark.frontmatter.hero
    console.log(image)
    // posts.map((a, i) => {
    //   // console.log(
    //   //   "album: ",
    //   //   a.album,
    //   //   "title: ",
    //   //   "title",
    //   //   "description: ",
    //   //   a.description
    //   // )
    //   if (a.description === "home") {
    //     image = a.hero
    //   }
    //   return a
    // })
    return (
      <Layout location={location} title={siteTitle}>
        <Breadcrumb
          location={location}
          crumbLabel={data.markdownRemark.frontmatter.title}
        />
        <Hero image={image} />
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <ol className="main-list" style={{ listStyle: `none` }}>
          {arrayOne.map(post => {
            let values = Object.values(post)
            const title = values[0]
            const slug = post.slug
            console.log(slug)
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
                          className="album-cover"
                        />
                      </Link>
                      <h2 className="album-name">
                        <span itemProp="headline">{title}</span>
                      </h2>
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
}

export default CatIndex

export const Head = () => <Seo title="All posts" />
export const query = graphql`
  query UseId($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        date
        description
        type
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
    }
  }
`
