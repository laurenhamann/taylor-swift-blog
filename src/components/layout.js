import * as React from "react"
import { Link } from "gatsby"
import Nav from "./nav"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header
  let bodyClass
  let headerClass
  if (isRootPath) {
    bodyClass = "home-wrapper global-wrapper"
    headerClass = "global-header"
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    bodyClass = "non-home-wrapper global-wrapper"
    headerClass = "non-home-header"
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className={bodyClass} data-is-root-path={isRootPath}>
      <header className={headerClass}>
        {header}
        <Nav />
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built by{" "}
        <a href="https://www.laurenhamanndev.com">Lauren</a>
      </footer>
    </div>
  )
}

export default Layout
