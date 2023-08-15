
import React, {useState} from 'react'
import './Navbar.css'


//import icons
import {AiFillCloseCircle} from 'react-icons/ai'
import {PiDotsNineBold} from 'react-icons/pi'
import {FaPrescription} from 'react-icons/fa'

const Navbar = () => {

  const [navBar, setNavBar] = useState('menu');

  const showNavBar = () => {
    setNavBar("menu showNavBar");
  }
  const removeNavBar = () => {
    setNavBar("menu");
  }
  return <div className='navBar'>
        <div className='container flexSB'>
          <div className='logo'>
          <FaPrescription className='icon' />
          <span>Detection</span>
          </div>
         

        <div className={navBar}>
          <ul>
          
            <li className='navList'>
              Home
            </li>
            <li className='navList'>
             Medicine
            </li>
            <li className='navList'>
             Contact
            </li>
          </ul>

         
        <AiFillCloseCircle className='icon closeIcon' onClick={removeNavBar} />
      
        <PiDotsNineBold className='icon menuIcon' onClick= {showNavBar}/>
        </div>
      </div>
      </div> 
  
}

export default Navbar