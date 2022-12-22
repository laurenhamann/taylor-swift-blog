import { graphql, useStaticQuery } from 'gatsby';



const useMetadata = () => {
    const data = useStaticQuery(graphql`
    {
        site {
            siteMetadata {
            title
            }
        }  
    }
`)
    return (
        data
    )
    
}



// go to graphiql and see how to query for awards
export default useMetadata;