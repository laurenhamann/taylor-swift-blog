import React from "react";
import { Link } from "gatsby";


const Results = ({slug, title, q}) => {
    const s = `/results${slug}`;
    return (
        <Link to={s} state={{ query: q }} data-test="result">
            <h4>{title}</h4>
        </Link>
    )
}


export default Results;