import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";
import listingCss from "./listingCss.css";

const ProductListing = () => {
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState('all');
  const [sort, setsort] = useState("");
  const [page, setPage] = useState(1);
  const retData = async () => {
    const response = await api.get(`/products?_page=${page}&_limit=5&gender=${filter}&_sort=price&_order=${sort}`);
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
    console.log(data)
  }, [page,sort,filter]);

  // console.log(data);
  // console.log(page);
  return (
    <div>
      <div className="btnpage">
        <select
          onChange={(e) => {
            setfilter(e.target.value);
            // handlefilter();
          }}
          value={filter}
        >
          <option value="all">Filter</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>

        <select onChange={(e) => setsort(e.target.value)} value={sort}>
          <option value="">Sort</option>
          <option value="desc">High To low</option>
          <option value="asc">low To High</option>
        </select>
      </div>
      {data ? data.map((e) => {
        return (
          <div id="Productcard" key={e.id}>
            <p className="title">{e.title}</p>
            <img className="img" src={e.image} alt="" />
            <p className="price">Price: {e.price}</p>
            <p className="category"> Category: {e.category}</p>
            <p className="gender">Gender :{e.gender}</p>
            <button className="delbtn" onClick={() => delteProduct(e.id) }>
              Delete Product
            </button>
          </div>
        );
      }) : <h1>Loading Data</h1>}
      <div className="btnpage">
        <button onClick={()=>setPage(page-1)}>Prev</button>
        <p>Page {page}</p>
        <button onClick={()=>setPage(page+1)}>Next</button>
      </div>
    </div>
  );
};

export default ProductListing;
