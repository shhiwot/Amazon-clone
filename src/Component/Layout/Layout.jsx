import React from 'react'
import Header1 from '../Header/Header1'
import Landing from '../../Page/Landing/Landing'

const Layout = ({children}) => {
  return (
    <div>
     <Header1/> 
     {children}
   {/* <Landing /> */}
    </div>
  )
} 

export default Layout
