import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Hero = ({ image }) => {
    const imageHero = getImage(image);
    return (
        <div className='hero'>
                <GatsbyImage image={imageHero} 
                        alt=""
                        className="hero" />
        </div>
    )
}

export default Hero;
