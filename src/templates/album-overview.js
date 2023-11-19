import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import useBlogs from "../hooks/use-blogs"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
const AlbumOverview = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  let songPosts = []
  const posts = useBlogs()
  posts.map((a, i) => {
    if (a.album === post.frontmatter.album && a.description === "Lyrics") {
      songPosts.push(a)
    }
    return a
  })
  const rank = songPosts.sort((a, b) => a.rank - b.rank)
  const siteTitle = site.siteMetadata?.title || `Title`
  let image = getImage(post.frontmatter.image)

  const subtitle = (
    <header id="album-home">
      <GatsbyImage image={image} alt="" className="album-art" />
      <h1 itemProp="headline" className="title">
        {post.frontmatter.title}
      </h1>
      <p>{post.frontmatter.date}</p>
    </header>
  )
  let favorite = []
  const favoriteLine = songPosts.map(p => {
    let line
    let title
    let slug
    const html = p.html.children.map(child => {
      if (child.children) {
        child.children.map(young => {
          if (young.properties) {
            if (young.properties.id == "favorite-line") {
              console.log(young.children[0].value)
              line = young.children[0].value
              title = p.title
              slug = p.slug
              const obj = {
                value: line,
                title: title,
                slug: slug,
              }
              favorite.push(obj)
            }
          }
        })
      }
    })
  })
  console.log(favorite)
  //   const rank = songPosts.sort((a, b) => a.rank - b.rank)
  return (
    <Layout location={location} title={siteTitle}>
      <Breadcrumb location={location} crumbLabel={post.frontmatter.title} />
      {subtitle}
      <body id="album-overview">
        <section className="TOC">
          <h2>Table of Contents</h2>
          <ul>
            <li>
              <a href="#song-list">Song List</a>
            </li>
            <li>
              <a href="#my-rank">My Ranking</a>
            </li>
            <li>
              <a href="#favorite-lines">Favorite Lines</a>
            </li>
          </ul>
        </section>
        <section id="song-list">
          <h2> Song List </h2>
          <ol data-test="song-list">
            {songPosts.map((s, i) => {
              const title = s.title
              const key = i
              const slug = s.slug
              return (
                <Link to={slug}>
                  <li key={key}>{title}</li>
                </Link>
              )
            })}
          </ol>
        </section>
        <section id="my-rank">
          <h2> My Rank</h2>
          <ol data-test="my-rank">
            {rank.map((s, i) => {
              if (s.rank) {
                const title = s.title
                const key = i
                const slug = s.slug
                return (
                  <Link to={slug}>
                    <li key={key}>{title}</li>
                  </Link>
                )
              }
            })}
          </ol>
        </section>
        <section id="favorite-lines">
          <h2> Favorite Line</h2>
          <ul data-test="favorite-lines">
            {favorite.map((s, i) => {
              const title = s.title
              const key = i
              const slug = s.slug
              const value = s.value
              return (
                <Link to={slug} className="fave-line-link">
                  <li key={key} className="fave-line">
                    {value}
                    <br />
                    <span>{title}</span>
                  </li>
                </Link>
              )
            })}
          </ul>
        </section>
      </body>
    </Layout>
  )
}
export default AlbumOverview

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}
export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        album
        songwriter
        songwriters
        track
        cat
        hero {
          childImageSharp {
            gatsbyImageData(
              blurredOptions: { width: 1200 }
              height: 750
              width: 1200
            )
          }
        }
        image {
          childImageSharp {
            gatsbyImageData(
              blurredOptions: { width: 400 }
              height: 450
              width: 300
            )
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
