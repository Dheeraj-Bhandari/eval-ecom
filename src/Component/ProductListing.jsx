import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";

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
          <div>
            <div key={e.id}>
              <p>{e.title}</p>
              <img src={e.image} alt="" />
              <p>Price {e.price}</p>
              <p> Category {e.category}</p>
              <p>Gender {e.gender}</p>
              <button onClick={()=>delteProduct(e.id)} >Delete Product</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductListing;
