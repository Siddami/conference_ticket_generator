import React from 'react'
import Navbar from './Navbar'

export const Layout = ({children}) => {
  return (
    <div className='Layout'>
        <Navbar />
        {children}
    </div>
  )
}
