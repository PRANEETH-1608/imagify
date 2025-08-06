import React,{useContext} from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {

   const {user,setShowLogin,logout,credit}=useContext(AppContext)

    const navigate=useNavigate()

  return (
    <div className='flex items-center justify-between py-4'>
        
        <Link to={'/'}>
        <img src={assets.logo} alt=""  className='w-28 sm:w-32 lg:w-40'/>
        </Link>


        <div>
            {
                user ?

                //If user was logged in this one we used
                
                
                /* This div is for button features includes both star image and text indicatiing no of credits left to use */                
                <div className='flex items-center gap-2 sm:gap-3 '>
                  <button onClick={()=>navigate('/buy')}  className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
                    <img className='w-5 ' src={assets.credit_star} alt="" />
                    < p className='text-xs sm:text-sm font-medium text-gray-600 '>Credits left : {credit!==null ? credit:'...'} </p>
                  </button>

             {   /*this is for showing user name after login  */}
                  <p className='text-gray-600 max-sm:hidden pl-4'> Hi,{user.name}
                  </p>

                  <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />

                    <div onClick={logout} className='absolute top-full right-0 bg-white border rounded-md shadow-md p-2 hidden group-hover:block z-10 '>
                      <ul  className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                          <li  className='cursor-pointer hover:text-red-500'>Logout</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                :
                 //If user was logged out this is the one we used
                
                <div className='flex items-center gap-2 sm:gap-5'>
                     
                    <p onClick={()=>navigate('/buy')}  className='cursor-pointer'>Pricing</p>
                    <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
                </div>
            }
   
        </div>
      
    </div>
  )
}

export default Navbar
