import React, { useEffect, useState } from 'react'
import { Blurhash } from 'react-blurhash'

const ImageComponent = ({ style, src, desc, blurHash, width, height }) => {
    const [imageLoaded, setImageLoaded] = useState(false)


    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoaded(true)
        }
        img.src = src
    }, [src])

    return (
        <>
            {!imageLoaded && (
                <Blurhash
                hash={blurHash}
                // width={width ? width : 200}
                // height={height ? height : 200}
                resolutionX={32}
                resolutionY={32}
                punch={1} />
            )}
            {imageLoaded && (
                <img className={style} src={src} alt={desc}></img>
                )}
        </>
    )
}


export default ImageComponent