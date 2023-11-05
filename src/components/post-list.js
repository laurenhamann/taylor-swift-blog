import React from "react"
import { Link } from "gatsby"

const PostList = ({ data, match }) => {
  const list = data.map(post => {
    const title = post.title || post.fields.slug
    if (
      post.album === match &&
      post.description !== "Lyrics" &&
      post.type === "post"
    ) {
      return (
        <li key={post.slug} className="blog-album">
          <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
            data-test="post-link"
          >
            <header>
              <h2>
                <Link to={post.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h2>
              <small>{post.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.description || post.excerpt,
                }}
                itemProp="description"
              />
            </section>
          </article>
        </li>
      )
    }
  })
  return <>{list}</>
}

export default PostList
