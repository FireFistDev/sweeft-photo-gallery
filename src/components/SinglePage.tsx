import React, { useState, useRef  } from 'react'
import { UseMainContext } from '../context/Context'
import useOutClick from '../hooks/useOutClick'
type SinglePageProps = {
     full:string 
     likes:number
}
export default function SinglePage() {
  const {dispatch, state} = UseMainContext()
 const {singlePhotoData} = state
 const {views,likes,downloads,urls } = singlePhotoData
 const imgRef:any  = useRef(null)
 const removeId = () =>{ 
  dispatch({ type: 'SET_SINGLE_ID', payload: '' })
 }

  useOutClick(imgRef, removeId)
  if(urls && urls.full){


  return (
    <div className='singlePage'>
    <div ref={imgRef} className='imageCard'>
      <img src={urls.full} alt='Full size' />
      <div className='info'>
        <div>Views: {views}</div>
        <div>Likes: {likes}</div>
        <div>Downloads: {downloads}</div>
      
      </div>
     </div>
    {/* <button onClick={() => dispatch({ type: 'SET_SINGLE_ID', payload: '' })}>CANCEL</button> */}
  </div>
  )  }else{
     return  <div className='singlePage'>
      loading
    </div>
  }
}
