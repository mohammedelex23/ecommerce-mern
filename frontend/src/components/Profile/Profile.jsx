import { faBasketShopping, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import callApi from "../../api/api";
import auth from "../../auth/auth";
import { statusEnum } from "../../constants";
import { clearCart } from "../../redux/slices/cartSlice";
import { showLogoutSuccess } from "../../redux/slices/utilsSlice";
import ErrorComp from "../ErrorComp/ErrorComp";
import "./Profile.css";
const Profile = () => {
  const localUser = auth.getLocalUser();
  const [values, setValues] = useState({
    status: statusEnum.initial,
    error: null,
    user: null,
  });
  useEffect(() => {
    setValues({
      ...values,
      status: statusEnum.loading,
    });
    callApi(`users/${localUser._id}`)
      .then((user) => {
        if (!user) {
          auth.logout();
          return window.location.reload();
        }
        setValues({
          ...values,
          status: statusEnum.fetched,
          user,
        });
        auth.updateLocalUser(user);
      })
      .catch((error) => {
        console.log(error);
        setValues({
          ...values,
          status: statusEnum.error,
          error,
        });
      });
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (type) => () => {
    dispatch(showLogoutSuccess());
    auth.logout();
    if (type === "not-user-account") {
      window.location.reload("/myaccount");
    } else {
      dispatch(clearCart());
      navigate("/logoutSuccess");
    }
  };
  const goToEdit = () => {
    navigate("/updateAccount");
  };
  const { status, error, user } = values;

  return (
    <div className="profile">
      {status === statusEnum.error && <ErrorComp error={error} />}
      {status === statusEnum.loading && <div>Loading...</div>}
      {status === statusEnum.fetched && (
        <>
          <div className="welcome">
            <p>
              Welcome Back, <span className="name">{user.name}</span>. If you're
              not
              <span className="name"> {user.name}</span>,{" "}
              <span
                className="profile-btn"
                onClick={handleLogout("not-user-account")}
              >
                click here
              </span>
              .
            </p>
            <span onClick={handleLogout("")} className="profile-btn">
              Logout
            </span>
          </div>
          {/* orders history */}
          <div className="orders-history-link">
            <Link to="/orders_history">
              <FontAwesomeIcon icon={faBasketShopping} />
              <span>Orders history</span>
            </Link>
          </div>
          {/* user info */}
          <div className="info">
            <div>
              <h4 className="title">basic information</h4>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
            <div onClick={goToEdit} className="edit">
              <FontAwesomeIcon icon={faPencil} />
              <span>edit</span>
            </div>
          </div>
          {/* shipping inf */}
          <div className="info">
            <div>
              <h4 className="title">shipping information</h4>
              <p>{user?.shippingAddress?.state}</p>
              <p>{user?.shippingAddress?.city}</p>
              <p>{user?.shippingAddress?.phone}</p>
            </div>
            <div onClick={goToEdit} className="edit">
              <FontAwesomeIcon icon={faPencil} />
              <span>edit</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
