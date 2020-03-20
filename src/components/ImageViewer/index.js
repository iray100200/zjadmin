import React, { useState } from 'react'
import ImageViewer from 'react-images-viewer'

export default (props) => {
  const { image, caption } = props
  const [isOpen, setOpenStatus] = useState(false)
  if (!image || image === 'noPic') {
    return null
  }
  return <div>
    <img src={image} style={{ cursor: 'pointer' }} width={150} onClick={() => setOpenStatus(true)} />
    <ImageViewer onClose={() => setOpenStatus(false)} isOpen={isOpen} currImg={0} imgs={[{
      src: image,
      srcSet: image,
      caption: caption,
      alt: caption
    }]} />
  </div>
}