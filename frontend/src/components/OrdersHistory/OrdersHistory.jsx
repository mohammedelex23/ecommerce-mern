import { useNavigate } from "react-router-dom";
import CommonRoute from "../CommonRoute/CommonRoute";
import "./OrdersHistory.css";

const OrdersHistory = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/orders_history/44");
  };

  return (
    <CommonRoute title="orders history" currentRoute="orders history">
      <table className="orders-history-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Items count</th>
            <th>Total cost</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={handleClick} className="table-row">
            <td>27736</td>
            <td>4</td>
            <td>$40</td>
            <td>
              <span
                className={`status ${
                  "pending" ? "pending-status" : "completed-status"
                }`}
              >
                pending
              </span>
            </td>
          </tr>
          <tr className="table-row">
            <td>27736</td>
            <td>4</td>
            <td>$40</td>
            <td>
              <span
                className={`status ${
                  "completed" ? "completed-status" : "pending-status"
                }`}
              >
                completed
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </CommonRoute>
  );
};

export default OrdersHistory;
