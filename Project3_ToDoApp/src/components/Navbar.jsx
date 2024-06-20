import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-around bg-gray-800 text-cyan-50 p-5'>
        <div className='font-bold'>MyToDo App</div>
        <div className="flex">
        <ul className='flex gap-3'>
            <li className='hover:font-bold hover:cursor-pointer'>Home</li>
            <li className='hover:font-bold hover:cursor-pointer'>Sign In</li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar
