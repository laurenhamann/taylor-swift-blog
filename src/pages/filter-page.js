import React, { useState, useEffect } from "react"
import useBlogs from "../hooks/use-blogs"
import useMetadata from "../hooks/use-metadata"
import Layout from "../components/layout"
import { filter } from "../components/filter"
import { FilterResults } from "../components/filter-results"

const FilteredBy = ({ location }) => {
  const site = useMetadata()
  const title = site.site.siteMetadata.title
  const posts = useBlogs()
  const titles = ["songwriter", "songwriters", "cat", "featured"]
  const [filterBy, setFilterBy] = useState(titles[1])
  const [searchBy, setSearchBy] = useState()
  let filteredArray
  function setArray() {
    filteredArray = 0
    let filterArray = []
    const postLength = posts.length - 1
    posts.filter((post, index2) => {
      if (index2 < postLength) {
        if (post.description === "Lyrics") {
          const grab = post[filterBy]
          if (Array.isArray(grab)) {
            grab.map(each => {
              filterArray.push(each)
            })
          } else if (grab) {
            filterArray.push(grab)
          }
        }
      } else {
        filter(filterArray, function (finalArray) {
          filteredArray = finalArray
          console.log(finalArray)
        })
      }
    })
  }
  setArray()
  console.log(typeof searchBy)
  return (
    <Layout location={location} title={title}>
      <section className="filter-section">
        <div className="selection-buttons">
          <button
            onClick={() => {
              setFilterBy(titles[1])
            }}
            className={filterBy === "songwriters" ? "selected tab" : "tab"}
          >
            Songwriter
          </button>
          <button
            onClick={() => {
              setFilterBy(titles[2])
            }}
            className={filterBy === "cat" ? "selected tab" : "tab"}
          >
            Category
          </button>
          <button
            onClick={() => {
              setFilterBy(titles[3])
            }}
            className={filterBy === "featured" ? "selected tab" : "tab"}
          >
            Featured Artist
          </button>
        </div>
        <div className="flex-filtered">
          <div className="filter-choices">
            {filteredArray.map(li => (
              <button
                className="small"
                onClick={() => {
                  setSearchBy(li.name)
                }}
              >
                {li.name}-{li.count}
              </button>
            ))}
          </div>
          <div className="filter-results">
            {typeof searchBy === "string" ? (
              <FilterResults searchValue={searchBy} title={filterBy} />
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default FilteredBy
