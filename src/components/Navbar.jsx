import React from 'react'

export default function Navbar() {
  return (
    <div className='bg-purple-500 flex justify-between m-4 px-2 w-screen'>
        <h3 className='text-white m-4'>
            TODO APP</h3>
        <ul className='flex text-white gap-3 m-4 px-2 md:justify-between justify-around items-center'>
            <li className='hover:font-bold transition-all duration-100'>
                HOME
            </li>
            <li className='hover:font-bold transition-all duration-100'>
                SERVICES
            </li>
            <li className='hover:font-bold transition-all duration-100'>
                CONTACT US
            </li>
        </ul>
    </div>
  )
}
