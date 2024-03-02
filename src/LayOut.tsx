import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

export default function LayOut( ) {
  return (
         <main >
        <Nav/>
         <Outlet/>
         </main>
  )
}
