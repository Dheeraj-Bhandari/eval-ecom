import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";
import listingCss from "./listingCss.css";

const ProductListing = () => {
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState("");
  const [sort, setsort] = useState("");

  const retData = async () => {
    const response = await api.get("/products?_page=1&_limit=5");
    return response.data;
  };

  const delteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    const newdatalist = data.filter((data) => {
      return data.id !== id;
    });

    setdata(newdatalist);
  };

  //   Sorting and filter

  const handlefilter = async () => {
    return await api
      .get(`/products?gender=${filter}&_sort=price&_order=${sort}`)
      .then((response) => {
        setdata(response.data);
        console.log(filter, response.data);
      });
  };

  const handlesort = async (e) => {
    setsort(e);
    return await api
      .get(`/products?_sort=price&_order=${sort}&gender=${filter}`)
      .then((response) => {
        setdata(response.data);
        console.log(filter, response.data);
      });
  };

  //   Sorting and filter end

  useEffect(() => {
    const getAlldata = async () => {
      const alldata = await retData();
      setdata(alldata);
    };
    getAlldata();
  }, []);

  return (
    <div>
      <div className="btnpage">
        <select
          onChange={(e) => {
            setfilter(e.target.value);
            handlefilter();
          }}
          value={filter}
        >
          <option value="filter">Filter</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>

        <select onChange={(e) => handlesort(e.target.value)} value={sort}>
          <option value="sort">Sort</option>
          <option value="desc">Low To High</option>
          <option value="asc">High To Low</option>
        </select>
      </div>
      {data.map((e) => {
        return (
          <div id="Productcard" key={e.id}>
            <p className="title">{e.title}</p>
            <img className="img" src={e.image} alt="" />
            <p className="price">Price: {e.price}</p>
            <p className="category"> Category: {e.category}</p>
            <p className="gender">Gender :{e.gender}</p>
            <button className="delbtn" onClick={() => delteProduct(e.id)}>
              Delete Product
            </button>
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
