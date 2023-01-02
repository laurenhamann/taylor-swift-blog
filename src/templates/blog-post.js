import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  let subtitle;
  const siteTitle = site.siteMetadata?.title || `Title`


  let songwriter;

  if(Array.isArray(post.frontmatter.songwriters)) {
    const s = post.frontmatter.songwriters;
    const length = post.frontmatter.songwriters.length;
    console.log(length)
    if(length == 2){
      songwriter = `${post.frontmatter.songwriters[0]} & ${post.frontmatter.songwriters[1]}`;
    }else if(length == 3){
      songwriter = `${post.frontmatter.songwriters[0]}, ${post.frontmatter.songwriters[1]} & ${post.frontmatter.songwriters[2]}`;
    }else if(length == 4){
      songwriter = `${post.frontmatter.songwriters[0]}, ${post.frontmatter.songwriters[1]}, ${post.frontmatter.songwriters[2]} & ${post.frontmatter.songwriters[3]}`;
    }
  }else {
    songwriter = post.frontmatter.songwriter;
  }
  if(post.frontmatter.description === 'Lyrics'){
    subtitle = <header>
                <h1 itemProp="headline">{post.frontmatter.title}</h1>
                <div className="post-subs">
                  <p className="al">Album: {post.frontmatter.album}</p>
                  <p className="track">Track: {post.frontmatter.track}</p>
                  <p className="songwriter">Writers: {songwriter}</p>
                </div>
              </header>
  }else{
    subtitle = <header>
                <h1 itemProp="headline">{post.frontmatter.title}</h1>
                <p>{post.frontmatter.date}</p>
              </header>
  }

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {subtitle}
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

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
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        album
        songwriter
        songwriters
        track
        hero {
          childImageSharp {
              gatsbyImageData(blurredOptions: {width: 1200}, height: 750, width: 1200)
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
