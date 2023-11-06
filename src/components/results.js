import React from "react"
import { Link } from "gatsby"

const Results = ({ slug, title, q, matches }) => {
  return (
    <Link to={slug} state={{ query: q, matches: matches }} data-test="result">
      <h4 className="result">{title}</h4>
    </Link>
  )
}

export default Results
