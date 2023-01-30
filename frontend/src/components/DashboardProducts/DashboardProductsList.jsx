import "./DashboardProductsList.css";
import ProductRow from "../ProductsRow/ProductRow";
import ErrorComp from "../ErrorComp/ErrorComp";

export default function DashboardProductsList({
  isLoading,
  isError,
  products,
  error,
  deleteProduct,
  editProduct,
}) {
  return (
    <div className="dashboard-products-table-wrapper">
      {isError && <ErrorComp error={error} />}
      {isLoading && <div>Loading...</div>}
      {products?.length > 0 && (
        <table className="dashboard-products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                deleteProduct={deleteProduct}
                editProduct={editProduct}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
