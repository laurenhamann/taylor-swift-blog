import * as React from "react"
import useBlogs from "../hooks/use-blogs"
import useMetadata from "../hooks/use-metadata"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Aside from "../components/aside"
import PostList from "../components/post-list"
import Hero from "../components/hero"
import {Link} from 'gatsby'

const SongList = ({ location }) => {
    const site = useMetadata();
    const siteTitle = site.site.siteMetadata.title;
    const posts = useBlogs();
    const path = location.pathname;
    const regex = /([A-z]|[1989])\w+/;
    const match = path.match(regex);
    console.log(match)
    let title;
    const twoWords= ['Taylor Swift', 'Speak Now'];
    if(twoWords[0].includes(match[0])){
        title = twoWords[0]
    }else if(twoWords[1].includes(match[0])){
        title = twoWords[1]
    }else{
        title = match[0]
    }
    let image;
    let songPosts = [];
    posts.map((a, i) => {
        if(a.album === title && a.description === 'My Ranking'){
            image = a.hero
        }else if(a.album === title && a.description === 'Lyrics') {
            songPosts.push(a);
        }
        return a;
    })
    return (
        <Layout location={location} title={siteTitle}>
        <Hero 
            image={image}
        />
            <h1>{title}</h1>
                <ol data-test="song-list">
                    {songPosts.map((s, i) => {
                        const title = s.title;
                        const key = i;
                        const slug = s.slug;
                        return (
                            <Link to={slug}>
                                <li key={key}>
                                    {title}
                                </li>
                            </Link>
                        )
                    })}
                </ol>
            <Bio />
            </Layout>
    )
}
export default SongList
