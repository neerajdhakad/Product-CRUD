import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Home from './components/Home'
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";


const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <Home />
  },
  {
    path: "/addProduct",
    element: 
      <AddProduct />
  },
  {
    path: "/editProduct/:productId",
    element: 
      <EditProduct />
  },
  {
    path: "*",
    element: 
    <PageNotFound/> 
  }
]);
function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
  </div>
  );
}

export default App;
