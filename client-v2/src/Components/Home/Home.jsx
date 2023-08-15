import React, { useEffect } from 'react'
import './Home.css'
import Image from '../../Assets/image1.jpg'

import {AiOutlineSwapRight} from 'react-icons/ai'



const Home = () => {

  return (
  <div className='Home'>
      
        <div className='imgBg'>
          <img src={Image} ></img>
          </div>

          <div className='sectionText'>
            <h1 >Trust Our Experience</h1>
          
            <button className="btn flex" >
              GET STARTED <AiOutlineSwapRight className="icon"/>
            </button>

          </div>


        </div>
  );
}

export default Home