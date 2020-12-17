import React from 'react'

export default function Images(props) {
  let image = props.image;
  return (
    <div key='image' className='fadein'>
      <img 
        src={image}
        alt='' 
      />
    </div>
  )
}