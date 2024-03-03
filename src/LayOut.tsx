import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import SinglePage from './components/SinglePage'
import { UseMainContext } from './context/Context'

export default function LayOut( ) {
  const {state} = UseMainContext()

  const {singleID} = state 
  return (
         <main >
          <Nav/>
         <Outlet/>
        { singleID && <SinglePage/>}
         </main>
  )
}
