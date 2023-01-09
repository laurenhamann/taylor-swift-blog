import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
const cats = ['Glitter Gel Pen', 'Sharpie', 'Fountain Pen', 'Quill Pen']


const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location
}) => {
  let subtitle;
  const siteTitle = site.siteMetadata?.title || `Title`
  const [locate, useLocate] = React.useState(location.state.query);
  console.log(typeof locate)
  let text = post.html;

    if( locate  && locate != ' '){
      console.log(locate)
      const reg = new RegExp(locate, 'g')
      const inner = post.html;
      inner.replace(reg, (match) => `<mark>${match}</mark>`);
      const highlight = `<mark>${locate}</mark>`
      text = inner.replaceAll(reg, `${highlight}`)
      console.log(reg);
    }

  let songwriter;

  let className;

  const name = cats.forEach((c) => {
    if(c === post.frontmatter.cat) {
      const reg = /([A-z])+/g;

      const match = post.frontmatter.cat.match(reg);
      console.log(match[0])
      className = match[0];
    }
  })


  if(Array.isArray(post.frontmatter.songwriters)) {
    const s = post.frontmatter.songwriters;
    const length = s.length;
    if(length == 2){
      songwriter = `${s[0]} & ${s[1]}`;
    }else if(length == 3){
      songwriter = `${s[0]}, ${s[1]} & ${s[2]}`;
    }else if(length == 4){
      songwriter = `${s[0]}, ${s[1]}, ${s[2]} & ${s[3]}`;
    }
  }else {
    songwriter = post.frontmatter.songwriter;
  }


  if(post.frontmatter.description === 'Lyrics'){
    subtitle = <header>
                <h1 itemProp="headline" className={className}>{post.frontmatter.title}</h1>
                <div className="post-subs">
                  <p className="al">Album: {post.frontmatter.album}</p>
                  <p className="track">Track: {post.frontmatter.track}</p>
                  <p className="songwriter">Writers: {songwriter}</p>
                </div>
              </header>
  }else{
    let image = getImage(post.frontmatter.image);
    console.log(image);
    subtitle = <header>
                  <GatsbyImage image={image} 
                    alt=""
                    className="album-art" />
                <h1 itemProp="headline" className={className}>{post.frontmatter.title}</h1>
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
          dangerouslySetInnerHTML={{ __html: text }}
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
              gatsbyImageData(blurredOptions: {width: 1200}, height: 750, width: 1200)
          }
      }
      image {
        childImageSharp {
            gatsbyImageData(blurredOptions: {width: 400}, height: 450, width: 300)
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
