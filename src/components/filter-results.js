import React from "react"
import { Link } from "gatsby"
import useBlogs from "../hooks/use-blogs"

export const FilterResults = ({ searchValue, title }) => {
  console.log(searchValue, title)
  const posts = useBlogs()
  const map = posts.map(post => {
    if (Array.isArray(post[title])) {
      const tagMap = post[title].map((tag, index) => {
        if (tag === searchValue) {
          console.log("in", post.title)
          return (
            <Link to={post.slug} key={index}>
              <p>{post.title}</p>
            </Link>
          )
        }
      })
      return tagMap
    } else {
      if (post[title] === searchValue) {
        return (
          <Link to={post.slug}>
            <p>{post.title}</p>
          </Link>
        )
      }
    }
  })
  return map
}
