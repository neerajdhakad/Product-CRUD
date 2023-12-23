import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useEffect,useState} from 'react';
import { getProductById, updateProduct } from "../API/Api";
import { ToastContainer, toast } from "react-toastify"; 
import { ThreeDots } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

function EditProduct() {

  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { productId } = useParams();

    const categories = [
        "SmartPhones",
        "laptops",
        "Grocery",
        "Vegetables",
        "skincare",
        "furniture",
        "mens-shirts",
        "sunglasses",
        "automotive"
      ];
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      defaultValues: {
        name: '',
        description: '',
        price: null,
        category: '',
        quantity: null,
      },
    });
  
    const onSubmit = async (data) => {
      data.price = parseFloat(data.price);
      data.quantity = parseInt(data.quantity, 10);
  
      try {
        if (productId) { 
          await updateProduct(productId, data);
          toast.success('Product Updated!');
        } else { 
          toast.success('Product Not Found!');
        }
        navigate('/');
      } catch (error) {
        toast.error('Error Adding/Updating Product!');
        console.error('Unexpected error:', error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const productData = await getProductById(productId); 
          Object.keys(productData.data).forEach((key) => {
            setValue(key, productData.data[key]);
          });
        } catch (error) {
          console.error('Error fetching product data:', error);
        }finally{
          setLoading(false)
        }
      };
  
      if (productId) {
        fetchData();
      }
    }, [productId, setValue]);
  return (
    <>
      <Navbar />

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

     { !loading? (<form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-5">
            <div className="flex text-center justify-between">
              <div>
                <h2 className="text-3xl mt-12 font-bold leading-7 text-gray-900">
                  Edit Product
                </h2>
              </div>
              <div>
                  <button
                    className="bg-indigo-600 px-6 py-3 mt-12 rounded-lg text-white font-medium m-auto  hover:opacity-75"
                    type="submit" 
                  >
                    Save
                  </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("name", {
                        required: "Name is required",
                      })}
                      id="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.name?.message && (
                    <small className="error">{errors.name.message}</small>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                {errors.description?.message && (
                  <small className="error">{errors.description.message}</small>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2 ">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    >
                    <option value="">--Choose category--</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.value}>
                        {category}
                      </option>
                    ))}
                  </select>
                    </div>
                </div>
                {errors.category?.message && (
                  <small className="error">{errors.category.message}</small>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("price", {
                        required: "Price is required",
                        min: {
                          value: 1,
                          message: "Price must be at least 1",
                        },
                        max: {
                          value: 1000000,
                          message: "Price cannot exceed 10 Lakhs",
                        },
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {errors.price?.message && (
                  <small className="error">{errors.price.message}</small>
                )} 
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantity
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("quantity", {
                        required: "Quantity is required",
                        min: {
                          value: 1,
                          message: "Quantity must be at least 1",
                        },
                        max: {
                          value: 10000,
                          message: "Price cannot exceed 10,000",
                        },
                      })}
                      id="quantity"
                      className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {errors.quantity?.message && (
                  <small className="error">{errors.quantity.message}</small>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>):null}
      <ToastContainer></ToastContainer>
    </>
  );
}

export default EditProduct;
