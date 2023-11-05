import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Results from "../components/results"
const cats = ["Glitter Gel Pen", "Sharpie", "Fountain Pen", "Quill Pen"]

const SearchPostTemplate = ({
  data: { site, markdownRemark: post },
  location,
}) => {
  let subtitle
  const siteTitle = site.siteMetadata?.title || `Title`
  const check = typeof location.state === "object"
  console.log(check)
  const q = check
    ? typeof location.state.query === "string"
      ? location.state.query
      : " "
    : " "
  console.log(q)

  // figure out new way to get input word from search to input here
  const [locate, setLocate] = React.useState(q)
  let text = post.html
  if (locate && locate !== " ") {
    console.log(locate)
    const reg = new RegExp(locate, "g")
    const inner = post.html
    inner.replace(reg, match => `<mark>${match}</mark>`)
    const highlight = `<mark>${locate}</mark>`
    text = inner.replaceAll(reg, `${highlight}`)
    console.log(reg)
  } else {
    console.log(locate)
  }

  let songwriter
  let className

  const name = cats.forEach(c => {
    if (c === post.frontmatter.cat) {
      const reg = /([A-z])+/g

      const match = post.frontmatter.cat.match(reg)
      console.log(match[0])
      className = match[0]
    }
  })

  if (Array.isArray(post.frontmatter.songwriters)) {
    const s = post.frontmatter.songwriters
    const length = s.length
    if (length === 2) {
      songwriter = `${s[0]} & ${s[1]}`
    } else if (length === 3) {
      songwriter = `${s[0]}, ${s[1]} & ${s[2]}`
    } else if (length === 4) {
      songwriter = `${s[0]}, ${s[1]}, ${s[2]} & ${s[3]}`
    }
  } else {
    songwriter = post.frontmatter.songwriter
  }

  if (post.frontmatter.description === "Lyrics") {
    subtitle = (
      <header>
        <h1 itemProp="headline" className={className}>
          {post.frontmatter.title}
        </h1>
        <div className="post-subs">
          <p className="al">Album: {post.frontmatter.album}</p>
          <p className="track">Track: {post.frontmatter.track}</p>
          <p className="songwriter">Writers: {songwriter}</p>
        </div>
      </header>
    )
  } else {
    let image = getImage(post.frontmatter.image)
    console.log(image)
    subtitle = (
      <header>
        <GatsbyImage image={image} alt="" className="album-art" />
        <h1 itemProp="headline" className={className}>
          {post.frontmatter.title}
        </h1>
        <p>{post.frontmatter.date}</p>
      </header>
    )
  }

  const matchedResult = location.state.matches

  const result = matchedResult.map((m, i) => {
    console.log(Object.values(m))
    Object.values(m)
    return (
      <Results
        slug={m.slug}
        title={m.title}
        q={q}
        key={m.slug}
        matches={matchedResult}
      />
    )
  })

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
        {matchedResult.map((m, i) => {
          console.log(m)
          return (
            <Results
              slug={m.slug}
              title={m.title}
              q={q}
              key={m.slug}
              matches={matchedResult}
            />
          )
        })}
        <footer>
          <Bio />
        </footer>
      </article>
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

export default SearchPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
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
  }
`
