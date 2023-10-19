import "./CartItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeFromCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import configs from "../../configs";
export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeFromCart(item._id));
  };

  return (
    <li className="cart-item-wrapper">
      <div>
        <img src={`${configs.BASE_URL}/products/${item._id}/image`} />
        <div>
          <span style={{ display: "block" }}>{item.name}</span>
          <span className="price">${item.price}</span>
          <span className="quantity">x{item.qty}</span>
          <span className="total">${item.price * item.qty}</span>
        </div>
      </div>
      <FontAwesomeIcon
        onClick={handleClick}
        className="delete-icon"
        icon={faTrash}
      />
    </li>
  );
}
