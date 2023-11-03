import CommonRoute from "../CommonRoute/CommonRoute";
import "./Order.css";

const Order = () => {
  return (
    <CommonRoute
      title="order details"
      currentRoute="Order #55"
      prevRoute="orders_history"
    >
      <div className="order">
        {/* total & status */}
        <div className="total-status">
          <span>
            <strong>Total</strong>: $355
          </span>
          <span>
            <strong>Status</strong>:{" "}
            <span className="pending-status">pending</span>
          </span>
        </div>
        {/* items count */}
        <div>
          <span>
            <strong>Items count</strong>: 3
          </span>
        </div>
        {/* order items */}
        <div className="order-items">
          <h3>Order items</h3>
          <ul className="order-items-list">
            <li>
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
            </li>
          </ul>
        </div>
      </div>
    </CommonRoute>
  );
};

function OrderItem() {
  return (
    <div className="order-item">
      {/* image-name-price */}
      <div className="image-name-price">
        {/* image */}
        <div className="img-box">
          <img src="/images/img-1.png" alt="" />
        </div>
        {/* name-price */}
        <div className="name-price">
          <p>
            <strong>garlic</strong>
          </p>
          <p>$45</p>
        </div>
      </div>
      {/* qty */}
      <span>Qty: 3</span>
    </div>
  );
}

export default Order;
