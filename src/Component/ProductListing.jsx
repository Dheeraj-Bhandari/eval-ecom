import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";
import listingCss from './listingCss.css'

const ProductListing = () => {
  const [data, setdata] = useState([]);

  const retData = async () => {
    const response = await api.get("/products");
    return response.data;
  };



  const delteProduct = async (id) =>{
    await api.delete(`/products/${id}`);
    const newdatalist = data.filter((data)=>{
        return data.id!==id;
    });

    setdata(newdatalist);
    
  }

  useEffect(() => {
    const getAlldata = async () => {
      const alldata = await retData();
      setdata(alldata);
    };
    getAlldata();
  }, []);



  return (
    <div>
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
