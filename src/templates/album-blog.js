import * as React from "react"
import useBlogs from "../hooks/use-blogs"
import useMetadata from "../hooks/use-metadata"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Aside from "../components/aside"
import PostList from "../components/post-list"
import Hero from "../components/hero"

const AlbumPosts = ({ location }) => {
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

    if (posts.length === 0) {
        return (
            <Layout location={location} title={siteTitle}>
                <Bio />
                <p>
                    No blog posts found. Add markdown posts to "content/blog" (or the
                    directory you specified for the "gatsby-source-filesystem" plugin in
                    gatsby-config.js).
                </p>
            </Layout>
        )
    }
    let image;
    posts.map((a, i) => {
        if(a.album === title && a.description === 'My Ranking'){
            image = a.hero
        }
    })
    return (
        <Layout location={location} title={siteTitle}>
        <Hero 
            image={image}
        />
            <h1>{title}</h1>
                <section className="album-section">
                    <ol style={{ listStyle: `none` }}>
                        <PostList 
                            match={title}
                            data={posts}
                        />
                    </ol>
                    <aside className="aside-songs">
                        <h2>Song List</h2>
                        <Aside 
                            match={title}
                            data={posts}
                        />
                    </aside>
            </section>
            <Bio />
            </Layout>
            )
    }
export default AlbumPosts
