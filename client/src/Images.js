import React from 'react'

export default function Images(props) {
  let image = props.image;
  console.log(image);
  return (
    <div key='image' className='fadein'>
      <img
        src={image.base64}
        alt=''
        width={image.width}
        height={image.height}
      />
    </div>
  )
}