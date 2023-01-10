import React from 'react'
import { Link } from 'gatsby'



const Aside = ({data, match}) => {
    const list = data.map(post => {
        if(post.album === match){
            if(post.description === 'Lyrics'){
                const title = post.title || post.slug
                // if feat in frontmatter is set to true we can asign speific css
                const pop = post.feat ? 'featured': '';
                return (
                    <li key={post.slug}>
                        <article
                            className="post-list-item"
                            itemScope
                            itemType="http://schema.org/Article"
                        >
                            <header>
                                <p className={pop}>
                                    <Link to={post.slug} itemProp="url">     <span itemProp="headline">{post.track}. {title}</span>
                                    </Link>
                                </p>
                            </header>
                        </article>

                    </li>
                )
            }
        }
    })
    return (
        <>
        {list}
        </>
    )
}


export default Aside;