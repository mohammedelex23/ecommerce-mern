import "./Dashboard.css";
import AddProductForm from "../AddProductForm/AddProductForm";
import DashboardProductsList from "../DashboardProducts/DashboardProductsList";
import configs from "../../configs";
import useApi from "../../hooks/useApi";

export default function Dashboard() {
  const {
    isError,
    isLoading,
    data: products,
    error,
    AddProducts,
    deleteProduct,
    editProduct,
  } = useApi(`${configs.BASE_URL}/products`);

  const handleClick = function () {
    let addProductWrapper = document.getElementById("add-product-wrapper");
    addProductWrapper.style.display = "block";
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="dashboard">
      <div className="dashboard-products-warapper">
        <h2 className="dashboard-title">Dashboard</h2>
        <button onClick={handleClick} className="add-product-btn">
          Add Product +
        </button>
        <div className="dashboard-products">
          <h3>Products</h3>
          <ul className="dashboard-products-list"></ul>
        </div>
        <DashboardProductsList
          isLoading={isLoading}
          isError={isError}
          products={products}
          error={error}
          deleteProduct={deleteProduct}
          editProduct={editProduct}
        />
      </div>

      <AddProductForm AddProducts={AddProducts} />
    </div>
  );
}
