import React, { useState, useRef } from "react"
import { Link } from "gatsby"
import useBlogs from "../hooks/use-blogs"
import Results from "../components/results"
import Layout from "../components/layout"
import useMetadata from "../hooks/use-metadata"

const Search = ({ location }) => {
  const inputRef = useRef(null)
  const [query, setQuery] = useState("")
  const site = useMetadata()
  const title = site.site.siteMetadata.title
  const blogs = useBlogs()
  const filterPosts = event => {
    event.preventDefault()
    setQuery(inputRef.current.value)
  }

  const resetPosts = event => {
    if (event.target.value === "") {
      setQuery("")
    }
  }
  let slugs = []
  const matches = blogs.map((post, i) => {
    if (post.description === "Lyrics") {
      const lower = query.toLowerCase()
      const lowerContent = post.content.toLowerCase()
      const match = lowerContent.includes(lower)
      const key = `${post.title}-${i}`
      if (match) {
        slugs.push(post)
      }
      console.log(slugs)
      if (match) {
        return (
          <Results
            slug={post.slug}
            title={post.title}
            q={lower}
            key={key}
            matches={slugs}
          />
        )
      }
    }
  })

  const filteredHeader = () => {
    if (query === "") {
      return
    } else {
      return `filter: ${query}`
    }
  }
  return (
    <Layout location={location} title={title}>
      <form
        name="search"
        rel="search"
        id="searchForm"
        className="search"
        onSubmit={filterPosts}
      >
        <input
          className="searchInput"
          ref={inputRef}
          type="search"
          aria-label="Search"
          placeholder="Filter blog posts by title or tag"
          onChange={e => resetPosts(e)}
        ></input>
        <button value="none" onClick={e => filterPosts(e)} type="submit">
          Search
        </button>
      </form>
      <div className="result-div">
        <h1> Results </h1>
        <h2>{filteredHeader()}</h2>
        {matches}
      </div>
    </Layout>
  )
}

export default Search
