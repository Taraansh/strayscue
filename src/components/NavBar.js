import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'
function NavBar() {
  return (
   
    <nav>
      <ul>
        <li className='item'>
            <div className="links">
            <Link style={{outline: "none",border: "none",color:"#1a202c",fontSize: "14px",boxSizing: "border-box",textDecoration: "none"}} to='/Dashboard' className='logo'>
                <img src='' alt="" />
                <span className='nav-items'>Strayscue</span>
            </Link>
            </div>
        </li>
        <li className='item'>
            <div className="links">
            <div style={{outline: "none",border: "none",color:"#1a202c",fontSize: "14px",boxSizing: "border-box",textDecoration: "none"}}>
                <img src='' alt="" />
                <span className='nav-items h3'>hello</span>
            </div>
            </div>
        </li>
        <li className='item'>
            <div className="links">
            <Link style={{outline: "none",border: "none",color:"#1a202c",fontSize: "14px",boxSizing: "border-box",textDecoration: "none"}} to='/Dashboard'>
                <i className='fas fa-home'></i>
                <span className='nav-items'>Dashboard</span>
            </Link>
            </div>
        </li>
        <li className='item'>
            <div className="links">
            <Link style={{outline: "none",border: "none",color:"#1a202c",fontSize: "14px",boxSizing: "border-box",textDecoration: "none"}} to='/'>
        <i className='fas fa-solid fa-user-shield'></i>
                <span className='nav-items'>User Management</span>
            </Link>
            </div>
        </li>
        <li className='item'>
            <div className="links">
            <Link style={{outline: "none",border: "none",color:"#1a202c",fontSize: "14px",boxSizing: "border-box",textDecoration: "none"}} to='/'>
        <i className='fas fa-solid fa-user-shield'></i>
                <span className='nav-items'>NGO Management</span></Link>
            </div>
        </li>
        <li className='item'>
            <div className="links">
            <Link style={{outline: "none",border: "none",color:"#1a202c",fontSize: "14px",boxSizing: "border-box",textDecoration: "none"}} to='/'>
        <i className='fas fa-solid fa-user-shield'></i>
                <span className='nav-items'>Reporter Management</span></Link>
            </div>
        </li>
        <li className='item'>
            <div className="links">
            <Link style={{outline: "none",border: "none",color:"#1a202c",fontSize: "14px",boxSizing: "border-box",textDecoration: "none"}} to='/'>
        <i className='fas fa-solid fa-user-shield'></i>
                <span className='nav-items'>Vet Management</span></Link>
            </div>
        </li>
        <li className='item'>
            <div className="links">
            <Link style={{outline: "none",border: "none",color:"#1a202c",fontSize: "14px",boxSizing: "border-box",textDecoration: "none"}} to='/'>
        <i className='fas fa-solid fa-user-shield'></i>
                <span className='nav-items'>Sponser Management</span></Link>
            </div>
        </li>
        <li className='item'>
            <div className="links">
            <Link style={{outline: "none",border: "none",color:"#1a202c",fontSize: "14px",boxSizing: "border-box",textDecoration: "none"}} to='/'>
        <i className='fas fa-solid fa-user-shield'></i>
                <span className='nav-items'>Settings</span></Link>
            </div>
        </li>
      </ul>
    </nav>
  
    
  )
}

export default NavBar