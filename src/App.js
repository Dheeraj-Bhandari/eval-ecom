import ProductForm from "./Component/ProductForm";
import { useState } from "react";
import ProductListing from "./Component/ProductListing";
function App() {
  const [productForm, setproductForm] = useState(false);
  const [listing, setlisting] = useState(true);

  function handlebtn() {
    if (productForm) setproductForm(false);
    else setproductForm(true);
  }
  function handlebtn2() {
    if (listing) setlisting(false);
    else setlisting(true);
  }

  return (
    <div className="App">
      <button onClick={() => handlebtn()}>Show Product Form</button>
      <button onClick={() => handlebtn2()}>Show listing</button>
      {productForm ? <ProductForm />
      :""}
      {listing ? <ProductListing /> :""}
    </div>
  );
}

export default App;
