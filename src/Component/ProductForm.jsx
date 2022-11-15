import React from "react";
import { useState, useEffect } from "react";
import api from '../api/api'

const ProductForm = () => {
  const [data, setdata] = useState([]);

  const retData = async () => {
    const response = await api.get("/products");
    return response.data;
  };

 


const [title, settitle] = useState("");
const [gender, setgender] = useState("")
const [selects, setselects] = useState("")
const [price, setprice] = useState(0)
const [category, setcategory] = useState("")
const [image, setimage] = useState("")







const  posttoJSON =  async (e)=>{
e.preventDefault();

console.log(title, price, selects. category, image)

const request = {
        'title':title,
        'gender': 'male',
        'price': price,
        'category': category,
        'image': image
}

const response = await api.post("/products", request)
console.log(response)
setdata([...data, response.data]);

  //  fetch('http://localhost:3000/products',{
  //   method : "POST",
  //   header:{"Content-Type": "application/json"},
  //   body: JSON.stringify({
  //            'title':title,
  //       'gender': 'male',
  //       'price': price,
  //       'category': category,
  //       'image': image
  //   })

  //  }).then(()=>{
  //   console.log("product added")
  //  })


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
      <form onSubmit={(e)=>posttoJSON(e)}>
        <label htmlFor="title">Title</label>
        <input id="title" placeholder="Enter Title" type="text"
        onChange={e=>settitle(e.target.value)}
        value={title}
        />

        <select name="" 
        onChange={e=>setselects(e.target.value)}
        value={selects}
        >
          <option name="" id="gender">
            Gender
          </option>
          <option name="" id="male">
            MALE
          </option>
          <option name="" id="female">
            FEMALE
          </option>
        </select>

        <label htmlFor="">price</label>
        <input type="number" id="price" placeholder=" Enter Price"
        onChange={e=>setprice(e.target.value)}
        value={price}
        />

        <label htmlFor="">category</label>
        <input type="text" id="category" placeholder="Enter Category" 
        onChange={e=>setcategory(e.target.value)}
        value={category}
        />

        <label htmlFor="">image</label>
        <input type="text"  id="image"  placeholder="Enter Image url"
        onChange={e=>setimage(e.target.value)}
        value={image}
        />

        <button >Send</button>
      </form>
    </div>
  );
};

export default ProductForm;
