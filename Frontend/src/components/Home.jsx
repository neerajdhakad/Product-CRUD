import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../API/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products]);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex text-center justify-between mt-20 px-10">
        <div className="text-3xl font-bold">All Products</div>
        <div>
          <Link to={"/addProduct"}>
            <button className="bg-indigo-600 px-3 py-2 text-white rounded-md">
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Loader */}
      <div className="flex items-center justify-center">
        {loading ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="rgb(79 70 229)"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : null}
      </div>

      {/* All Products */}
      <div className="flex items-center px-10 gap-6 flex-wrap">
        {products &&
          products?.map((product) => (
            <div key={product.id} className="my-5">
              <div className="max-w-sm p-3 border border-gray-200 rounded-lg shadow w-72 h-42">
                <div className="flex items-center justify-between">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight">
                    {product.name}
                  </h5>
                  <div className="flex items-center justify-end gap-2 ml-2">
                    <Link
                      to={`/editProduct/${product._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
                <p className="mb-3 italic text-white bg-indigo-500 rounded-full px-3 py-1 w-fit">
                  {product.category}
                </p>
                <p className="mb-3 font-normal text-gray-700">
                  {product.description.split(" ").slice(0, 10).join(" ")}...
                </p>
                <div className="flex items-center justify-between">
                  <p className="mb-3 text-xl font-medium">
                    Qty: {product.quantity}
                  </p>
                  <h3 className="mb-3 text-2xl font-bold">₹{product.price}</h3>
                </div>
              </div>
            </div>
          ))}
      </div>
  
      <ToastContainer></ToastContainer>
    </>
  );
}

export default Home;
