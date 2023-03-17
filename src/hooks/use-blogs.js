import { graphql, useStaticQuery } from "gatsby"

const useBlogs = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { frontmatter: { track: ASC } }) {
        nodes {
          excerpt
          id
          fields {
            slug
          }
          internal {
            content
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            album
            image {
              childImageSharp {
                gatsbyImageData(
                  blurredOptions: { width: 150 }
                  height: 200
                  width: 200
                )
              }
            }
            hero {
              childImageSharp {
                gatsbyImageData(
                  blurredOptions: { width: 1200 }
                  height: 750
                  width: 1200
                )
              }
            }
            track
            songwriters
            songwriter
            tags
            feat
          }
        }
      }
    }
  `)
  return data.allMarkdownRemark.nodes.map(post => ({
    excerpt: post.excerpt,
    slug: post.fields.slug,
    date: post.frontmatter.date,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    album: post.frontmatter.album,
    image: post.frontmatter.image,
    track: post.frontmatter.track,
    songwriters: post.frontmatter.songwriters,
    songwriter: post.frontmatter.songwriter,
    tags: post.frontmatter.tags,
    hero: post.frontmatter.hero,
    content: post.internal.content,
    feat: post.frontmatter.feat,
    id: post.id,
  }))
}

// go to graphiql and see how to query for awards
export default useBlogs
