import React from 'react'
import axios from 'axios'
const Home = async () => {
    const {data} = await axios.get('https://api.escuelajs.co/api/v1/products')

  return (
    <div>
      {data.map((item,id)=>{
        return (
          <div key={id} className='bg-pink-200 m-4 shadow-lg p-4 rounded w-[20%]' >
            {item}
         
            </div>
        )
      })}
    </div>
  )
}

export default Home