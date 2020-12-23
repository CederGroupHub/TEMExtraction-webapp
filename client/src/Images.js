import React from 'react'
import './App.css';

export default function Images(props) {
  let image = props.image;
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