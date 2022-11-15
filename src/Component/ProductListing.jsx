import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";
import listingCss from './listingCss.css'

const ProductListing = () => {
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState("");
  const [sort, setsort] = useState("")

  const retData = async () => {
    const response = await api.get("/products?_page=1&_limit=5");
    return response.data;
  };



  const delteProduct = async (id) =>{
    await api.delete(`/products/${id}`);
    const newdatalist = data.filter((data)=>{
        return data.id!==id;
    });

    setdata(newdatalist);
    
  }


//   Sorting and filter

function handlefilter(e){
    setfilter(e)

    const filterdata = data.filter((e)=>{
        return e.gender===filter;

    })
    console.log(filterdata)
    // setdata(filterdata)

}

function handlesort(e){
    setsort(e)
}

//   Sorting and filter end



  useEffect(() => {
    const getAlldata = async () => {
      const alldata = await retData();
      setdata(alldata);
    };
    getAlldata();
  }, [data]);

console.log(sort)
console.log(filter)

  return (
    <div>
        <div className="btnpage">
            
        <select
        onChange={e=>handlefilter(e.target.value)}
        value={filter}
        >
            <option value="filter">Filter</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        <select
        onChange={e=>handlesort(e.target.value)}
        value={sort}
        >
            <option value="sort">Sort</option>
            <option value="low">Low To High</option>
            <option value="high">High To Low</option>
        </select>
        </div>
      {data.map((e) => {
        return (
         
            <div id="Productcard" key={e.id}>
              <p className="title">{e.title}</p>
              <img  className="img" src={e.image} alt="" />
              <p className="price">Price: {e.price}</p>
              <p className="category"> Category: {e.category}</p>
              <p className="gender">Gender :{e.gender}</p>
              <button className="delbtn" onClick={()=>delteProduct(e.id)} >Delete Product</button>
            </div>
          
        );
      })}
      <div className="btnpage">

      <button>Prev</button>
      <button>Next</button>
      </div>
    </div>
  );
};

export default ProductListing;
