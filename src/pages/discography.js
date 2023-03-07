import React from "react"
import useBlogs from "../hooks/use-blogs"
import useMetadata from "../hooks/use-metadata"
import Layout from "../components/layout"

const Discography = ({ location }) => {
  const blogs = useBlogs()
  const site = useMetadata()
  const title = site.site.siteMetadata.title
  let count = 1
  let titles = []
  let discs = []
  const map = blogs.map((s, i) => {
    if (s.description === "My Ranking") {
      const title = s.album
      titles.push(title)
    }
  })

  function songs(index) {
    let album = []
    blogs.map((s, i) => {
      if (s.description === "Lyrics") {
        if (s.album === titles[index]) {
          album.push(s.title)
        }
      }
    })
    discs.push(album)
  }
  console.log(discs)
  songs(0)
  songs(1)
  songs(2)
  songs(3)
  songs(4)
  songs(5)
  songs(6)
  songs(7)
  songs(8)
  songs(9)
  songs(10)
  songs(11)

  const display = discs.map((s, i) => {
    const song = discs[i].map((t, index) => {
      return <td>{t}</td>
    })
    return (
      <tbody>
        <tr>
          <th scope="row">{titles[i]}</th>
          {song}
        </tr>
      </tbody>
    )
  })

  function makeTable(titles, songs) {
    const headers = titles.map((t, i) => {
      return <th>{t}</th>
    })
    let longestLength = 0
    const rows = songs.map((s, i) => {
      // Get largest array length
      let currArrLength = s.length
      if (currArrLength > longestLength) {
        longestLength = currArrLength
      }
    })
    // Take longestLength and get th number and song associated
    const layers = [...Array(longestLength)].map((n, i) => {
      const s = songs.map((song, index) => {
        const currSong = song.at(i)
        if (currSong !== undefined) {
          return <td className="true-data">{currSong}</td>
        } else {
          return <td></td>
        }
      })
      return (
        <tr>
          <th>{i + 1}</th>
          {s}
        </tr>
      )
    })
    return (
      <thead>
        <td></td>
        {headers}
        {layers}
      </thead>
    )
  }
  const table = makeTable(titles, discs)
  return (
    <Layout location={location} title={title}>
      <table>
        <caption> Discography</caption>
        <tbody>
          {table}
          {/* {display} */}
        </tbody>
      </table>
    </Layout>
  )
}

export default Discography
