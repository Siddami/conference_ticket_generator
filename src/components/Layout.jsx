import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';


export const Layout = ({children}) => {
  return (
    <div className='Layout'>
        <Toaster position='top-right' />
        <Navbar />
        {children}
    </div>
  )
}
