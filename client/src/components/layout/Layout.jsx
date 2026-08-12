import React from 'react'
import Header from './header'
import Footer from './footer'
import  { Toaster } from 'react-hot-toast';

const Layout = (props) => {
  return (
    <div>
      <Header/>
      <main style={{minHeight:"70vh"}}>
      <Toaster/>
      {props.children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout;
