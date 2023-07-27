import React from 'react'

export default function Footer() {
  return (
    <div className='footer'>
    <hr style={{marginTop:"5rem"}}/>
  <footer
   style={{textAlign:"center",
   alignItems:"center",
   paddingBottom:"0.5rem",
   display:"flex",
   fontSize:"0.8rem",
   justifyContent:"center"
  }}><span style={{ fontWeight:"bold",marginRight:"0.1rem"}}>copyright &copy; Sterilization 2022.</span> <span className='footer-text'> All rights reserved</span></footer>   
  </div>
  )
}
