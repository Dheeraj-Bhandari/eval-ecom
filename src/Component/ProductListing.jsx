import React from 'react'
import { useState, useEffect } from 'react'


const ProductListing = () => {

    const [data, setdata] = useState([])

async function getdata(){
    const res =  await fetch('http://localhost:3000/products')
    const dataa = await res.json();
    setdata(dataa);
    console.log(data);
}
getdata()
  return (
    <div>

    {data.map((e)=>{
        return (
            <div>
                <div key={e.id}>
                    <p>{e.title}</p>
                    <img src={e.image}alt="" />
                    <p>Price {e.price}</p>
                    <p> Category {e.category}</p>
                    <p>Gender {e.gender}</p>
                </div>
            </div>
        )
    })}

    </div>
  )
}

export default ProductListing