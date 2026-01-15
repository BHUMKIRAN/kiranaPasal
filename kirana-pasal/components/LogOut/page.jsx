import React from 'react'
import { useRouter } from 'next/navigation'
const LogOut = () => {

  const router = useRouter();

  // function handleLogout  = ()=> {


  // }



  return (
    <div>
      <div onClick={()=> router.push('/')}>
        <button 
        type="button">
          LogOut
        </button>
      </div>
    </div>
  )
}

export default LogOut