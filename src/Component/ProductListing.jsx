import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";
import listingCss from "./listingCss.css";

const ProductListing = () => {
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState("");
  const [sort, setsort] = useState("");
  const [page, setPage] = useState(1);

  let apiLink;
  const link1 = `/products?_page=${page}&_limit=5&_sort=price&_order=${sort}`;
  const link2 = `/products?_page=${page}&_limit=5&gender=${filter}&_sort=price&_order=${sort}`;
  const retData = async () => {
    if (filter === "") {
      apiLink = link1;
    } else {
      apiLink = link2;
    }
    const response = await api.get(apiLink);
    console.log(apiLink);
    return response.data;
  };

  const delteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    const newdatalist = data.filter((data) => {
      return data.id !== id;
    });

    setdata(newdatalist);
  };

 
  //   Sorting and filter end

  useEffect(() => {
    const getAlldata = async () => {
      const alldata = await retData();
      setdata(alldata);
    };
    getAlldata();
    console.log(data);
  }, [page, sort, filter]);

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
          <option value="">Filter</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>

        <select onChange={(e) => setsort(e.target.value)} value={sort}>
          <option value="">Sort</option>
          <option value="desc">High To low</option>
          <option value="asc">low To High</option>
        </select>
      </div>
      {data ? (
        data.map((e) => {
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
        })
      ) : (
        <h1>Loading Data</h1>
      )}
      <div className="btnpage">
        <button onClick={() => setPage(page - 1)}>Prev</button>
        <p>Page {page}</p>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ProductListing;
