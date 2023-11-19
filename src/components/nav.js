import React from "react"
import { Link } from "gatsby"
import Search from "../pages/search"

const Nav = () => {
  return (
    <nav>
      <Link to="/search">Search</Link>
      <Link to="/filter-page">
        <small>Browse</small>
      </Link>
    </nav>
  )
}

export default Nav
