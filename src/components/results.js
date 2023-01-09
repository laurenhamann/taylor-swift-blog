import React from "react";
import { Link } from "gatsby";


const Results = ({slug, title, q}) => {
    return (
        <Link to={slug} state={{ query: q }}>
            <h4>{title}</h4>
        </Link>
    )
}


export default Results;