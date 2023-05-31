
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductList from "./components/ProductLIst";

export const URL = process.env.REACT_APP_SERVER_URL

function App() {
  return (
    <div className="app">
      <div className="product-container">
        <ProductList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
